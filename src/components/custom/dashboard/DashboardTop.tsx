"use client";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";

const DashboardTop = () => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState({});

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(user?.email as string);
        if (!ignore && response) {
          setUserDetail(response);
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
    <div className="ms-10 mt-[70px]">
      <h1 className="text-3xl md:text-5xl">Hello, {userDetail?.name}</h1>
      <p className="text-gray-600 text-lg">{formattedDate}</p>
      <div className="md:flex items-center justify-start gap-6">
        <p className="text-lg flex items-center justify-start gap-3 px-1 py-1 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
          {" "}
          <HiOutlineUserGroup /> followers {userDetail?.followers?.length || 0}
        </p>
        <p className="text-lg flex items-center justify-start gap-3 px-1 py-1 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
          {" "}
          <HiOutlineUserGroup /> following {userDetail?.following?.length || 0}
        </p>
      </div>

      <hr className="my-3 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
    </div>
  );
};

export default DashboardTop;
