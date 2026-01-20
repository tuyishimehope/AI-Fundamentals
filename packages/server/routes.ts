import type { Request, Response } from "express";
import express from "express";
import { chatController } from "./controllers/chat.controller";
import prisma from "./prisma/prisma";
import { reviewController } from "./controllers/review.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`Hello world! Your API key is ${process.env.OPENAI_API_KEY}`);
});

router.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from API" });
});

router.post("/api/chat", chatController.sendMessage);

router.get("/api/products/:id/reviews", reviewController.getReviews);

router.post(
  "/api/products/:id/reviews/summarize",
  reviewController.summarizeReviews,
);

export default router;
