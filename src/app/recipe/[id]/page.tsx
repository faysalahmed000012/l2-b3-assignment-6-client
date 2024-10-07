import Comments from "@/components/custom/Comments";
import TimeAgo from "@/components/custom/TimeAgo";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/services/PostServices";
import { Clock, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";

const RecipeDetail = async ({ params }: { params: { id: string } }) => {
  const post = await getPostById(params.id);
  return (
    <div className="px-[20px] md:px-[80px] mt-[140px]">
      <div className="md:flex justify-center ">
        <div className="flex-1 flex items-center justify-center">
          <Image
            className="rounded-xl"
            src={post?.image}
            height={450}
            width={700}
            alt="french fry"
          />
        </div>
        <div className="pt-[24px] md:pt-[50px] flex-1">
          <div>
            <h1 className="text-3xl md:text-4xl">{post?.title}</h1>
            <div className="mt-2 md:flex item-center justify-start gap-6">
              <p className="text-sm text-gray-500">by {post?.user?.name}</p>
              <div className="mt-3 md:mt-0 flex items-start justify-between gap-6">
                <TimeAgo time={new Date(post?.createdAt)} />
                <div className=" flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post?.cookingTime} minutes to make</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex-col justify-between items-center">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  // onClick={() => onRate(recipe.id, star)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      star <= 4.4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </Button>
              ))}
              <span className="text-sm ml-2">{4.4}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                //   onClick={() => onVote(recipe.id, "up")}
              >
                <ThumbsUp className="mr-1 h-4 w-4" />
                <span className="text-xs">
                  {post?.upVotes + post?.downVotes || 0}
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                //   onClick={() => onVote(recipe.id, "down")}
              >
                <ThumbsDown className="mr-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-lg font-bold mt-4">Ingredients :</p>
          {post?.ingredients &&
            post?.ingredients.map((ingredient) => (
              <p className="mt-2" key={ingredient.name}>
                {ingredient.name} - {ingredient.quantity}
              </p>
            ))}
          <p className="text-gray-700 text-lg mt-3 md:w-[60%]">
            {post?.description}
          </p>
        </div>
      </div>
      <Comments comments={post?.comments} />
    </div>
  );
};

export default RecipeDetail;
