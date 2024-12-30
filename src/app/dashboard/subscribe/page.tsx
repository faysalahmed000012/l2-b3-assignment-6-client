"use client";
import { IUserDetails } from "@/components/custom/dashboard/EditProfile";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { makePayment } from "@/services/PaymentServices";
import { useEffect, useState } from "react";

const Subscribe = () => {
  const { user } = useUser();
  const [userDetail, setUserDetail] =
    useState<Partial<IUserDetails | null>>(null);

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(user?.email as string);
        if (!ignore) {
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

  const handlePayment = async () => {
    if (userDetail && userDetail._id) {
      const res = await makePayment(userDetail._id as string);
      window.location.replace(res.payment_url);
      console.log(res.payment_url);
    } else {
      console.log("User  details not available");
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Subscribe To Access Premium Content</h1>
      <div className="mt-10 md:flex items-center justify-evenly">
        <div className="flex-1 max-w-[350px] h-[500px] border border-orange-500 rounded-xl p-3 relative">
          <h1 className="">Free Plan:</h1>
          <p className="text-4xl">$0.00</p>
          <hr className="my-3 h-0.5 border-t-0 bg-orange-500 bg-opacity-70" />
          <h2 className="text-lg">Benefits:</h2>
          <div className="ms-3 mt-6">
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">
                Like Comment and Share Posts on Social Media
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Post Any New Recipe</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">See Analytics</p>
            </div>
          </div>
          <div className=" flex items-center justify-center absolute bottom-6 left-5 right-5">
            {userDetail?.isPremium == false && (
              <Button disabled className="w-[90%] bg-orange-500">
                Current
              </Button>
            )}
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex-1 max-w-[350px] h-[500px] border border-orange-500 rounded-xl p-3 relative">
          <h1 className="">Premium Plan:</h1>
          <p className="text-4xl">$5.00</p>
          <hr className="my-3 h-0.5 border-t-0 bg-orange-500 bg-opacity-70" />
          <h2 className="text-lg">Benefits:</h2>
          <div className="ms-3 mt-6">
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Free posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Access To all Premium posts</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">All the Features of Free Users</p>
            </div>
            <div className="mt-3 flex items-center justify-start gap-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
              <p className="text-lg">Print Post</p>
            </div>
          </div>
          <div className=" flex items-center justify-center absolute bottom-6 left-5 right-5">
            {userDetail?.isPremium ? (
              <Button disabled className="w-[90%] bg-orange-500">
                Current
              </Button>
            ) : (
              <Button onClick={handlePayment} className="w-[90%] bg-orange-500">
                Subscribe
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
