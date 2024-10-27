"use server";

import axiosInstance from "@/config/axiosInstance";
import { revalidatePath } from "next/cache";

export const makePayment = async (userId: string) => {
  try {
    const res = await axiosInstance.post(
      "/payment",
      { userId: userId },
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
