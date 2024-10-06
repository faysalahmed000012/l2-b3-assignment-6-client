"use client";
import frenchFry from "@/assets/images/french-fry.jpg";
import { useUser } from "@/context/userProvider";
import { useAddComment } from "@/hooks/post.hooks";
import { getUserDetail } from "@/services/AuthServices";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  MessageSquare,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import TimeAgo from "./TimeAgo";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= Math.round(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function RecipeCard({ post }: { post: any }) {
  // const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { user } = useUser();
  const { mutate: AddComment } = useAddComment();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const detailedUser = await getUserDetail(user?.email as string);
    if (detailedUser) {
      AddComment({
        postId: post._id,
        userId: detailedUser._id as string,
        comment: e.target.comment.value,
      });
    } else {
      alert("Please login to comment");
    }
  };

  // const onVote = (id: number, voteType: "up" | "down") => {
  //   console.log("vote");
  // };
  // const onRate = (id: number, rating: number) => {
  //   console.log("rate");
  // };

  // const onAddComment = (id: number, comment: string) => {
  //   console.log("comment");
  // };

  // const handleSubmitComment = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (comment.trim()) {
  //     onAddComment(post._id, comment);
  //     setComment("");
  //   }
  // };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src={post?.user?.profilePicture}
              />
              <AvatarFallback>{post?.user?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/recipe/${post?._id}`}>
                <CardTitle>{post?.title}</CardTitle>
              </Link>
              <Link href={`/profile/${post?.user?.email}`}>
                <p className="text-sm text-gray-500">by {post?.user?.name}</p>
              </Link>
            </div>
          </div>
          <TimeAgo time={new Date(post?.createdAt)} />
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={frenchFry}
          alt={post?.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-700 mb-4">
          {post?.description.match(/\w+/g).slice(0, 10).join(" ") + "..."}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              // onClick={() => onVote(post?._id, "up")}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span className="text-xs">
                {post?.upVotes?.length - post?.downVotes?.length || 0}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              // onClick={() => onVote(post._id, "down")}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <StarRating rating={Number(post?.rating?.toFixed(1))} />
            <span className="text-sm text-muted-foreground">
              {post?.rating?.toFixed(1)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="flex justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Comments ({post?.comments?.length || 0})
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        {showComments && (
          <div className="w-full space-y-4">
            {post?.comments?.length > 0 &&
              post?.comments?.map((comment) => (
                <div key={comment.content} className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold">{comment.user}</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            <form onSubmit={handleSubmitComment} className="w-full">
              <Textarea
                name="comment"
                placeholder="Add a comment..."
                // value={comment}
                // onChange={(e) => setComment(e.target.value)}
                className="mb-2"
              />
              <Button type="submit" size="sm">
                Post Comment
              </Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
