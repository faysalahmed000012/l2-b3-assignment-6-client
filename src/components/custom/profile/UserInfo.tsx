"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/context/userProvider";
import { getUserDetail, handleFollow } from "@/services/AuthServices";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { IUserDetails } from "../dashboard/EditProfile";

export function UserInfo({ user }: { user: any }) {
  const [following, setFollowing] = useState(false);
  const [userDetail, setUserDetail] =
    useState<Partial<IUserDetails | null>>(null);
  const { user: currentUser } = useUser();

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(currentUser?.email as string);
        if (!ignore && response) {
          setUserDetail(response);
          setFollowing(user.followers.includes(response._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [currentUser]);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4">
            <AvatarImage src={user?.profilePicture} alt={user?.name} />
            <AvatarFallback className="bg-purple-500 text-white h-24 w-24 rounded-full flex items-center justify-center text-4xl">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center">{user?.name}</h2>
          <p className="text-gray-500 text-center mb-2">{user?.role}</p>
          <p className="text-sm text-gray-500 flex items-center justify-center mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            {user.location || "location is not updated"}
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="text-center">
              <p className="font-bold">{user?.followers?.length || 0}</p>

              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user?.following?.length || 0}</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
          {following ? (
            <>
              <Button
                onClick={async () =>
                  await handleFollow(
                    userDetail?._id as string,
                    user._id,
                    "unfollow"
                  )
                }
                className="w-full max-w-xs"
              >
                UnFollow
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={async () =>
                  await handleFollow(
                    userDetail?._id as string,
                    user._id,
                    "follow"
                  )
                }
                className="w-full max-w-xs"
              >
                Follow
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
