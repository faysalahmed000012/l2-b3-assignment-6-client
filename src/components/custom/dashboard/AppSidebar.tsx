import {
  CreditCard,
  FileText,
  LayoutDashboard,
  Receipt,
  Settings,
  UserCircle,
  UserCog,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Profile",
    url: "/dashboard/edit-profile",
    icon: UserCircle,
  },
  {
    title: "Posts",
    url: "/dashboard/manage-posts",
    icon: FileText,
  },
  {
    title: "Followers",
    url: "/dashboard/connections/followers",
    icon: Users,
  },
  {
    title: "Following",
    url: "/dashboard/connections/following",
    icon: Users,
  },

  {
    title: "User Management",
    url: "/dashboard/manage-users",
    icon: UserCog,
  },
  {
    title: "Subscription",
    url: "/dashboard/subscription",
    icon: CreditCard,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: Receipt,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar className="mt-[65px] ">
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl mb-3">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-slate-100 cursor-pointer "
                    isActive={item.isActive}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span className="">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
