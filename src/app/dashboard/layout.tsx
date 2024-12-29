"use client";
import CustomSidebarTrigger from "@/components/custom/dashboard/CustomSidebarTrigger";
import DashboardNav from "@/components/custom/dashboard/DashboardNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/userProvider";
import { logout } from "@/services/AuthServices";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { LogOut, LogOutIcon, Menu, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, setIsLoading: userLoading } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    userLoading(true);
    router.push("/auth/login");
  };
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
        <div className="flex w-full h-screen overflow-hidden">
          <Sidebar className="w-64 bg-gray-100 border-r border-gray-200">
            <SidebarHeader className="p-4 border-b border-gray-200">
              <Link href="/" className=" flex flex-col gap-2">
                <span className="text-3xl text-orange-500 font-bold">
                  Crunch Social
                </span>
                <span className="text-lg">Dashboard</span>
              </Link>
            </SidebarHeader>
            <SidebarContent className="p-4">
              <VisuallyHidden.VisuallyHidden>
                <Dialog>
                  {/* <DialogContent> */}
                  <DialogTitle>Navigation Menu</DialogTitle>
                  {/* </DialogContent> */}
                </Dialog>
              </VisuallyHidden.VisuallyHidden>
              <DashboardNav />
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-gray-200">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full hover:bg-red-500 hover:text-white"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log Out
              </Button>
              <CustomSidebarTrigger />
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="flex w-full items-center justify-between p-4 border-b border-gray-200">
              <SidebarTrigger>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </SidebarTrigger>
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="md:mr-14 cursor-pointer">
                      <AvatarImage
                        src={user.profilePicture || ""}
                        alt="@shadcn"
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[120px]">
                    <DropdownMenuItem
                      onClick={() => router.push(`/profile/${user.email}`)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <User2 className="mr-2 h-4 w-4 " />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleLogout()}
                      className="text-destructive cursor-pointer focus:text-destructive hover:bg-red-500 hover:text-white mt-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {/* <div className="ml-auto" /> */}
            </div>
            <div className="p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
