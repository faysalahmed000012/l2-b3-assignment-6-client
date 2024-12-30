"use client";

import ChangePassword from "@/components/custom/dashboard/ChangePassword";
import { IUserDetails } from "@/components/custom/dashboard/EditProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/userProvider";
import { useUserUpdate } from "@/hooks/auth.hooks";
import { cn } from "@/lib/utils";
import { getUserDetail } from "@/services/AuthServices";
import { Camera, Loader2, Mail, MapPin, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfilePage() {
  const [currentUser, setCurrentUser] = useState<IUserDetails | null>(null);
  const { user } = useUser();
  const [previewImage, setPreviewImage] = useState("");
  const { mutate: handleUserUpdate, isPending } = useUserUpdate();
  const [isDragging, setIsDragging] = useState(false);

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      location: "",
      image: null as File | null,
    },
  });

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(user?.email as string);
        if (!ignore) {
          setCurrentUser(response as IUserDetails | null);
          reset({
            name: response.name,
            email: response.email,
            bio: response.bio,
            location: response.location,
          });
          setPreviewImage(response?.profilePicture as string);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [user, reset]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    const userData = {
      name: data.name,
      email: data.email,
      bio: data.bio,
      location: data.location,
    };
    formData.append("data", JSON.stringify(userData));
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }
    handleUserUpdate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <Card className="overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="relative h-32 sm:h-48 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2">
            <div
              className={cn(
                "relative group cursor-pointer",
                isDragging && "opacity-70"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-background overflow-hidden bg-muted">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <Label
                htmlFor="image"
                className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
              >
                <div className="flex flex-col items-center">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-xs">Change Photo</span>
                </div>
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <CardContent className="mt-20 sm:mt-24">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("name")}
                    placeholder="Enter your name"
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <Label className="text-xs text-muted-foreground">
                  This is your public display name
                </Label>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("email")}
                    type="email"
                    disabled
                    placeholder="Enter your email"
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <Label className="text-xs text-muted-foreground">
                  Your email address
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Textarea
                {...register("bio")}
                placeholder="Write a short bio about yourself..."
                className="min-h-[120px] resize-none"
              />
              <Label className="text-xs text-muted-foreground">
                Brief description for your profile
              </Label>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register("location")}
                  placeholder="Your location"
                  className="pl-10"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Label className="text-xs text-muted-foreground">
                Where you are based
              </Label>
            </div>

            <div className="pt-4 flex gap-3">
              <ChangePassword email={user?.email as string} />
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving changes...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
