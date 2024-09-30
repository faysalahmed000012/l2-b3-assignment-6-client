"use client";
import { Recipe } from "@/app/page";
import frenchFry from "@/assets/images/french-fry.jpg";
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

export default function RecipeCard({
  recipe,
  onVote,
  onRate,
  onAddComment,
}: {
  recipe: Recipe;
  onVote: (id: number, voteType: "up" | "down") => void;
  onRate: (id: number, rating: number) => void;
  onAddComment: (id: number, comment: string) => void;
}) {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(recipe.id, comment);
      setComment("");
    }
  };
  console.log(recipe.createdAt, "from parent");
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src="https://avatars.githubusercontent.com/u/124599?v=4"
              />
              <AvatarFallback>{recipe.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/recipe/5`}>
                <CardTitle>{recipe.title}</CardTitle>
              </Link>
              <p className="text-sm text-gray-500">by {recipe.author}</p>
            </div>
          </div>
          <TimeAgo time={recipe.createdAt} />
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={frenchFry}
          alt={recipe.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(recipe.id, "up")}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span className="text-xs">{recipe.votes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onVote(recipe.id, "down")}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="sm"
                onClick={() => onRate(recipe.id, star)}
              >
                <Star
                  className={`h-4 w-4 ${
                    star <= recipe.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            ))}
            <span className="text-sm ml-2">{recipe.rating.toFixed(1)}</span>
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
            Comments ({recipe.comments.length})
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        {showComments && (
          <div className="w-full space-y-4">
            {recipe.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-2 rounded">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.text}</p>
              </div>
            ))}
            <form onSubmit={handleSubmitComment} className="w-full">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
