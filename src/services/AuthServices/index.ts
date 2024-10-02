"use server";

import axiosInstance from "@/config/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const registerUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      console.log(data);
      cookies().set("accessToken", data?.AccessToken);
      cookies().set("refreshToken", data?.RefreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    console.log(data.AccessToken);
    if (data.success) {
      cookies().set("accessToken", data?.AccessToken);
      cookies().set("refreshToken", data?.RefreshToken);
    }

    return data;
  } catch (error: any) {
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
