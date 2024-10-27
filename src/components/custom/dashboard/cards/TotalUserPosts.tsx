"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { getPostByUser } from "@/services/PostServices";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";

const TotalUserPosts = () => {
  const { user } = useUser();

  const { data: detailedUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => getUserDetail(user?.email as string),
    enabled: !!user?.email,
  });

  const { data: posts } = useQuery({
    queryKey: ["follow", detailedUser?._id],
    queryFn: () => getPostByUser(detailedUser?._id as string),
    enabled: !!detailedUser?._id,
  });

  return (
    <div>
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">My Posts</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {posts?.data || 0}
                </h2>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Published
                </span>
              </div>
            </div>

            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalUserPosts;
