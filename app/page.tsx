"use client";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Homepage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="w-[150px] h-[150px] bg-card rounded-full flex items-center justify-center flex-col">
          {isSignedIn ? (
            <Eye className="text-foreground" size={100} />
          ) : (
            <EyeClosed className="text-foreground" size={100} />
          )}
        </div>
        <h1 className="text-foreground text-4xl font-bold">
          Welcome to Veil.AI
        </h1>
        <p className="text-muted-foreground text-lg text-center max-w-md">
          An AI chat app built with Next.js and OpenRouter API
        </p>
      </div>

      {!isSignedIn && (
        <SignInButton mode="modal">
          <Button
            size={"lg"}
            variant={"secondary"}
            className="w-64 cursor-pointer text-lg font-medium mt-6"
          >
            Get Started Now
          </Button>
        </SignInButton>
      )}

      {isSignedIn && (
        <Link href="/chat">
          <Button
            size={"lg"}
            variant={"secondary"}
            className="w-64 cursor-pointer text-lg font-medium mt-6"
          >
            Start Chatting
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Homepage;
