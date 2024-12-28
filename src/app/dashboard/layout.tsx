"use client";
import AppSidebar from "@/components/custom/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <div className=" min-h-screen w-full bg-white text-black flex ">
    //   <Sidebar />
    //   <div className="p-8 w-full">
    //     <DashboardTop />
    //     {children}
    //   </div>
    // </div>
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
