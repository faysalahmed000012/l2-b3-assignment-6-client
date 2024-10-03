import { createPost } from "@/services/PostServices";
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
