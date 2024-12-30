// @ts-nocheck
"use client";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { getAllPost } from "@/services/PostServices";
import { useEffect, useState } from "react";
import CustomLoading from "../post/CustomLoading";
import PendingPostTable from "./admin/PendingPostCard";

const DashboardPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        setLoading(true);
        let response;
        if (user && user.role == "admin") {
          response = await getAllPost();
        } else {
          const detail = await getUserDetail(user?.email as string);
          if (detail) {
            response = await getAllPost([
              { name: "user", value: detail._id as string },
            ]);
          }
        }
        if (!ignore) {
          setPosts(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="w-full h-full">
        <CustomLoading />
      </div>
    );
  }

  const onPageChange = async (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    // setCurrentPage(newPage)
    // await fetchPosts(newPage)

    // Scroll to top of the page
    window.scrollTo(0, 0);
  };

  if (posts.length == 0) {
    return (
      <div>
        <p className="text-3xl text-center text-gray-500">No Post Found</p>
      </div>
    );
  }

  return (
    <div>
      <PendingPostTable
        posts={posts}
        currentPage
        totalPages={5}
        onPageChange={onPageChange}
      />
      {/* <div className="mt-6 grid lg:grid-cols-2 grid-cols-1">
        {posts?.map((post) => {
          return <PendingPostCard key={post._id} post={post} />;
        })}
      </div> */}
    </div>
  );
};

export default DashboardPosts;
