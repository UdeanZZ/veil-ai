"use client";
import MessageBubble from "@/components/MessageBuble";
import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { IoAdd, IoMenu, IoSearch } from "react-icons/io5";

const ChatPage = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/");
  }, [isLoaded, isSignedIn, router]);

  const endRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: { sender: "user" | "ai"; text: string } = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiReply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.log("OpenRouter API Error ", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading ...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="hidden md:flex">
        <Sidebar />
      </aside>
      <div className="flex flex-col flex-1 md:ml-64">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <IoMenu size={22} className="cursor-pointer" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>

          <span className="text-xl font-bold">Veil.AI</span>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition">
              <FaShareAlt className="text-muted-foreground" size={18} />
            </button>
            <UserButton />
          </div>
        </div>
        <div className="flex-1 md:w-[80%] w-full mx-auto overflow-y-auto p-4 md:px-8">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
          ))}
          {loading && <MessageBubble sender="ai" text="Thinking..." />}
          <div ref={endRef} />
        </div>

        <div className="p-4 md:px-8 md:w-[80%] w-full mx-auto">
          <div className="rounded-4xl px-3 py-2 bg-card border border-border shadow-lg flex flex-col gap-3">
            <div className="flex items-center p-2">
              <IoAdd size={22} className="mr-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ask Anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div className="flex gap-2 ml-3">
              <button
                onClick={sendMessage}
                disabled={loading}
                className="flex items-center cursor-pointer gap-1 px-6 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50"
              >
                <IoSearch size={16} />
                <span className="text-sm">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
