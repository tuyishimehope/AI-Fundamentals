import type { Review } from "../generated/prisma/client";
import { llmClient } from "../llm/llmClient";
import template from "../prompts/reviews.txt";
import { reviewRepository } from "../repositories/review.repository";

export const reviewService = {
  async summarizeReviews(productId: number): Promise<string> {
    const exisitingSummary = await reviewRepository.getReviewSummary(productId);
    if (exisitingSummary) return exisitingSummary;

    const reviews = await reviewRepository.getReviews(productId, 10);
    const joinedTexts = reviews.map((review) => review.content).join("\n\n");

    const { text: summary } = await llmClient.generateText({
      model: "gpt-4.1",
      prompt: template.replace("{{reviews}}", joinedTexts),
      temperature: 0.2,
      maxTokens: 500,
    });
    await reviewRepository.storeReviewSummary(productId, summary);
    return summary;
  },
};
