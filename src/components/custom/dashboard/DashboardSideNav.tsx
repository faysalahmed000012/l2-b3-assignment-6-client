"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Dashboard", link: "/dashboard" },
  { icon: PieChart, label: "Analytics", link: "/dashboard/posts" },
  { icon: Users, label: "Users", link: "/dashboard/users" },
  { icon: Settings, label: "Settings", link: "/dashboard/subscribe" },
];

export const DashboardSidenav = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`
      fixed left-0 top-0 h-screen 
      transition-all duration-300 ease-in-out bg-gray-200
      ${isOpen ? "w-64" : "w-20"}
    `}
    >
      <div className="flex justify-end p-4 mt-[70px] ">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-200 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li onClick={() => redirect(item.link)} key={index}>
              <Link href={item.link}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`
                        w-full text-left flex items-center space-x-4 px-4 py-2
                        hover:bg-gray-700 transition-colors duration-200
                      `}
                      >
                        <item.icon size={24} />
                        <span
                          className={`${
                            isOpen ? "opacity-100" : "opacity-0 w-0"
                          } transition-opacity duration-200`}
                        >
                          {item.label}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className={isOpen ? "hidden" : ""}
                    >
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
