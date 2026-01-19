import axios from "axios";
import { useRef, useState } from "react";
import type { FormData } from "./ChatInput";
import ChatInput from "./ChatInput";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import TypingIndicator from "./TypingIndicator";
import pop from "../../lib/pop.mp3";
import notification from "../../lib/notification.mp3";

type chatResponse = {
  message: string;
};

const popAudio = new Audio(pop);
popAudio.volume = 0.2;
const notificationAudio = new Audio(notification);
notificationAudio.volume = 0.2;

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
      popAudio.play();
      const { data } = await axios.post<chatResponse>("api/chat", {
        prompt,
        conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);
      notificationAudio.play();
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
