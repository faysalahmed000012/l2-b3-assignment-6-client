"use server";

import axiosInstance from "@/config/axiosInstance";

export const getAllPost = async () => {
  try {
    const res = await axiosInstance.get("/posts");
    return res.data.data;
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
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id: string) => {
  try {
    const res = axiosInstance.delete(`/posts/${id}`, { withCredentials: true });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (data: any) => {
  try {
    const res = await axiosInstance.put("/posts/update", data, {
      withCredentials: true,
    });
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
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (
  postId: string,
  userId: string,
  userName: string,
  content: string,
  userImage?: string
) => {
  const body = {
    postId: postId,
    comment: {
      userId: userId,
      userName: userName,
      userImage: userImage || "",
      content: content,
    },
  };
  try {
    const res = await axiosInstance.put("/posts/action/comment", body, {
      withCredentials: true,
    });
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
