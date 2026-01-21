import { FaRegStar, FaStar } from "react-icons/fa";

type Props = {
  value: number;
};

const StarRating = ({ value }: Props) => {
  const placeholder = [1, 2, 3, 4, 5];
  return (
    <div className="flex text-yellow-500">
      {placeholder.map((star) =>
        star <= value ? <FaStar key={star} /> : <FaRegStar key={star} />,
      )}
    </div>
  );
};

export default StarRating;
