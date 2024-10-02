import Sidebar from "@/components/custom/dashboard/DashboardSideNavigation";
import { ReactNode } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen w-full bg-white text-black flex ">
      {/* <SideNavbar /> */}
      {/* <DashboardSidenav /> */}
      <Sidebar />
      <div className="p-8 w-full">
        <div className="ms-10 mt-[70px]">
          <h1 className="text-3xl md:text-5xl">Hello, Faysal</h1>
          <p className="text-gray-600 text-lg">24,September 2024</p>
          <div className="md:flex items-center justify-start gap-6">
            <p className="text-lg flex items-center justify-start gap-3 px-1 py-1 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
              {" "}
              <HiOutlineUserGroup /> followers 69
            </p>
            <p className="text-lg flex items-center justify-start gap-3 px-1 py-1 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
              {" "}
              <HiOutlineUserGroup /> following 69
            </p>
          </div>

          <hr className="my-3 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
