"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { getAllLikes } from "@/services/PostServices";
import { useQuery } from "@tanstack/react-query";
import { ThumbsUpIcon } from "lucide-react";

const AllLikes = () => {
  const { user } = useUser();
  const { data: detailedUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => await getUserDetail(user?.email as string),
    enabled: !!user?.email,
  });

  const { data: likes } = useQuery({
    queryKey: ["likes", detailedUser?._id],
    queryFn: async () => await getAllLikes(detailedUser?._id as string),
    enabled: !!detailedUser?._id,
  });
  console.log(likes);
  return (
    <div>
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">
                Total Likes in My Posts
              </p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {(likes?.data && likes.data) || 0}
                </h2>
              </div>
            </div>

            <div className="p-3 bg-purple-100 rounded-full">
              <ThumbsUpIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllLikes;
