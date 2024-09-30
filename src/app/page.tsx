"use client";

import Header from "@/components/custom/Header";
import RecipeCard from "@/components/custom/RecipeCard";
import { SearchAndFilter } from "@/components/custom/SearchAndFilter";
import { useState } from "react";

// types/recipe.ts
export interface Comment {
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
  createdAt: Date;
  comments: Comment[];
  category: string; // Add this line
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
    category: "main-course",
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: 2,
    title: "Chocolate Lava Cake",
    author: "Chef Emily",
    image: "/placeholder.svg?height=300&width=400",
    description: "Decadent chocolate cake with a gooey center.",
    rating: 4.8,
    votes: 95,
    comments: [
      { id: 1, author: "SweetTooth", text: "Heaven on a plate!" },
      { id: 2, author: "ChocoholicAnon", text: "Absolutely divine." },
    ],
    category: "dessert",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
  },
];

export default function Home() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercaseQuery) ||
        recipe.description.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredRecipes(filtered);
  };

  const handleFilter = (category: string) => {
    if (category === "all") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) => recipe.category === category);
      setFilteredRecipes(filtered);
    }
  };

  const handleVote = (id: number, voteType: "up" | "down") => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id
        ? {
            ...recipe,
            votes: voteType === "up" ? recipe.votes + 1 : recipe.votes - 1,
          }
        : recipe
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(
      filteredRecipes.map((recipe) =>
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
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id
        ? { ...recipe, rating: (recipe.rating + rating) / 2 }
        : recipe
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(
      filteredRecipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, rating: (recipe.rating + rating) / 2 }
          : recipe
      )
    );
  };

  const handleAddComment = (id: number, comment: string) => {
    const updatedRecipes = recipes.map((recipe) =>
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
    );
    setRecipes(updatedRecipes);
    setFilteredRecipes(
      filteredRecipes.map((recipe) =>
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600">
          Recipe Feed
        </h1>
        <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => (
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
    </div>
  );
}
