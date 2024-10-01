"use client";
import { Nav } from "@/components/custom/dashboard/Nav";
import { useState } from "react";

import {
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  StickyNote,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-36 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-24">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Users",
            href: "/dashboard/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Posts",
            href: "/dashboard/posts",
            icon: StickyNote,
            variant: "ghost",
          },
          {
            title: "Subscription",
            href: "/dashboard/subscribe",
            icon: CircleDollarSign,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
