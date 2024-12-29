import {
  Comment,
  createPost,
  getAllPost,
  postAction,
  updatePost,
} from "@/services/PostServices";
import { ICommentPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation<any, Error, ICommentPayload>({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: async (commentPayload: ICommentPayload) =>
      await Comment(commentPayload),
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

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_POSTS"],
    queryFn: async () => await getAllPost(),
  });
};
