"use client";
import UserProvider from "@/context/userProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default StoreProvider;
