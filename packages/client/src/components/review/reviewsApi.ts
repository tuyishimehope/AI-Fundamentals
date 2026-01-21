import axios from "axios";

export type Review = {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};
export type GetReviewsResponse = {
  summary: string;
  reviews: Review[];
};
export type SummaryResponse = {
  summary: string;
};

export const reviewsApi = {
  getReviews(productId: string) {
    return axios
      .get<GetReviewsResponse>(`/api/products/${productId}/reviews`)
      .then((res) => res.data);
  },
  summarizeReviews(productId: string) {
    return axios
      .post<SummaryResponse>(`/api/products/${productId}/reviews/summarize`)
      .then((res) => res.data);
  },
};
