import { addComment, createPost, postAction } from "@/services/PostServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (data) => await createPost(data),
    onSuccess: () => {
      toast.success("Post Created successful. Please Wait for Approval");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddComment = () => {
  return useMutation<
    any,
    Error,
    { postId: string; userId: string; comment: string }
  >({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: async ({
      postId,
      userId,
      comment,
    }: {
      postId: string;
      userId: string;
      comment: string;
    }) => await addComment(postId, userId, comment),
    onSuccess: () => {
      toast.success("Comment Added Successfully");
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
