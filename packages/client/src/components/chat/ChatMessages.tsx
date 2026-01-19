import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
export type Message = {
  content: string;
  role: "user" | "bot";
};

type props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: props) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onCopyData = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => (
        <div
          onCopy={onCopyData}
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`px-3 py-1 max-w-md rounded-xl prose ${
            message.role === "user"
              ? "bg-blue-600 text-white self-end"
              : "bg-gray-100 text-black self-start"
          }`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
