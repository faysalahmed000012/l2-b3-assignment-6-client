// @ts-nocheck
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/userProvider";
import { useCreatePost, useUpdatePost } from "@/hooks/post.hooks";
import { getUserDetail } from "@/services/AuthServices";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import Tiptap from "./Tiptap";

interface IFormData {
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  cookingTime: number;
}

export function CreateAndEditPost({ isEditmode = false, editData = null }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    editData?.image || null
  );
  const [isPremium, setIsPremium] = useState(editData?.isPremium || false);
  const { mutate: CreatePost } = useCreatePost();
  const { mutate: UpdatePost } = useUpdatePost();
  const { user } = useUser();
  const [detailedUser, setDetailedUser] = useState({});
  const [tags, setTags] = useState<string[]>(editData?.tags || []);

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      try {
        const response = await getUserDetail(user?.email as string);
        if (!ignore) {
          setDetailedUser(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchUser();
    }
    return () => {
      ignore = true;
    };
  }, [user]);

  const form = useForm<IFormData>({
    defaultValues: {
      title: editData?.title || "",
      description: editData?.description || "",
      ingredients: editData?.ingredients || [],
      cookingTime: editData?.cookingTime || 0,
      servings: editData?.servings || 0,
      difficulty: editData?.difficulty,
    },
    mode: "onChange",
  });

  const { control, handleSubmit, register } = form;
  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleTagClick = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag].slice(0, 5)
    );
  };

  const availableTags = [
    "breakfast",
    "lunch",
    "dinner",
    "dessert",
    "snack",
    "vegan",
    "vegetarian",
    "gluten-free",
    "low-carb",
  ];

  const onSubmit: SubmitHandler<IFormData> = (values) => {
    if (
      !values.title ||
      !values.description ||
      !imageFile ||
      !values.ingredients ||
      !values.cookingTime ||
      !values.servings ||
      !values.difficulty
    ) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    const postValues = {
      title: values.title,
      description: values.description,
      author: (detailedUser as any)?._id,
      isPremium: isPremium,
      ingredients: values.ingredients,
      cookingTime: values.cookingTime,
      servings: values.servings,
      difficulty: values.difficulty,
      tags: tags,
    };
    formData.append("data", JSON.stringify(postValues));
    formData.append("image", imageFile);
    if (isEditmode === true) {
      UpdatePost({ data: formData, postId: editData?._id });
    } else {
      CreatePost(formData);
    }
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
        {isEditmode ? (
          <Button className="bg-orange-500  hover:bg-orange-600">
            <PlusCircle className="mr-2" size={18} />
            Edit Recipe
          </Button>
        ) : (
          <div className="cursor-pointer bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-xl p-5 flex items-center justify-between gap-3 md:w-[80%] mx-auto">
            <Image
              src="https://github.com/shadcn.png"
              className="rounded-full"
              alt="user"
              width="40"
              height="40"
            />
            <Input
              className="border py-6 cursor-pointer border-orange-500 rounded-full"
              placeholder="New Recipe"
            />
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-orange-500 text-xl">
              {isEditmode ? "Update" : "Create"} Post
            </h1>
          </DialogTitle>
          <DialogDescription>
            Share your recipe with the world.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={control}
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
                control={control}
                name="ingredients"
                render={() => (
                  <FormItem>
                    <FormLabel>Ingredients</FormLabel>
                    <FormControl>
                      <div>
                        {ingredientFields.map((field, index) => (
                          <div key={field.id} className="flex space-x-2 mt-1">
                            <Input
                              {...register(`ingredients.${index}.name`, {
                                required: "Ingredient name is required",
                              })}
                              placeholder="Ingredient name"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <Input
                              {...register(`ingredients.${index}.quantity`, {
                                required: "Quantity is required",
                              })}
                              placeholder="Quantity"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeIngredient(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          className="mt-2"
                          onClick={() =>
                            appendIngredient({ name: "", quantity: "" })
                          }
                        >
                          Add Ingredient
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-start gap-6">
                <FormField
                  control={control}
                  name="cookingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cooking Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ex. 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="servings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serving (number of people)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ex. 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Difficulty</SelectLabel>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`px-2 py-1 mx-2 my-2 rounded ${
                      tags.includes(tag) ? "bg-orange-500 " : ""
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <div onClick={(e) => e.preventDefault()}>
                        <Tiptap
                          defaultValue={editData?.description}
                          onChange={field.onChange}
                        />
                      </div>
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
