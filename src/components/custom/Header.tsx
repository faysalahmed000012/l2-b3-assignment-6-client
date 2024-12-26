"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userProvider";
import { logout } from "@/services/AuthServices";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, setIsLoading: userLoading } = useUser();
  const router = useRouter();

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },

    user
      ? { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }
      : { name: "Login", href: "/auth/login" },
  ];

  const handleLogout = () => {
    logout();
    userLoading(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            Crunch Social
          </Link>

          <div className="flex items-center space-x-4">
            {/* {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                {item.icon && <item.icon className="mr-1" size={18} />}
                {item.name}
              </Link>
            ))} */}
            {user ? (
              <Link
                href={`/profile/${user.email}`}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                Profile
              </Link>
            ) : (
              <Button
                onClick={() => router.push("/auth/login")}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Login
              </Button>
            )}
            {user && (
              <Button
                onClick={() => handleLogout()}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors bg-transparent hover:bg-gray-200"
              >
                Log out
              </Button>
            )}
          </div>
          {/* <div>
            <CreateAndEditPost />
          </div> */}
        </div>
      </div>
    </header>
  );
}
