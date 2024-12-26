"use server";

import axiosInstance from "@/config/axiosInstance";
import { revalidatePath } from "next/cache";

export interface IQuery {
  name: string;
  value: string | number;
}

export const getAllPost = async (queries?: IQuery[]) => {
  const params = new URLSearchParams();
  if (queries) {
    queries.forEach((item) => params.append(item.name, item.value as string));
  }
  try {
    const res = await axiosInstance.get(`/posts`, { params: params });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (data: FormData) => {
  try {
    const res = await axiosInstance.post("/posts", data, {
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

export const approvePost = async (id: string) => {
  try {
    const res = await axiosInstance({
      method: "PUT",
      url: `/posts/approve/${id}`,
      withCredentials: true,
    });
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id: string) => {
  try {
    const res = axiosInstance.delete(`/posts/${id}`, { withCredentials: true });
    revalidatePath("/");
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (data: any, postId: string) => {
  try {
    const res = await axiosInstance.put(`/posts/update/${postId}`, data, {
      withCredentials: true,
    });
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const postAction = async (data: any) => {
  try {
    const res = await axiosInstance.put("/posts/action", data, {
      withCredentials: true,
    });
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const Comment = async (
  postId: string,
  userId: string,
  userName: string,
  content: string,
  mode: "create" | "update" | "delete",
  replyTo?: string,
  userImage?: string
) => {
  const body = {
    postId: postId,
    comment: {
      userId: userId,
      userName: userName,
      userImage: userImage || "",
      content: content,
      replyTo: replyTo || "",
    },
    mode: mode,
  };
  try {
    const res = await axiosInstance.put("/posts/action/comment", body, {
      withCredentials: true,
    });
    revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const upVote = async (postId: string, userId: string) => {
  try {
    const body = {
      userId,
      postId,
    };
    const res = await axiosInstance.put("/posts/action/upVote", body, {
      withCredentials: true,
    });
    // revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const downVote = async (postId: string, userId: string) => {
  try {
    const body = {
      userId,
      postId,
    };
    const res = await axiosInstance.put("/posts/action/downVote", body, {
      withCredentials: true,
    });
    // revalidatePath("/");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostByUser = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/posts/user/${userId}`, {
      withCredentials: true,
    });
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const userUpvotedPosts = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/posts/user/upvoted/${userId}`, {
      withCredentials: true,
    });
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addRating = async (
  postId: string,
  userId: string,
  rating: number
) => {
  try {
    const result = await axiosInstance.put(
      "/posts/action/rating",
      { postId, userId, rating },
      { withCredentials: true }
    );
    revalidatePath("/");
    return result?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLikes = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/posts/user/getLikes/${userId}`);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
