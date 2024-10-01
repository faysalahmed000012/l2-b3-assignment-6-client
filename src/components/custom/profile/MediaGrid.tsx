import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function MediaGrid({ posts }: { posts: any }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {posts
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
  );
}
