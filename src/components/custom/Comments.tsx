"use client";
import { useUser } from "@/context/userProvider";
import { getUserDetail } from "@/services/AuthServices";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import TimeAgo from "./TimeAgo";

const Comments = ({ comments }) => {
  const { user } = useUser();

  const [detailedUser, setDetailedUser] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(user?.email as string);
        if (!ignore) {
          setDetailedUser(response);
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
    <div className="mt-10">
      <p className="text-3xl mb-6">Comments</p>
      <div className="mb-3">
        <div className="w-full flex items-start justify-start gap-6 mb-3">
          <div>
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src={
                  detailedUser?.profilePicture ||
                  "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
              <AvatarFallback>me</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            <Textarea className="rounded-md text-lg" placeholder="Comment" />
          </div>
        </div>
        <Button className="ms-16">POST</Button>
      </div>
      <div className="h-0.5 w-full bg-gray-500 rounded-full mb-3"></div>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="w-full mb-7">
            <div>
              <div className="flex items-center justify-start gap-3">
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10 rounded-full"
                    src={comment.userImage || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>{comment?.userName}</AvatarFallback>
                </Avatar>
                <p className="text-xl">{comment?.userName}</p>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <p className="text-sm text-gray-600">
                  <TimeAgo time={new Date(comment?.updatedAt)} />
                </p>
              </div>
            </div>
            <div className="ms-14">
              <div className="text-gray-600 rounded-full">
                {" "}
                {comment?.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
