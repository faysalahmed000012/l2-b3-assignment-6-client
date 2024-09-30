// components/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, PlusCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/feed" className="text-2xl font-bold text-orange-600">
            Crunch Social
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                {item.icon && <item.icon className="mr-1" size={18} />}
                {item.name}
              </Link>
            ))}
            <Button variant="ghost">
              <PlusCircle className="mr-2" size={18} />
              New Recipe
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center py-2 text-gray-600 hover:text-orange-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="mr-2" size={18} />}
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setIsMenuOpen(false)}
            >
              <PlusCircle className="mr-2" size={18} />
              New Recipe
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
