"use client";
import threeDot from "@/assets/icons/three-dot.svg";
import { useUser } from "@/context/userProvider";
import { useAddComment } from "@/hooks/post.hooks";
import { getUserDetail } from "@/services/AuthServices";
import { deletePost, downVote, upVote } from "@/services/PostServices";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DeleteIcon, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import { CreateAndEditPost } from "./CreateAndEditPost";
import StarRating from "./StarRating";
import TimeAgo from "./TimeAgo";
import Share from "./share/Share";

export default function RecipeCard({ post }: { post: any }) {
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
        userName: detailedUser.name as string,
        userImage: detailedUser.profilePicture,
        comment: e.target.comment.value,
      });
    } else {
      alert("Please login to comment");
    }
  };

  const handleLike = async () => {
    const detailedUser = await getUserDetail(user?.email as string);

    if (detailedUser) {
      upVote(post._id, detailedUser._id as string);
    } else {
      alert("Please login to upVote");
    }
  };

  const handledownVote = async () => {
    const detailedUser = await getUserDetail(user?.email as string);
    if (detailedUser) {
      downVote(post._id, detailedUser._id as string);
    } else {
      alert("Please login to downVote");
    }
  };

  const onRatingChange = () => {
    console.log("rate");
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
    } catch (error) {
      console.log(error);
    }
  };

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
              <AvatarFallback>{post?.user?.name}</AvatarFallback>
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
          <div className="flex items-center justify-end gap-3">
            <TimeAgo time={new Date(post?.createdAt)} />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-8 h-8 px-2 py-1">
                  <Image
                    src={threeDot}
                    alt="three-dot"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Button onClick={handleDelete} variant="destructive">
                    {" "}
                    <div className="flex items-center justify-center gap-2">
                      <DeleteIcon />
                      <p> Delete Post</p>
                    </div>
                  </Button>
                  <CreateAndEditPost />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={post?.image}
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
            <StarRating
              initialRating={Number(post?.rating?.toFixed(2))}
              onRatingChange={onRatingChange}
            />
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
          <Share postId={post?._id} />
        </div>
        {showComments && (
          <div className="w-full space-y-4">
            {post?.comments?.length > 0 &&
              post?.comments?.map((comment) => (
                <div key={comment.content} className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold">{comment.userName}</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            <form onSubmit={handleSubmitComment} className="w-full">
              <Textarea
                name="comment"
                placeholder="Add a comment..."
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
