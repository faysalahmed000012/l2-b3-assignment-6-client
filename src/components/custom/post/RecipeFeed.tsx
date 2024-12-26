"use client";
import { getAllPost } from "@/services/PostServices";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CreateAndEditPost } from "./CreateAndEditPost";
import RecipeCard from "./RecipeCard";

const RecipeFeed = ({ className }: { className?: string }) => {
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tag, setTag] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (resetPosts = false) => {
    const params = [
      { name: "limit", value: 2 },
      { name: "page", value: resetPosts ? 1 : page },
      { name: "searchTerm", value: searchTerm },
    ];
    if (tag !== "All") {
      params.push({ name: "tags", value: tag });
    }
    try {
      const res = await getAllPost(params);

      if (res?.meta && res?.meta?.page >= res?.meta?.totalPage) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (resetPosts) {
        setPosts(res?.data);
        setPage(2);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...res?.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchData(true);
  }, [tag, searchTerm]);
  return (
    <div className={className}>
      <div className="mb-3">
        <div className="mx-auto gap-2">
          <CreateAndEditPost />
        </div>
      </div>
      <div className="h-[1px] bg-gray-400 md:w-[80%] mx-auto mb-3"></div>
      <div className="space-y-6">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<p className="text-center my-3">Loading...</p>}
          endMessage={
            <p className="text-center mt-6 text-gray-300">End of Post</p>
          }
        >
          <div className="grid grid-cols-1 gap-6">
            {posts.map((recipe) => (
              <RecipeCard key={recipe._id} post={recipe} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default RecipeFeed;
