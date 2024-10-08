"use client";
import Sidebar from "@/components/custom/dashboard/DashboardSideNavigation";
import DashboardTop from "@/components/custom/dashboard/DashboardTop";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen w-full bg-white text-black flex ">
      <Sidebar />
      <div className="p-8 w-full">
        <DashboardTop />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
