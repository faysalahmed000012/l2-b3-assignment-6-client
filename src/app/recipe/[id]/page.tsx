import Comments from "@/components/custom/Comments";
import TimeAgo from "@/components/custom/TimeAgo";
import Vote from "@/components/custom/Vote";
import { getPostById } from "@/services/PostServices";
import { Clock } from "lucide-react";
import Image from "next/image";

const RecipeDetail = async ({ params }: { params: { id: string } }) => {
  const post = await getPostById(params.id);
  function createMarkup(c) {
    return { __html: c };
  }
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
            <div className="flex items-center space-x-2">
              <Vote post={post} />
            </div>
          </div>
          <div className="flex items-center justify-start gap-3">
            {post?.tags &&
              post.tags.map((tag: string) => (
                <p key={tag} className="text-lg mt-4">
                  #{tag}
                </p>
              ))}
          </div>
          <p className="text-lg font-bold mt-4">Ingredients :</p>
          {post?.ingredients &&
            post?.ingredients.map((ingredient) => (
              <p className="mt-2" key={ingredient.name}>
                {ingredient.name} - {ingredient.quantity}
              </p>
            ))}
          <div
            dangerouslySetInnerHTML={createMarkup(post?.description)}
            className="text-gray-700 text-lg mt-3 md:w-[60%]"
          ></div>
        </div>
      </div>
      <div id="comments">
        <Comments postId={post?._id} comments={post?.comments} />
      </div>
    </div>
  );
};

export default RecipeDetail;
