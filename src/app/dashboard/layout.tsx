import SideNavbar from "@/components/custom/dashboard/Sidenav";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen w-full bg-white text-black flex ">
      <SideNavbar />
      {/* main page */}
      <div className="p-8 w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
