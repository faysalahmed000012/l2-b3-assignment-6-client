"use client";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { addRating, downVote, upVote } from "@/services/PostServices";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import StarRating from "./StarRating";

const Vote = ({ post }) => {
  const { user } = useUser();

  const handleLike = async () => {
    if (!user) {
      redirect("/login");
    }
    const detailedUser = await getUserDetail(user?.email as string);

    if (detailedUser) {
      upVote(post._id, detailedUser._id as string);
    } else {
      alert("Please login to upVote");
    }
  };

  const handledownVote = async () => {
    if (!user) {
      redirect("/login");
    }
    const detailedUser = await getUserDetail(user?.email as string);
    if (detailedUser) {
      downVote(post._id, detailedUser._id as string);
    } else {
      alert("Please login to downVote");
    }
  };

  const onRatingChange = async (newRating) => {
    if (!user) {
      redirect("/login");
    }
    const detailedUser = await getUserDetail(user?.email as string);

    if (detailedUser) {
      const rating = await addRating(
        post._id,
        detailedUser._id as string,
        newRating
      );
      console.log(rating);
    } else {
      alert("Please login to upVote");
    }
  };
  let averageRating;
  if (post?.ratings?.length > 0) {
    const totalRating = post.ratings.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    averageRating = totalRating / post.ratings.length;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <ThumbsUp className="mr-1 h-4 w-4" />
          <span className="text-xs">
            {post?.upVotes + post?.downVotes || 0}
          </span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handledownVote}>
          <ThumbsDown className="mr-1 h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-1">
        <StarRating initialRating={0} onRatingChange={onRatingChange} />
        <span className="text-sm text-muted-foreground">
          ({averageRating?.toFixed(1)}) / {post?.ratings?.length}
        </span>
      </div>
    </div>
  );
};

export default Vote;
