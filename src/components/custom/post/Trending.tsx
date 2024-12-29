"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPost } from "@/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrendingSection({ posts }: { posts: IPost[] }) {
  const [activeTab, setActiveTab] = useState<"recipes" | "chefs">("recipes");
  const router = useRouter();
  const featuredRecipe = posts && posts[0];

  // const trendingRecipes = [
  //   {
  //     title: "Mandalorian Meat Pies",
  //     author: "Din Djarin",
  //     views: 15000,
  //     image: "/placeholder.svg?height=50&width=50",
  //   },
  //   {
  //     title: "Wookiee Cookies",
  //     author: "Chewbacca",
  //     views: 12000,
  //     image: "/placeholder.svg?height=50&width=50",
  //   },
  //   {
  //     title: "Lightsaber Lemonade",
  //     author: "Obi-Wan Kenobi",
  //     views: 10000,
  //     image: "/placeholder.svg?height=50&width=50",
  //   },
  // ];

  // const topChefs = [
  //   {
  //     name: "Dex Jettster",
  //     specialty: "Diner Delights",
  //     followers: 50000,
  //     image: "/placeholder.svg?height=50&width=50",
  //   },
  //   {
  //     name: "Strono Tuggs",
  //     specialty: "Outpost Eats",
  //     followers: 45000,
  //     image: "/placeholder.svg?height=50&width=50",
  //   },
  //   {
  //     name: "Maz Kanata",
  //     specialty: "Castle Cuisine",
  //     followers: 40000,
  //     image: "/placeholder.svg?height=50&width=50",
  //   },
  // ];

  return (
    <div className={`space-y-6 w-full lg:w-1/4 xl:w-1/4`}>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">
              Trending Now
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 py-1 ${
                  activeTab === "recipes" ? "bg-orange-100 text-orange-700" : ""
                }`}
                onClick={() => setActiveTab("recipes")}
              >
                Recipes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 py-1 ${
                  activeTab === "chefs" ? "bg-orange-100 text-orange-700" : ""
                }`}
                onClick={() => setActiveTab("chefs")}
              >
                Chefs
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === "recipes" ? (
            <ul className="space-y-4">
              {posts?.slice(0, 3).map((recipe, index) => (
                <li
                  key={recipe._id}
                  onClick={() => router.push(`/recipe/${recipe._id}`)}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="relative w-12 h-12 rounded-md overflow-hidden">
                    <Image
                      src={recipe.image}
                      width={48}
                      height={48}
                      alt={recipe.title}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                    <div className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs px-1 py-0.5 rounded-tl-md">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {recipe.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      by {recipe.author.name}
                    </p>
                    {/* <p className="text-xs text-gray-400">
                      {recipe.views.toLocaleString()} views
                    </p> */}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <p>coming soon</p>
            </div>
            // <ul className="space-y-4">
            //   {topChefs.map((chef, index) => (
            //     <li key={index} className="flex items-center space-x-3">
            //       <Avatar className="h-12 w-12">
            //         <AvatarImage src={chef.image} alt={chef.name} />
            //         <AvatarFallback>{chef.name[0]}</AvatarFallback>
            //       </Avatar>
            //       <div className="flex-1 min-w-0">
            //         <p className="text-sm font-medium text-gray-900 truncate">
            //           {chef.name}
            //         </p>
            //         <p className="text-xs text-gray-500">{chef.specialty}</p>
            //         <p className="text-xs text-gray-400">
            //           {chef.followers.toLocaleString()} followers
            //         </p>
            //       </div>
            //       <Button variant="ghost" size="sm" className="px-2 py-1">
            //         Follow
            //       </Button>
            //     </li>
            //   ))}
            // </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Featured Recipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video rounded-md overflow-hidden mb-3">
            <Image
              src={featuredRecipe?.image}
              width={400}
              height={200}
              alt="Featured Recipe"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white font-bold text-lg">
                {featuredRecipe?.title}
              </h3>
              <p className="text-white/80 text-sm">
                by {featuredRecipe?.author?.name}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            {/* <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>4.9 (203 reviews)</span>
            </div> */}
            <Button
              size="sm"
              onClick={() => router.push(`/recipe/${featuredRecipe?._id}`)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              View Recipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
