import { Dialog, DialogTitle } from "@/components/ui/dialog";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/userProvider";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  CreditCard,
  FileText,
  LayoutDashboard,
  Receipt,
  UserCircle,
  UserCog,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Edit Profile",
    url: "/dashboard/editProfile",
    icon: UserCircle,
  },
  {
    title: "Posts",
    url: "/dashboard/posts",
    icon: FileText,
  },
  {
    title: "Followers",
    url: "/dashboard/followers",
    icon: Users,
  },
  {
    title: "Following",
    url: "/dashboard/following",
    icon: Users,
  },

  {
    title: "Manage Users",
    url: "/dashboard/users",
    icon: UserCog,
  },
  {
    title: "Subscription",
    url: "/dashboard/subscribe",
    icon: CreditCard,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: Receipt,
  },
];

const userNavItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Edit Profile",
    url: "/dashboard/editProfile",
    icon: UserCircle,
  },
  {
    title: "My Posts",
    url: "/dashboard/posts",
    icon: FileText,
  },
  {
    title: "Followers",
    url: "/dashboard/followers",
    icon: Users,
  },
  {
    title: "Following",
    url: "/dashboard/following",
    icon: Users,
  },

  {
    title: "Subscription",
    url: "/dashboard/subscribe",
    icon: CreditCard,
  },
];

const DashboardNav = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <SidebarMenu>
      <VisuallyHidden.VisuallyHidden>
        <Dialog>
          {/* <DialogContent> */}
          <DialogTitle>Navigation Menu</DialogTitle>
          {/* </DialogContent> */}
        </Dialog>
      </VisuallyHidden.VisuallyHidden>
      {user && user.role === "admin"
        ? navItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link
                  href={item.url}
                  className={cn(
                    "flex items-center space-x-3 text-base",
                    pathname === item.url
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.subItems && (
                <SidebarMenuSub>
                  {item.subItems.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.url}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                      >
                        <Link
                          href={subItem.url}
                          className={cn(
                            "text-sm",
                            pathname === subItem.url
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))
        : userNavItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link
                  href={item.url}
                  className={cn(
                    "flex items-center space-x-3 text-base",
                    pathname === item.url
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.subItems && (
                <SidebarMenuSub>
                  {item.subItems.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.url}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                      >
                        <Link
                          href={subItem.url}
                          className={cn(
                            "text-sm",
                            pathname === subItem.url
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
    </SidebarMenu>
  );
};

export default DashboardNav;
