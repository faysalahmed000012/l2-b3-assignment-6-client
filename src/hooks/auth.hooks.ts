import {
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
} from "@/services/AuthServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserUpdate = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["USER_UPDATE"],
    mutationFn: async (userData: FormData) => await updateUser(userData),
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success("Login Successful!");
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};
