import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  sender: "user" | "ai";
  text: string;
};

const MessageBubble = ({ sender, text }: Props) => {
  // regex to detect code blocks
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;

  const parts: { type: "text" | "code"; content: string; language?: string }[] =
    [];

  let lastIndex = 0;
  let match;

  while ((match = codeRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({
      type: "code",
      content: match[2],
      language: match[1] || "text",
    });

    lastIndex = codeRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }

  return (
    <div
      className={`my-2 p-3 rounded-xl max-w-[80%] wrap-break-words ${
        sender == "user"
          ? "self-end bg-primary text-primary-foreground"
          : "self-start bg-muted text-muted-foreground"
      }`}
    >
      {parts.map((part, idx) =>
        part.type === "code" ? (
          <SyntaxHighlighter
            key={idx}
            language={part.language}
            style={okaidia}
            wrapLines
            showLineNumbers
            className="rounded-md"
          >
            {part.content}
          </SyntaxHighlighter>
        ) : (
          <p key={idx} className="whitespace-pre-wrap">
            {part.content}
          </p>
        )
      )}
    </div>
  );
};

export default MessageBubble;
