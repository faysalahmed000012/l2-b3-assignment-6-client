"use client";

import UserFollowManagement from "@/components/custom/dashboard/user/UserFollowManagement";
import { useUser } from "@/context/userProvider";
import {
  getFollowersAndFollowing,
  getUserDetail,
} from "@/services/AuthServices";
import { useQuery } from "@tanstack/react-query";

const Followers = () => {
  const { user } = useUser();
  const { data: detailedUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => getUserDetail(user?.email as string),
    enabled: !!user?.email,
  });

  const {
    data: followData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["follow", detailedUser?._id],
    queryFn: async () => {
      const response = await getFollowersAndFollowing(
        detailedUser?._id as string
      );
      return response;
    },
    enabled: !!detailedUser?._id,
  });
  console.log(followData);
  if (!isLoading && !error && !(followData?.data?.followers?.length > 0)) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-center text-3xl text-gray-500"> No Followers</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5  w-full">
      <h1 className="text-3xl">All Followers:</h1>

      <UserFollowManagement userData={followData?.data?.followers} />
    </div>
  );
};

export default Followers;
