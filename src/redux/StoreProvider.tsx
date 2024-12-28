"use client";
import UserProvider from "@/context/userProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const StoreProvider = ({ children }: { children: ReactNode }) => {
  // const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
        <Toaster position="top-center" richColors />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default StoreProvider;
