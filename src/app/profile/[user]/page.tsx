"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Post {
  id: number;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
}

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  followers: number;
  following: number;
  role: string;
  profileImage: string;
  location: string;
  posts: Post[];
}

const mockUserProfile: UserProfile = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  bio: "Passionate food lover and amateur chef. Sharing my culinary adventures and bringing flavors to life!",
  followers: 1234,
  following: 567,
  role: "Food Blogger & Recipe Developer",
  profileImage: "/placeholder.svg?height=200&width=200",
  location: "New York, NY",
  posts: [
    {
      id: 1,
      content:
        "Just made an amazing spaghetti carbonara! The key is to use high-quality guanciale and freshly grated Pecorino Romano. What's your favorite pasta dish?",
      likes: 45,
      comments: 12,
      shares: 5,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      content:
        "Experimenting with vegan desserts today. This chocolate avocado mousse is surprisingly creamy and delicious! Who says healthy can't be indulgent?",
      likes: 32,
      comments: 8,
      shares: 3,
    },
    {
      id: 3,
      content:
        "My secret ingredient for the perfect steak: patience. Let it come to room temperature, season generously, and don't forget to let it rest after cooking!",
      likes: 67,
      comments: 15,
      shares: 7,
      image: "/placeholder.svg?height=300&width=400",
    },
  ],
};

function UserInfo({ user }: { user: UserProfile }) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center">{user.name}</h2>
          <p className="text-gray-500 text-center mb-2">{user.role}</p>
          <p className="text-sm text-gray-500 flex items-center justify-center mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            {user.location}
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <div className="text-center">
              <p className="font-bold">{user.followers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user.following.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
          <Button className="w-full max-w-xs">Follow</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="pt-6">
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt="Post image"
              width={400}
              height={300}
              layout="responsive"
            />
          </div>
        )}
        <div className="flex justify-between text-gray-500">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="w-4 h-4 mr-2" />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            {post.shares}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  const [user] = useState(mockUserProfile);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <UserInfo user={user} />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{user.bio}</p>
        </CardContent>
      </Card>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="space-y-4">
            {user.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="media">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {user.posts
                  .filter((post) => post.image)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <Image
                        src={post.image!}
                        alt="Post image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
