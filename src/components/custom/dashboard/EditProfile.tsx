// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ChangePassword from "./ChangePassword";

export interface IUserDetails {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  role: string;
  posts?: [];
  likes?: [];
  comments?: [];
  ratedPosts?: [];
  followers?: [];
  following?: [];
  profilePicture?: string;
  location?: string;
  isPremium: boolean;
  premiumExpires: null | number;
  updatedAt: string;
}

const EditProfile = () => {
  const [currentUser, setCurrentUser] = useState<IUserDetails | null>(null);
  const { user } = useUser();
  const [previewImage, setPreviewImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(user?.email as string);

        if (!ignore) {
          setCurrentUser(response as IUserDetails | null);
          setPreviewImage(response?.profilePicture as string);
          console.log(response);
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Profile Info:
        </h2>
        <ChangePassword email={user?.email as string} />
        <Button
          onClick={() => router.push("/dashboard/editProfile")}
          className="w-full sm:w-auto"
        >
          <FaRegEdit className="mr-2" /> Edit Profile
        </Button>
      </div>
      <form>
        <div className="p-6 sm:p-10 border border-gray-200 rounded-2xl">
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center">
            <div className="w-full sm:w-2/3 mb-6 sm:mb-0">
              <Image
                src={previewImage}
                width={160}
                height={160}
                alt="Profile"
                className="rounded-full mx-auto sm:mx-0 object-cover w-[160px] h-[160px]"
              />
            </div>
            <div className="w-full sm:w-2/3">
              <Label htmlFor="name" className="text-gray-600 block mb-2">
                Name:
              </Label>

              <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
                {currentUser?.name}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <Label htmlFor="email" className="text-gray-600 block mb-2">
                Email:
              </Label>

              <p className="text-lg sm:text-xl"> {currentUser?.email}</p>
            </div>
            <div className="w-full sm:w-1/2">
              <Label htmlFor="bio" className="text-gray-600 block mb-2">
                Bio:
              </Label>

              <p className="text-base sm:text-lg"> {currentUser?.bio}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <Label htmlFor="location" className="text-gray-600 block mb-2">
                Location:
              </Label>

              <p className="text-lg sm:text-xl"> {currentUser?.location}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
