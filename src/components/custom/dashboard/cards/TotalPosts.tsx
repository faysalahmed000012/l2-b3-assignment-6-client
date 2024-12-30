"use client";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPost } from "@/services/PostServices";
import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";

const TotalPosts = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPost(),
  });
  return (
    <div className="w-full">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {data?.data?.length}
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

export default TotalPosts;
