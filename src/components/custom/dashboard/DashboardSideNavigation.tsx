"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useUser } from "@/context/userProvider";
import { cn } from "@/lib/utils";
import {
  CircleDollarSign,
  Edit2Icon,
  LayoutDashboard,
  Menu,
  StickyNote,
  User,
  Users2Icon,
  UsersIcon,
  UsersRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      variant: "default",
    },

    {
      title: "My Profile",
      href: "/dashboard/profile",
      icon: User,
      variant: "ghost",
    },
    {
      title: "Posts",
      href: "/dashboard/posts",
      icon: StickyNote,
      variant: "ghost",
    },
    {
      title: "Edit Profile",
      href: "/dashboard/editProfile",
      icon: Edit2Icon,
      variant: "ghost",
    },
    {
      title: "Followers",
      href: "/dashboard/followers",
      icon: UsersIcon,
      variant: "ghost",
    },
    {
      title: "Following",
      href: "/dashboard/following",
      icon: Users2Icon,
      variant: "ghost",
    },

    user && user.role == "admin"
      ? {
          title: "Users",
          href: "/dashboard/users",
          icon: UsersRound,
          variant: "ghost",
        }
      : {
          title: "Subscription",
          href: "/dashboard/subscribe",
          icon: CircleDollarSign,
          variant: "ghost",
        },
  ];

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-24 left-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] p-0">
          <div className={cn("pb-12 h-full")}>
            <div className="space-y-4 py-4 h-full">
              <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  Dashboard
                </h2>
                <ScrollArea className="h-[calc(100vh-8rem)] px-1">
                  <nav className="flex flex-col space-y-2">
                    {routes.map((route) => {
                      return (
                        <Link key={route.href} href={route.href}>
                          <Button
                            variant={
                              pathname === route.href ? "default" : "ghost"
                            }
                            className="w-full justify-start"
                            onClick={() => setIsOpen(false)}
                          >
                            <route.icon className="mr-2 h-4 w-4" />
                            {route.title}
                          </Button>
                        </Link>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div
        className={cn(
          "hidden md:block pb-12 mt-[70px] border-r-2 border-gray-300"
        )}
      >
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <ScrollArea className="h-[calc(100vh-8rem)] px-1">
              <nav className="flex flex-col space-y-2">
                {routes.map((route) => (
                  <Link key={route.href} href={route.href}>
                    <Button
                      variant={pathname === route.href ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.title}
                    </Button>
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
