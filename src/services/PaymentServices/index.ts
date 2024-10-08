"use server";

import axiosInstance from "@/config/axiosInstance";

export const makePayment = async (userId: string) => {
  try {
    const res = await axiosInstance.post(
      "/payment",
      { userId: userId },
      {
        withCredentials: true,
      }
    );

    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
