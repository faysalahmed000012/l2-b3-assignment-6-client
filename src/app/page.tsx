"use client";
import RecipeFeed from "@/components/custom/post/RecipeFeed";
import TrendingSection from "@/components/custom/post/Trending";
import Sidebar from "@/components/custom/Sidebar";
import { getAllPost } from "@/services/PostServices";
import { IPost } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div className="min-h-screen md:mt-16  bg-orange-50">
      <main className="relative container mx-auto px-4 py-8">
        <div className=" flex flex-col w-full lg:flex-row  lg:justify-center gap-8">
          <Sidebar setSearchTerm={setSearchTerm} setTag={setTag} tag={tag} />
          <RecipeFeed posts={posts} fetchData={fetchData} hasMore={hasMore} />
          <TrendingSection posts={posts} />
        </div>
      </main>
    </div>
  );
}
