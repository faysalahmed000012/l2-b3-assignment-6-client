"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import Tiptap from "./Tiptap";

interface IFormData {
  title: string;
  description: string;
}

export function CreateAndEditPost() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IFormData> = (values: any) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(values));
    formData.append("image", imageFile as unknown as string);
    console.log(formData.get("data"));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <PlusCircle className="mr-2" size={18} />
          New Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-orange-500 text-xl">Create Post</h1>
          </DialogTitle>
          <DialogDescription>
            Share your recipe with the world.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="The title of your post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Tiptap onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel
                  htmlFor="image"
                  className="md:w-[600px] md:h-[300px] border border-gray-600 border-dashed rounded-xl p-3 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out"
                >
                  {preview ? (
                    <Image
                      width={600}
                      height={300}
                      src={preview}
                      alt="Preview"
                      className="max-w-full h-full overflow-hidden"
                    />
                  ) : (
                    <p className="text-xl">Upload Image</p>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="premium" className="text-right">
                  Premium
                </Label>
                <Switch
                  id="premium"
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                />
              </div>
              <DialogClose asChild>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
