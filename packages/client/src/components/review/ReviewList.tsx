import { useMutation, useQuery } from "@tanstack/react-query";
import { HiSparkles } from "react-icons/hi2";
import { Button } from "../ui/button";
import ReviewSkeleton from "./ReviewSkeleton";
import StarRating from "./StarRating";
import {
  reviewsApi,
  type GetReviewsResponse,
  type SummaryResponse,
} from "./reviewsApi";

type Props = {
  productId: string;
};

const ReviewList = ({ productId }: Props) => {
  const summaryMutation = useMutation<SummaryResponse>({
    mutationFn: () => reviewsApi.summarizeReviews(productId),
  });
  const summaryQuery = useQuery<GetReviewsResponse>({
    queryKey: ["reviews", productId],
    queryFn: () => reviewsApi.getReviews(productId),
  });

  if (summaryQuery.isLoading) {
    return (
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((index) => (
          <div key={index}>
            <ReviewSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (summaryQuery.error) {
    return <p className="text-red-500">{summaryQuery.error.message}</p>;
  }
  if (!summaryQuery.data?.reviews.length) {
    return null;
  }

  const currentSummary =
    summaryQuery.data?.summary || summaryMutation.data?.summary;

  return (
    <div>
      <div className="mb-5">
        {currentSummary ? (
          <div>
            <p>{currentSummary}</p>
          </div>
        ) : (
          <Button
            onClick={() => summaryMutation.mutate()}
            className="cursor-pointer"
            disabled={summaryMutation.isPending}
          >
            <HiSparkles /> Summarize
          </Button>
        )}
        {summaryMutation.isPending && (
          <div className="mt-2">
            <ReviewSkeleton />
          </div>
        )}
        {summaryMutation.error && (
          <p className="text-red-500">{summaryMutation.error.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-5">
        {summaryQuery.data?.reviews.map((review) => (
          <div key={review.id}>
            <div className="font-semibold">{review.author}</div>
            <StarRating value={review.rating} />
            <div className="py-2">{review.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
