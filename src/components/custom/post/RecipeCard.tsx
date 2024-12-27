"use client";
import { useUser } from "@/context/userProvider";
import { useComment } from "@/hooks/post.hooks";
import { getUserDetail } from "@/services/AuthServices";
import { deletePost } from "@/services/PostServices";
import { IPost } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Cookie,
  Heart,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import TimeAgo from "./TimeAgo";

export default function RecipeCard({ post }: { post: IPost }) {
  const {
    title,
    image,
    description = "",
    tags,
    author,
    _id,
    comments,
    likes,
    ratings,
  } = post;

  const averageRating =
    ratings &&
    ratings?.reduce((acc, val) => acc + val.rating, 0) / ratings?.length;

  // const likes = 10;
  const [showComments, setShowComments] = useState(false);
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isSaved, setIsSaved] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  function createMarkup(c) {
    return { __html: c };
  }

  const { mutate: AddComment } = useComment();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const detailedUser = await getUserDetail(user?.email as string);
    if (detailedUser) {
      AddComment({
        postId: post._id as string,
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
    user?.role == "admin" || user?.email === post?.author?.email;

  useEffect(() => {
    const cardElement = cardRef.current;

    const handleMouseEnter = () => {
      setShowAuthor(true);
    };
    const handleMouseLeave = () => {
      setShowAuthor(false);
    };

    if (cardElement) {
      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("mouseenter", handleMouseEnter);
        cardElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [cardRef]);

  return (
    <>
      <TooltipProvider>
        <Card
          ref={cardRef}
          className="w-full md:w-[80%] mx-auto overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50 hover:shadow-xl transition-all duration-300 group cursor-pointer"
        >
          <div
            onClick={() => router.push(`/recipe/${_id}`)}
            className="relative h-48 overflow-hidden"
          >
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute top-2 right-2 flex gap-1">
              {
                // @ts-ignore
                tags?.map((category) => (
                  <Badge
                    key={category}
                    // variant="secondary"
                    className="bg-orange-500/80 text-white hover:bg-orange-600 transition-colors duration-200"
                  >
                    {category}
                  </Badge>
                ))
              }
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-xl text-white mb-2 line-clamp-2">
                {title}
              </h3>
              <AnimatePresence>
                {showAuthor && (
                  <motion.div
                    className="flex items-center gap-2 transition-all duration-300 ease-in-out"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Avatar className="rounded-full h-8 w-8 border border-orange-300">
                      <AvatarImage
                        className="w-full h-full rounded-full object-cover"
                        src={author.profilePicture}
                        alt={author.name}
                      />
                      <AvatarFallback>{author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white/90">
                        {author.name}
                      </p>
                      <div className="text-xs text-white/70">
                        <TimeAgo time={new Date(post?.createdAt)} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4 text-sm">
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Clock className="h-4 w-4" />
                    <span>{"30 min"}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Cooking Time</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2 text-orange-600">
                    <Cookie className="h-4 w-4" />
                    <span>{post?.difficulty}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Difficulty Level</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                    <span className="font-medium text-orange-600">
                      {averageRating ? averageRating?.toFixed(1) : 0}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Rating</TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center justify-start">
              <div
                className="text-sm text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={createMarkup(
                  //@ts-ignore
                  description?.match(/\w+/g).slice(0, 10).join(" ") + " ..."
                )}
              ></div>
              <p
                onClick={() => router.push(`/recipe/${_id}`)}
                className="text-sm text-gray-500 hover:underline"
              >
                show more
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-orange-100">
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:text-orange-500 flex items-center gap-1 transition-colors ${
                      isLiked ? "text-orange-500" : "text-gray-500"
                    }`}
                    onClick={handleLike}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isLiked ? "fill-orange-500" : "fill-none"
                      }`}
                    />
                    <span className="text-sm font-medium">{likeCount}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isLiked ? "Unlike" : "Like"}</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/recipe/${_id}#comments`)}
                    size="sm"
                    className="hover:text-orange-500 flex items-center gap-1 text-gray-500 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {comments?.length}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Comments</TooltipContent>
              </Tooltip>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-orange-100 hover:text-orange-500 text-gray-500 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>
      </TooltipProvider>
    </>
  );
}
