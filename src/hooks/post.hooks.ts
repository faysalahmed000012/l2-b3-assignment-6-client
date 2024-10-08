import {
  Comment,
  createPost,
  postAction,
  updatePost,
} from "@/services/PostServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (data) => await createPost(data),
    onSuccess: () => {
      toast.success("Post Created successfully. Please Wait for Approval");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, { data: FormData; postId: string }>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async ({ data, postId }) => await updatePost(data, postId),
    onSuccess: () => {
      toast.success("Post Updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useComment = () => {
  return useMutation<
    any,
    Error,
    {
      postId: string;
      userId: string;
      userName: string;
      userImage?: string;
      comment: string;
      mode: "create" | "update" | "delete";
    }
  >({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: async ({
      postId,
      userId,
      userName,
      comment,
      mode,
      userImage = "",
    }: {
      postId: string;
      userId: string;
      userName: string;
      comment: string;
      mode: "create" | "update" | "delete";
      userImage?: string;
    }) => await Comment(postId, userId, userName, comment, mode, userImage),
    onSuccess: () => {
      toast.success("Comment Action Taken Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePostAction = () => {
  return useMutation<any, Error>({
    mutationKey: ["POST_ACTION"],
    mutationFn: async (data) => await postAction(data),
    onSuccess: () => {
      toast.success("Post Updated successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
