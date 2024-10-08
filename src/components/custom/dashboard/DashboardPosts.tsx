// @ts-nocheck
"use client";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { getAllPost } from "@/services/PostServices";
import { useEffect, useState } from "react";
import PendingPostCard from "./admin/PendingPostCard";

const DashboardPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [user]);

  return (
    <div>
      <div className="mt-6 grid lg:grid-cols-2 grid-cols-1">
        {posts?.map((post) => {
          return <PendingPostCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default DashboardPosts;
