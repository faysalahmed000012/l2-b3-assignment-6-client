"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
  ChevronsUpDown,
  Clock,
  Flame,
  Info,
  Leaf,
  LogIn,
  Mail,
  Menu,
  Search,
  User2Icon,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cookingTime, setCookingTime] = useState([30]);
  const [showVegan, setShowVegan] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      <div className="bg-orange-100 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2 text-orange-800">
          Find Your Next Meal
        </h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search recipes..."
            className="pl-8 bg-white border-orange-200 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>

      <Tabs defaultValue="filter" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="filter">Filter</TabsTrigger>
          <TabsTrigger value="sort">Sort</TabsTrigger>
        </TabsList>
        <TabsContent value="filter" className="space-y-4 mt-4">
          <div>
            <Label
              htmlFor="category"
              className="flex items-center gap-2 text-orange-700"
            >
              <Utensils className="h-4 w-4 text-orange-500" />
              Category
            </Label>
            <Select>
              <SelectTrigger id="category" className="w-full mt-1">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="dessert">Dessert</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="difficulty"
              className="flex items-center gap-2 text-orange-700"
            >
              <Flame className="h-4 w-4 text-orange-500" />
              Difficulty
            </Label>
            <Select>
              <SelectTrigger id="difficulty" className="w-full mt-1">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="time"
              className="flex items-center gap-2 text-orange-700 mb-2"
            >
              <Clock className="h-4 w-4 text-orange-500" />
              Cooking Time (max {cookingTime} mins)
            </Label>
            <Slider
              id="time"
              min={5}
              max={120}
              step={5}
              value={cookingTime}
              onValueChange={setCookingTime}
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="vegan-mode"
              checked={showVegan}
              onCheckedChange={setShowVegan}
            />
            <Label
              htmlFor="vegan-mode"
              className="flex items-center gap-2 text-orange-700"
            >
              <Leaf className="h-4 w-4 text-orange-500" />
              Show only vegan recipes
            </Label>
          </div>
        </TabsContent>
        <TabsContent value="sort" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <ChevronsUpDown className="mr-2 h-4 w-4" />
              Most Popular
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ChevronsUpDown className="mr-2 h-4 w-4" />
              Newest First
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ChevronsUpDown className="mr-2 h-4 w-4" />
              Cooking Time
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ChevronsUpDown className="mr-2 h-4 w-4" />
              Difficulty Level
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2 pt-4 border-t border-orange-200">
        <Link href="/about">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-orange-100 hover:text-orange-700"
          >
            <Info className="mr-2 h-4 w-4" />
            About
          </Button>
        </Link>
        <Link href="/contact">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-orange-100 hover:text-orange-700"
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-orange-100 hover:text-orange-700"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
        <Link href={`/profile/faysal000012@gmail.com`}>
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-orange-100 hover:text-orange-700"
          >
            <User2Icon className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-orange-100 hover:text-orange-700"
          >
            <DashboardIcon className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className={`hidden lg:block ${className}`}>{sidebarContent}</div>
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed top-14 -left-1 z-50 rounded-r-full opacity-80 bg-white shadow-md"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
