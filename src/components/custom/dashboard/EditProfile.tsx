"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";

interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  image: FileList;
}

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    "https://github.com/shadcn.png"
  );

  const { register, handleSubmit, watch } = useForm<ProfileFormData>({
    defaultValues: {
      name: "Faysal Ahmed",
      email: "faysal.ahmed@gmail.com",
      bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur dicta necessitatibus consequuntur excepturi in pariatur illum provident autem laboriosam culpa.",
    },
  });

  const watchImage = watch("image");

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
    setIsEditing(false);
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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Profile Info:
        </h2>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full sm:w-auto"
        >
          <FaRegEdit className="mr-2" /> {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 sm:p-10 border border-gray-200 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-start">
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <Image
                src={previewImage}
                width={160}
                height={160}
                alt="Profile"
                className="rounded-full mx-auto sm:mx-0"
              />
              {isEditing && (
                <div className="mt-4">
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
            <div className="w-full sm:w-2/3">
              <Label htmlFor="name" className="text-gray-600 block mb-2">
                Name:
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  {...register("name")}
                  className="text-xl sm:text-2xl"
                />
              ) : (
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold">
                  {watch("name")}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <Label htmlFor="email" className="text-gray-600 block mb-2">
                Email:
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="text-lg sm:text-xl"
                />
              ) : (
                <p className="text-lg sm:text-xl">{watch("email")}</p>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <Label htmlFor="bio" className="text-gray-600 block mb-2">
                Bio:
              </Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  {...register("bio")}
                  className="text-base sm:text-lg h-32"
                />
              ) : (
                <p className="text-base sm:text-lg">{watch("bio")}</p>
              )}
            </div>
          </div>
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                Submit
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
