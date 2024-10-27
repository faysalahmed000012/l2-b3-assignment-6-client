// @ts-nocheck
"use client";
import { FeaturedCards } from "@/components/custom/FeaturedCards";
import Header from "@/components/custom/Header";
import RecipeCard from "@/components/custom/RecipeCard";
import { SearchAndFilter } from "@/components/custom/SearchAndFilter";
import { getAllPost } from "@/services/PostServices";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [tag, setTag] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(
    async (resetPosts = false) => {
      const params = [
        { name: "limit", value: 2 },
        { name: "page", value: resetPosts ? 1 : page },
        { name: "searchTerm", value: searchTerm },
      ];
      if (tag !== "All") {
        params.push({ name: "tags", value: tag });
      }
      console.log(params);
      try {
        const res = await getAllPost(params);

        if (res.meta.page >= res.meta.totalPage) {
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
    },
    [page, tag, searchTerm]
  );

  useEffect(() => {
    setPage(1);
    fetchData(true);
  }, [tag, searchTerm]);

  return (
    <div className="min-h-screen ">
      <Header />
      <main className="container mx-auto p-4 pt-20">
        <motion.div className="mb-6">
          <h1 className="text-center text-4xl font-bold mb-4 text-gray-800">
            Discover Delicious Recipes
          </h1>
          <p className="text-center text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of food lovers and share your culinary creations
            with the world!
          </p>
        </motion.div>
        <SearchAndFilter
          setSearchTerm={setSearchTerm}
          setTag={setTag}
          tag={tag}
        />
        <FeaturedCards />
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="text-center mt-6 text-gray-300">End of Post</p>
          }
        >
          <motion.div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts?.map((post) => (
              <RecipeCard key={post._id} post={post} />
            ))}
          </motion.div>
        </InfiniteScroll>
      </main>
    </div>
  );
}
