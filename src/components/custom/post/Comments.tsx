"use client";
import threeDot from "@/assets/icons/three-dot.svg";
import { useUser } from "@/context/userProvider";
import { useComment } from "@/hooks/post.hooks";
import { getUserDetail } from "@/services/AuthServices";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Textarea } from "../../ui/textarea";
import { IUserDetails } from "../dashboard/EditProfile";
import TimeAgo from "./TimeAgo";

const Comments = ({ comments, postId }) => {
  const { user } = useUser();
  const { mutate: Comment } = useComment();

  const [detailedUser, setDetailedUser] =
    useState<Partial<IUserDetails | null>>(null);

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

  const handleComment = (e) => {
    e.preventDefault();
    Comment({
      postId: postId,
      userId: detailedUser?._id as string,
      userName: detailedUser?.name as string,
      userImage: detailedUser?.profilePicture,
      mode: "create",
      comment: e.target.comment.value,
    });

    e.target.comment.value = "";
  };

  const handleDeleteComment = (comment) => {
    console.log(comment);
    Comment({
      postId: postId,
      userId: comment._id as string,
      userName: comment?.userName as string,
      userImage: comment?.userImage,
      mode: "delete",
      comment: "nothing",
    });
  };

  const handleEditComment = (e, comment) => {
    e.preventDefault();
    Comment({
      postId: postId,
      userId: comment?._id as string,
      userName: detailedUser?.name as string,
      userImage: detailedUser?.profilePicture,
      mode: "update",
      comment: e.target.comment.value,
    });
  };

  return (
    <div className="mt-10">
      <p className="text-3xl mb-6">Comments</p>
      <form onSubmit={handleComment} action="">
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
              <Textarea
                name="comment"
                className="rounded-md text-lg"
                placeholder="Comment"
              />
            </div>
          </div>
          <Button type="submit" className="ms-16">
            POST
          </Button>
        </div>
      </form>
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
                  <AvatarFallback className="bg-purple-500 text-white h-10 w-10 rounded-full flex items-center justify-center">
                    {comment?.userName}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xl">{comment?.userName}</p>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <div className="text-sm text-gray-600">
                  <TimeAgo time={new Date(comment?.updatedAt)} />
                </div>
                {comment.userId == detailedUser?._id && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-8 h-8 px-2 py-1">
                        <Image
                          src={threeDot}
                          alt="three-dot"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => handleDeleteComment(comment)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="text-orange-500"
                              variant="outline"
                            >
                              Edit Comment
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <form
                              onSubmit={(e) => handleEditComment(e, comment)}
                              action=""
                            >
                              <DialogHeader>
                                <DialogTitle>Edit Comment</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <Textarea
                                  defaultValue={comment.content}
                                  name="comment"
                                />
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="submit">Save changes</Button>
                                </DialogClose>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
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
