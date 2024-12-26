"use client";

import { Star } from "lucide-react";
import { useState } from "react";

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Star
            key={index}
            className={`cursor-pointer ${
              ratingValue <= (hover || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
            size={24}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => handleRatingChange(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
