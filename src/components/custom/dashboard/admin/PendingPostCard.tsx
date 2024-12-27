"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/userProvider";
import { approvePost, deletePost, postAction } from "@/services/PostServices";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "../../post/TimeAgo";

export default function PendingPostCard({ post }: { post: any }) {
  const { user } = useUser();
  function createMarkup(c) {
    return { __html: c };
  }

  const onAdminAction = async (action: "accept" | "reject") => {
    if (action === "accept") {
      const res = await approvePost(post._id);
      return res;
    } else if (action === "reject") {
      const res = await postAction({ status: "rejected" });
      return res;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 ">
      <CardHeader>
        <div className="md:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src={post?.author?.profilePicture}
              />
              <AvatarFallback>{post?.author?.name}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/recipe/5`}>
                <CardTitle>{post?.title}</CardTitle>
              </Link>
              <p className="text-sm text-gray-500">by {post?.author?.name}</p>
            </div>
          </div>
          <div className="ms-12 md:ms-0">
            <TimeAgo time={new Date(post?.createdAt)} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={post?.image}
          alt={post?.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={createMarkup(post.description)}
        ></div>
        <div className="flex justify-between items-center"></div>
      </CardContent>
      <CardFooter className="flex  items-center justify-between ">
        {user.role == "admin" && (
          <Button
            disabled={post.status == "posted"}
            onClick={() => onAdminAction("accept")}
            className="bg-green-500"
          >
            Approve
          </Button>
        )}
        <Button
          onClick={async () => await deletePost(post._id)}
          className="bg-red-500"
        >
          Delete
        </Button>
        {user.role == "admin" && (
          <Button
            onClick={() => onAdminAction("reject")}
            className="bg-red-500"
          >
            Reject
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
