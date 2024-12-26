// @ts-nocheck
"use server";

import { IUserDetails } from "@/components/custom/dashboard/EditProfile";
import axiosInstance from "@/config/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const registerUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data?.AccessToken);
      cookies().set("refreshToken", data?.RefreshToken);
    }
    revalidatePath("/");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      cookies().set("accessToken", data?.AccessToken);
      cookies().set("refreshToken", data?.RefreshToken);
    }
    // revalidatePath("/");
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      email: decodedToken.email,
      role: decodedToken.role,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  }
  return decodedToken;
};

export const savePost = async (
  userId: string,
  postId: string,
  action: "add" | "remove"
) => {
  try {
    const res = await axiosInstance.put("/user/savePost", {
      userId,
      postId,
      action,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};

export const getUserDetail = async (email: string) => {
  try {
    const res = await axiosInstance({ url: `/user/${email}`, method: "GET" });
    const user: Partial<IUserDetails> = res?.data?.data;
    return user;
  } catch (error) {
    throw new Error("Failed to get User Details, try again!");
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get("/user", { withCredentials: true });
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (data: FormData) => {
  try {
    const res = await axiosInstance.put(`/user/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const blockUser = async (email: string, block: boolean) => {
  try {
    const res = await axiosInstance.put(
      "/user/block",
      { email, block },
      {
        withCredentials: true,
      }
    );
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const makeAdmin = async (email: string, role: "user" | "admin") => {
  try {
    const res = await axiosInstance.put(
      "/user/makeAdmin",
      { email, role },
      { withCredentials: true }
    );
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFollow = async (
  follower: string,
  following: string,
  type: "follow" | "unfollow"
) => {
  try {
    const res = await axiosInstance.put(
      "/user/follow",
      { following, follower, type },
      { withCredentials: true }
    );
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const res = await axiosInstance.delete(`/user/${userId}`, {
      withCredentials: true,
    });
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const passwordChange = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  try {
    const res = await axiosInstance.put("/auth/change-password", {
      email,
      oldPassword,
      newPassword,
    });
    revalidatePath("/");
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await axiosInstance.post("/auth/forgot-password", { email });
    revalidatePath("/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
      password,
    });
    revalidatePath("/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowersAndFollowing = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/user/follow/${userId}`);

    revalidatePath("/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
