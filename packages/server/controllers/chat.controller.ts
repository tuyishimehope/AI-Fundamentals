import z from "zod";
import { chatService } from "../services/chat.service";
import type { Request, Response } from "express";

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "prompt is required")
    .max(1000, "prompt is too long"),
  conversationId: z.string().uuid(),
});

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    const parsedResult = chatSchema.safeParse(req.body);
    if (!parsedResult.success) {
      res.status(400).json(parsedResult.error.format);
      return;
    }
    try {
      const { prompt, conversationId } = req.body;
      const response = chatService.sendMessage(prompt, conversationId);

      res.json({ message: (await response).message });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate a response" });
    }
  },
};
