"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/userProvider";
import { approvePost, deletePost, postAction } from "@/services/PostServices";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TimeAgo from "../../post/TimeAgo";

interface PendingPost {
  _id: string;
  title: string;
  image: string;
  author: {
    name: string;
    profilePicture: string;
  };
  status: string;
  createdAt: string;
  description: string;
}

interface PendingPostTableProps {
  posts: PendingPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PendingPostTable({
  posts,
  currentPage,
  totalPages,
  onPageChange,
}: PendingPostTableProps) {
  const { user } = useUser();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPost, setPreviewPost] = useState<PendingPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  function createMarkup(c: string) {
    return { __html: c };
  }

  const onAdminAction = async (postId: string, action: "accept" | "reject") => {
    try {
      setIsActionLoading(true);
      if (action === "accept") {
        await approvePost(postId);
      } else if (action === "reject") {
        await postAction({ status: "rejected" });
      }
    } catch (error) {
      console.error("Error performing action:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        setIsDeleting(true);
        await deletePost(postId);
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const openPreview = (post: PendingPost) => {
    setPreviewPost(post);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div className=" lg:mx-10 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Post Details</TableHead>
              <TableHead className="min-w-[150px]">Author</TableHead>
              <TableHead className="min-w-[100px]">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => (
              <TableRow key={post._id}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/recipe/${post._id}`}
                        className="font-medium hover:underline"
                      >
                        {post.title}
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={() => openPreview(post)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.profilePicture} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{post.author.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <TimeAgo time={new Date(post.createdAt)} />
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <div className="flex items-center justify-end space-x-2">
                      {/* {user && user.role === "admin" && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-green-500 hover:text-green-600"
                                disabled={
                                  post.status === "posted" || isActionLoading
                                }
                                onClick={() =>
                                  onAdminAction(post._id, "accept")
                                }
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Approve post</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                disabled={isActionLoading}
                                onClick={() =>
                                  onAdminAction(post._id, "reject")
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Reject post</TooltipContent>
                          </Tooltip>
                        </>
                      )} */}

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                            disabled={isDeleting}
                            onClick={() => handleDelete(post._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete post</TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div> */}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewPost?.title}</DialogTitle>
            <DialogDescription>
              Posted by {previewPost?.author.name} •{" "}
              <TimeAgo time={new Date(previewPost?.createdAt || "")} />
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative h-[300px] w-full">
              <Image
                src={previewPost?.image || ""}
                alt={previewPost?.title || ""}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={createMarkup(
                previewPost?.description || ""
              )}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
