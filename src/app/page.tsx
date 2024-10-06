import { FeaturedCards } from "@/components/custom/FeaturedCards";
import Header from "@/components/custom/Header";
import RecipeCard from "@/components/custom/RecipeCard";
import { SearchAndFilter } from "@/components/custom/SearchAndFilter";
import { getAllPost } from "@/services/PostServices";

// types/recipe.ts

export default async function Home() {
  const posts = await getAllPost();

  // const handleSearch = (query: string) => {
  //   const lowercaseQuery = query.toLowerCase();
  //   const filtered = recipes.filter(
  //     (recipe) =>
  //       recipe.title.toLowerCase().includes(lowercaseQuery) ||
  //       recipe.description.toLowerCase().includes(lowercaseQuery)
  //   );
  //   setFilteredRecipes(filtered);
  // };

  // const handleFilter = (category: string) => {
  //   if (category === "all") {
  //     setFilteredRecipes(recipes);
  //   } else {
  //     const filtered = recipes.filter((recipe) => recipe.category === category);
  //     setFilteredRecipes(filtered);
  //   }
  // };

  // const handleVote = (id: number, voteType: "up" | "down") => {
  //   const updatedRecipes = recipes.map((recipe) =>
  //     recipe.id === id
  //       ? {
  //           ...recipe,
  //           votes: voteType === "up" ? recipe.votes + 1 : recipe.votes - 1,
  //         }
  //       : recipe
  //   );
  //   setRecipes(updatedRecipes);
  //   setFilteredRecipes(
  //     filteredRecipes.map((recipe) =>
  //       recipe.id === id
  //         ? {
  //             ...recipe,
  //             votes: voteType === "up" ? recipe.votes + 1 : recipe.votes - 1,
  //           }
  //         : recipe
  //     )
  //   );
  // };

  // const handleRating = (id: number, rating: number) => {
  //   const updatedRecipes = recipes.map((recipe) =>
  //     recipe.id === id
  //       ? { ...recipe, rating: (recipe.rating + rating) / 2 }
  //       : recipe
  //   );
  //   setRecipes(updatedRecipes);
  //   setFilteredRecipes(
  //     filteredRecipes.map((recipe) =>
  //       recipe.id === id
  //         ? { ...recipe, rating: (recipe.rating + rating) / 2 }
  //         : recipe
  //     )
  //   );
  // };

  // const handleAddComment = (id: number, comment: string) => {
  //   const updatedRecipes = recipes.map((recipe) =>
  //     recipe.id === id
  //       ? {
  //           ...recipe,
  //           comments: [
  //             ...recipe.comments,
  //             {
  //               id: recipe.comments.length + 1,
  //               author: "CurrentUser",
  //               text: comment,
  //             },
  //           ],
  //         }
  //       : recipe
  //   );
  //   setRecipes(updatedRecipes);
  //   setFilteredRecipes(
  //     filteredRecipes.map((recipe) =>
  //       recipe.id === id
  //         ? {
  //             ...recipe,
  //             comments: [
  //               ...recipe.comments,
  //               {
  //                 id: recipe.comments.length + 1,
  //                 author: "CurrentUser",
  //                 text: comment,
  //               },
  //             ],
  //           }
  //         : recipe
  //     )
  //   );
  // };
  return (
    <div className="min-h-screen ">
      <Header />
      <main className="container mx-auto p-4 pt-20">
        <div className="mb-6">
          <h1 className="text-center text-4xl font-bold mb-4 text-gray-800">
            Discover Delicious Recipes
          </h1>
          <p className="text-center text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of food lovers and share your culinary creations
            with the world!
          </p>
        </div>
        <SearchAndFilter />
        <FeaturedCards />
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <RecipeCard key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
