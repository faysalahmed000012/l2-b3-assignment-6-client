"use client";
import threeDot from "@/assets/icons/three-dot.svg";
import { useUser } from "@/context/userProvider";
import { useComment } from "@/hooks/post.hooks";
import { getUserDetail } from "@/services/AuthServices";
import { deletePost } from "@/services/PostServices";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DeleteIcon, MessageSquare } from "lucide-react";
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
import Share from "./share/Share";
import TimeAgo from "./TimeAgo";
import Vote from "./Vote";

export default function RecipeCard({ post }: { post: any }) {
  const [showComments, setShowComments] = useState(false);
  const { user } = useUser();
  function createMarkup(c) {
    return { __html: c };
  }

  const { mutate: AddComment } = useComment();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const detailedUser = await getUserDetail(user?.email as string);
    if (detailedUser) {
      AddComment({
        postId: post._id,
        userId: detailedUser._id as string,
        userName: detailedUser.name as string,
        userImage: detailedUser.profilePicture,
        mode: "create",
        comment: e.target.comment.value,
      });
    } else {
      alert("Please login to comment");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
    } catch (error) {
      console.log(error);
    }
  };
  const editableuser =
    user?.role == "admin" || user?.email === post?.user?.email;

  return (
    <Card className="w-full max-w-2xl mx-auto hover:bg-gray-100 transition-all duration-300 ease-in-out">
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
            {editableuser && (
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
                    <CreateAndEditPost isEditmode={true} editData={post} />
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/recipe/${post?._id}`}>
          <Image
            src={post?.image}
            alt={post?.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <div
            dangerouslySetInnerHTML={createMarkup(
              post?.description?.match(/\w+/g).slice(0, 10).join(" ") + "..."
            )}
            className="text-gray-700 mb-4"
          ></div>
        </Link>
        <Vote post={post} />
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="flex justify-between w-full">
          <Link href={`/recipe/${post._id}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Comments ({post?.comments?.length || 0})
            </Button>
          </Link>
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
