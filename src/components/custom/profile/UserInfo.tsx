"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/context/userProvider";
import { handleFollow } from "@/services/AuthServices";
import { MapPin } from "lucide-react";

export function UserInfo({ user }: { user: any }) {
  const { user: currentUser } = useUser();
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4">
            <AvatarImage src={user?.profilePicture} alt={user?.name} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center">{user?.name}</h2>
          <p className="text-gray-500 text-center mb-2">{user?.role}</p>
          <p className="text-sm text-gray-500 flex items-center justify-center mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            {user.location || "nigatola"}
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="text-center">
              <p className="font-bold">{user?.followers?.length || 0}</p>

              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">
                {user?.following?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
          <Button
            onClick={async () =>
              await handleFollow(currentUser?.email as string, user._id)
            }
            className="w-full max-w-xs"
          >
            Follow
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
