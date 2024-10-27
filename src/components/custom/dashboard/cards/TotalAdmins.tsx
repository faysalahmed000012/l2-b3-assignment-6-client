"use client";
import { Card, CardContent } from "@/components/ui/card";
import { getAllUsers } from "@/services/AuthServices";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

const TotalAdmins = () => {
  const { data: people } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  let users;
  if (people) {
    users = people.filter((user) => user.role == "admin");
  }
  return (
    <div className="w-full">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Total Admins</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {users?.length}
                </h2>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalAdmins;
