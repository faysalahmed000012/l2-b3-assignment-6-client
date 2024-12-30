import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";

export function PostCard({ post }: { post: any }) {
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
          {/* <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            {post.shares}
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
