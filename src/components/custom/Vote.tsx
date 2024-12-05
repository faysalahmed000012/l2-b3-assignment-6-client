"use client";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { addRating, downVote, upVote } from "@/services/PostServices";
import { ThumbsDown, ThumbsUp } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import StarRating from "./StarRating";

const Vote = ({ post }) => {
  const { user } = useUser();
  const router = useRouter();
  const [like, setLike] = useState<number>(post?.upVotes || 0);
  const [dislike, setDislike] = useState<number>(post?.downVotes || 0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  // let userRating;
  // if (user) {
  //   userRating = post.ratings.find((rating) => rating.user._id === user._id);
  // }

  const handleLike = async () => {
    if (!user) {
      router.push("/auth/login");
    } else {
      const detailedUser = await getUserDetail(user?.email as string);

      if (detailedUser) {
        const res = await upVote(post._id, detailedUser._id as string);
        console.log(res);
        setLike((prev) => prev + 1);
      } else {
        alert("Failed to get User details from server, Try again");
      }
    }
  };

  const handledownVote = async () => {
    if (!user) {
      router.push("/auth/login");
    } else {
      const detailedUser = await getUserDetail(user?.email as string);
      if (detailedUser) {
        downVote(post._id, detailedUser._id as string);
        setDislike((prev) => prev + 1);
      } else {
        alert("Failed to get User details from server, Try again");
      }
    }
  };

  const onRatingChange = async (newRating) => {
    if (!user) {
      router.push("/auth/login");
    } else {
      const detailedUser = await getUserDetail(user?.email as string);

      if (detailedUser) {
        await addRating(post._id, detailedUser._id as string, newRating);
      } else {
        alert("Failed to get User details from server, Try again");
      }
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
    <div className="flex justify-between items-center ">
      <div className="flex items-center  border border-gray-500 rounded-full">
        <Button
          className=" hover:bg-orange-100 rounded-l-full pr-4"
          variant="ghost"
          size="sm"
          onClick={handleLike}
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          <span className="text-xs">{like - dislike || 0}</span>
        </Button>
        <div className="border border-right-1 border-gray-400 h-5"></div>
        <Button
          className=" hover:bg-orange-100 rounded-r-full"
          variant="ghost"
          size="sm"
          onClick={handledownVote}
        >
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
