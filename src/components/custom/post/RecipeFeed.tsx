"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { CreateAndEditPost } from "./CreateAndEditPost";
import RecipeCard from "./RecipeCard";

const RecipeFeed = ({ posts, fetchData, hasMore }) => {
  return (
    <div className="w-full lg:w-1/4 xl:w-2/5">
      <div className="mb-3">
        <div className="mx-auto gap-2">
          <CreateAndEditPost />
        </div>
      </div>
      <div className="h-[1px] bg-gray-400 md:w-[80%] mx-auto mb-3"></div>
      <div className="space-y-6">
        <InfiniteScroll
          dataLength={posts?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<p className="text-center my-3">Loading...</p>}
          endMessage={
            <p className="text-center mt-6 text-gray-300">End of Post</p>
          }
        >
          <div className="grid grid-cols-1 gap-6">
            {posts?.map((recipe) => (
              <RecipeCard key={recipe._id} post={recipe} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default RecipeFeed;
