import fs from "fs";
import path from "path";
import { llmClient } from "../llm/llmClient";
import template from "../prompts/chatBot.txt";
import { conversationRepository } from "../repositories/conversation.repository";

type ChatResponse = {
  id: string;
  message: string;
};
const parkInfo = fs.readFileSync(
  path.join(__dirname, "..", "/prompts/", "chatBot.txt"),
  "utf-8",
);
const instructions = template.replace("{{parkInfo}}", parkInfo);

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string,
  ): Promise<ChatResponse> {
    const response = await llmClient.generateText({
      model: "gpt-4o-mini",
      instructions,
      prompt,
      temperature: 0.2,
      maxTokens: 200,
      previousResponseId:
        conversationRepository.getPreviousResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);
    return {
      id: response.id,
      message: response.text,
    };
  },
};
