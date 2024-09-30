"use client";

import RecipeCard from "@/components/custom/RecipeCard";
import { useState } from "react";

interface Comment {
  id: number;
  author: string;
  text: string;
}

export interface Recipe {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  rating: number;
  votes: number;
  comments: Comment[];
  createdAt: Date;
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    author: "Chef Mario",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "A classic Italian pasta dish with eggs, cheese, and pancetta.",
    rating: 4.5,
    votes: 120,
    comments: [
      { id: 1, author: "Foodie123", text: "Delicious! Will make again." },
      { id: 2, author: "PastaLover", text: "Perfect balance of flavors!" },
    ],
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    author: "Chef Priya",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "A flavorful Indian curry dish with tender chicken in a creamy tomato sauce.",
    rating: 4.8,
    votes: 200,
    comments: [
      { id: 1, author: "SpiceFan", text: "Authentic taste! Loved it." },
      {
        id: 2,
        author: "CurryKing",
        text: "Great recipe, but I added more chili.",
      },
    ],
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
];

export default function Home() {
  const [recipes, setRecipes] = useState(mockRecipes);

  const handleVote = (id: number, voteType: "up" | "down") => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              votes: voteType === "up" ? recipe.votes + 1 : recipe.votes - 1,
            }
          : recipe
      )
    );
  };

  const handleRating = (id: number, rating: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, rating: (recipe.rating + rating) / 2 }
          : recipe
      )
    );
  };

  const handleAddComment = (id: number, comment: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              comments: [
                ...recipe.comments,
                {
                  id: recipe.comments.length + 1,
                  author: "CurrentUser",
                  text: comment,
                },
              ],
            }
          : recipe
      )
    );
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Crunch Social</h1>
      <div className="space-y-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onVote={handleVote}
            onRate={handleRating}
            onAddComment={handleAddComment}
          />
        ))}
      </div>
    </main>
  );
}
