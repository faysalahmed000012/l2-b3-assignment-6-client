import RecipeFeed from "@/components/custom/post/RecipeFeed";
import TrendingSection from "@/components/custom/post/Trending";
import Sidebar from "@/components/custom/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen md:mt-16  bg-orange-50">
      <main className="relative container mx-auto px-4 py-8">
        <div className=" flex flex-col w-full lg:flex-row  lg:justify-center gap-8">
          <Sidebar className="lg:sticky lg:top-16 lg:left-0 w-full lg:w-1/4 xl:w-1/5" />
          <RecipeFeed className="w-full lg:w-1/4 xl:w-2/5" />
          <TrendingSection className="w-full lg:w-1/4 xl:w-1/4" />
        </div>
      </main>
    </div>
  );
}
