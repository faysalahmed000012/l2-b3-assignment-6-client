"use client";
import { mockRecipes } from "@/app/page";
import PendingPostCard from "@/components/custom/dashboard/admin/PendingPostCard";

const page = () => {
  return (
    <div>
      <h1 className="text-3xl">Pending Posts : </h1>
      <div className="mt-6 grid lg:grid-cols-2 grid-cols-1">
        {mockRecipes.map((recipe) => {
          return <PendingPostCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
};

export default page;
