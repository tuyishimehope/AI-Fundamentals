import axios from "axios";
import { useRef, useState } from "react";
import type { FormData } from "./ChatInput";
import ChatInput from "./ChatInput";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";

type chatResponse = {
  message: string;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const conversationId = useRef(crypto.randomUUID());

  const onSubmit = async ({ prompt }: FormData) => {
    try {
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      setIsBotTyping(true);
      setError("");
      const { data } = await axios.post<chatResponse>("api/chat", {
        prompt,
        conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && (
          <div>
            <span className="text-red-500">{error}</span>
          </div>
        )}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default ChatBot;
