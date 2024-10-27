"use client";
import { IUserDetails } from "@/components/custom/dashboard/EditProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/userProvider";
import { useUserUpdate } from "@/hooks/auth.hooks";
import { getUserDetail } from "@/services/AuthServices";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUserDetails | null>(null);
  const { user } = useUser();
  const [previewImage, setPreviewImage] = useState("");
  const { mutate: handleUserUpdate, isPending, isSuccess } = useUserUpdate();

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      bio: currentUser?.bio || "",
      location: currentUser?.location || "",
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
        console.log(error);
      }
    };
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [user, reset]);

  const watchImage = watch("image");

  const onSubmit = (data) => {
    const formData = new FormData();
    const userData = {
      name: data.name,
      email: data.email,
      bio: data.bio,
      location: data.location,
    };
    formData.append("data", JSON.stringify(userData));
    formData.append("image", data.image[0]);
    handleUserUpdate(formData);
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
    <div className="w-full   mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Profile Info:
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 sm:p-10 border border-gray-200 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-start gap-10">
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <Image
                src={previewImage}
                width={160}
                height={160}
                alt="Profile"
                className="rounded-full mx-auto sm:mx-0 object-cover w-[160px] h-[160px]"
              />

              <div className="mt-4">
                <Input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="w-full sm:w-2/3">
              <Label htmlFor="name" className="text-gray-600 block mb-2">
                Name:
              </Label>

              <Input
                id="name"
                {...register("name")}
                className="text-xl sm:text-2xl"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-10">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <Label htmlFor="email" className="text-gray-600 block mb-2">
                Email:
              </Label>

              <Input
                id="email"
                type="email"
                {...register("email")}
                className="text-lg sm:text-xl"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Label htmlFor="bio" className="text-gray-600 block mb-2">
                Bio:
              </Label>

              <Textarea
                id="bio"
                {...register("bio")}
                className="text-base sm:text-lg h-32"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-10">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <Label htmlFor="location" className="text-gray-600 block mb-2">
                Location:
              </Label>

              <Input
                id="location"
                type="text"
                {...register("location")}
                className="text-lg sm:text-xl"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
