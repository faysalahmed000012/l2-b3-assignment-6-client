"use client";
import { Recipe } from "@/app/page";
import frenchFry from "@/assets/images/french-fry.jpg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import TimeAgo from "../../TimeAgo";

export default function PendingPostCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="md:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src="https://avatars.githubusercontent.com/u/124599?v=4"
              />
              <AvatarFallback>{recipe.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/recipe/5`}>
                <CardTitle>{recipe.title}</CardTitle>
              </Link>
              <p className="text-sm text-gray-500">by {recipe.author}</p>
            </div>
          </div>
          <div className="ms-12 md:ms-0">
            <TimeAgo time={recipe.createdAt} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={frenchFry}
          alt={recipe.title}
          width={400}
          height={300}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-700 mb-4">{recipe.description}</p>
        <div className="flex justify-between items-center"></div>
      </CardContent>
      <CardFooter className="flex  items-center justify-between ">
        <Button className="bg-green-500">Approve</Button>
        <Button className="bg-red-500">Reject</Button>
      </CardFooter>
    </Card>
  );
}
