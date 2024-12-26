"use client";
import TimeAgo from "@/components/custom/post/TimeAgo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/types";
import {
  BookmarkPlus,
  ChefHat,
  Clock,
  Cookie,
  Heart,
  Printer,
  Send,
  Share2,
  Star,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const RecipeDetailClient = ({ post }: { post: IPost }) => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  function createMarkup(c) {
    return { __html: c };
  }

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // Here you would typically send this rating to your backend
  };

  const handleCommentSubmit = () => {
    // Here you would typically send the comment to your backend
    console.log("Submitting comment:", comment);
    setComment("");
  };

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  const averageRating =
    post?.ratings &&
    post.ratings?.reduce((acc, val) => acc + val.rating, 0) /
      post?.ratings?.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={post.author.profilePicture}
                alt={post.author.name}
              />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <div className="text-sm text-gray-500">
                <TimeAgo time={new Date(post.createdAt)} />
              </div>
            </div>
          </div>
          <div className="relative aspect-video mb-6">
            <Image
              height={450}
              width={700}
              src={post.image}
              alt={post.title}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {
              // @ts-ignore
              post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-orange-100 text-orange-800"
                >
                  {tag}
                </Badge>
              ))
            }
          </div>
          {/* <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={createMarkup(post?.description)}
          ></div> */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              <span>{post.cookingTime}</span>
            </div>
            <div className="flex items-center">
              <Cookie className="h-5 w-5 text-orange-500 mr-2" />
              <span>{"Hard"}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
              <span>{averageRating?.toFixed(1) || 0}</span>
            </div>
            <div className="flex items-center">
              <Utensils className="h-5 w-5 text-orange-500 mr-2" />
              <span>{"3"} servings</span>
            </div>
          </div>
          <Separator className="my-8" />
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            {post.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          {/* <ol className="list-decimal pl-5 space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol> */}
          <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={createMarkup(post?.description)}
          ></div>
          <Separator className="my-8" />
          <h2 className="text-2xl font-semibold mb-4">Rate this recipe</h2>
          <div className="flex items-center mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 cursor-pointer ${
                  star <= userRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="space-y-6">
            {post.comments?.map((comment) => (
              <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={comment.userImage}
                      alt={comment.userName}
                    />
                    <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{comment.userName}</h3>
                      <span className="text-sm text-gray-500">
                        <TimeAgo time={new Date(comment.createdAt)} />
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-orange-500"
                      onClick={() => handleReply(comment._id as string)}
                    >
                      Reply
                    </Button>
                    {/* {comment.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="mt-4 ml-6 bg-white rounded-lg p-3"
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={reply.user.image}
                              alt={reply.user.name}
                            />
                            <AvatarFallback>
                              {reply.user.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">
                                {reply.user.name}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {reply.timestamp}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-700">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Textarea
              placeholder={replyTo ? "Write a reply..." : "Leave a comment..."}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2"
            />
            <Button
              onClick={handleCommentSubmit}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Send className="mr-2 h-4 w-4" />
              {replyTo ? "Post Reply" : "Post Comment"}
            </Button>
          </div>
        </div>
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recipe Actions</h3>
              <div className="space-y-4">
                <Button className="w-full">
                  <Heart className="mr-2 h-4 w-4" /> Like
                </Button>
                <Button variant="outline" className="w-full">
                  <BookmarkPlus className="mr-2 h-4 w-4" /> Save Recipe
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button variant="outline" className="w-full">
                  <Printer className="mr-2 h-4 w-4" /> Print Recipe
                </Button>
              </div>
              <Separator className="my-6" />
              {/* <h3 className="text-xl font-semibold mb-4">Chef's Notes</h3>
              <p className="text-gray-600 mb-4">
                This Galactic Fortress Cake is not for the faint of heart. Its
                rich, dark chocolate layers represent the power of the dark
                side, while the intricate design mimics the imposing structure
                of Darth Vader's fortress. For an extra galactic touch, consider
                adding edible silver stars to the frosting.
              </p> */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  <ChefHat className="inline-block mr-1 h-4 w-4" />
                  Darth Baker
                </span>
                <span>
                  {" "}
                  <TimeAgo time={new Date(post.createdAt)} />{" "}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailClient;
