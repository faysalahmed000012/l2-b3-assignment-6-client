"use client";
import TimeAgo from "@/components/custom/post/TimeAgo";
import ShareModal from "@/components/custom/share/ShareModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/userProvider";
import { useComment } from "@/hooks/post.hooks";
import { getUserDetail } from "@/services/AuthServices";
import { addRating, downVote, upVote } from "@/services/PostServices";
import { IPost } from "@/types";
import {
  ChefHat,
  Clock,
  Cookie,
  Heart,
  Printer,
  Send,
  Star,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RecipeDetailClient = ({ post }: { post: IPost }) => {
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { mutate: AddComment } = useComment();
  function createMarkup(c) {
    return { __html: c };
  }
  const userDefaultRating = (
    post.ratings &&
    user &&
    post.ratings.find((rating) => rating.user === user?._id)
  )?.rating;

  const [userRating, setUserRating] = useState(0);
  // const pathname = usePathname();
  // console.log("pathname", pathname);
  useEffect(() => {
    if (userDefaultRating) setUserRating(userDefaultRating);
    const isLiked = post.likes?.find((like) => like.user === user?._id);
    if (post.likes && isLiked) {
      setIsLiked(true);
    }
  }, [userDefaultRating, post.likes, user?._id]);

  const handleRating = (rating: number) => {
    if (!user) {
      toast.error("Please Login to Rete");
      return router.push("/auth/login");
    }
    setUserRating(rating);
    addRating(post._id as string, user?._id as string, rating);
    toast.success("Your Rating Has Been Submitted");
  };

  const handleLike = () => {
    if (!user) {
      toast.error("Please Login to Like");
      return router.push("/auth/login");
    }
    if (isLiked) {
      downVote(post._id as string, user?._id as string);
    } else {
      upVote(post._id as string, user?._id as string);
    }

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please Login to Comment");
      return router.push("/auth/login");
    }
    // Here you would typically send the comment to your backend
    console.log("Submitting comment:", comment);

    const detailedUser = await getUserDetail(user?.email as string);
    if (detailedUser) {
      //console.log(e.target.value);
      AddComment({
        postId: post._id as string,
        userId: detailedUser._id as string,
        userName: detailedUser.name as string,
        userImage: detailedUser.profilePicture,
        mode: "create",
        comment: comment,
      });
    } else {
      alert("Please login to comment");
    }
    setComment("");
  };

  const handleReply = (commentId: string) => {
    if (replyTo) {
      setReplyTo(null);
    } else {
      setReplyTo(commentId);
    }
  };

  const handleSubmitReply = async (e, commentId: string) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please Login to Reply");
      return router.push("/auth/login");
    }

    const detailedUser = await getUserDetail(user?.email as string);
    if (detailedUser) {
      //console.log(e.target.value);
      AddComment({
        postId: post._id as string,
        userId: detailedUser._id as string,
        userName: detailedUser.name as string,
        userImage: detailedUser.profilePicture,
        mode: "create",
        comment: e.target.replyComment.value,
        replyTo: commentId,
      });
    } else {
      alert("Please login to comment");
    }
    setReplyTo(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const averageRating =
    post?.ratings &&
    post.ratings?.reduce((acc, val) => acc + val.rating, 0) /
      post?.ratings?.length;

  const postComments = post.comments?.filter((c) => c.replyTo === "");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={post.author.profilePicture}
                alt={post.author.name}
              />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <div className="text-sm text-gray-500">
                <TimeAgo time={new Date(post.createdAt)} />
              </div>
            </div>
          </div>
          <div className="relative aspect-video mb-6">
            <Image
              height={450}
              width={700}
              src={post.image}
              alt={post.title}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {
              // @ts-ignore
              post?.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-orange-100 text-orange-800"
                >
                  {tag}
                </Badge>
              ))
            }
          </div>
          {/* <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={createMarkup(post?.description)}
          ></div> */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-orange-500 mr-2" />
              <span>{post?.cookingTime}</span>
            </div>
            <div className="flex items-center">
              <Cookie className="h-5 w-5 text-orange-500 mr-2" />
              <span>{post?.difficulty}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
              <span>{averageRating ? averageRating?.toFixed(1) : 0}</span>
            </div>
            <div className="flex items-center">
              <Utensils className="h-5 w-5 text-orange-500 mr-2" />
              <span>{post?.servings} servings</span>
            </div>
          </div>
          <Separator className="my-8" />
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            {post.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - {ingredient.quantity}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          {/* <ol className="list-decimal pl-5 space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol> */}
          <div
            className="text-gray-700 mb-6"
            dangerouslySetInnerHTML={createMarkup(post?.description)}
          ></div>
          <Separator className="my-8" />
          <h2 className="text-2xl font-semibold mb-4">Rate this recipe</h2>
          <div className="flex items-center mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 cursor-pointer ${
                  star <= userRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>
          <h2 id="comments" className="text-2xl font-semibold mb-4">
            Comments
          </h2>
          <div className="space-y-6">
            {postComments &&
              postComments.map((comment) => (
                <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={comment.userImage}
                        alt={comment.userName}
                      />
                      <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{comment.userName}</h3>
                        <span className="text-sm text-gray-500">
                          <TimeAgo time={new Date(comment.createdAt)} />
                        </span>
                      </div>
                      <p className="mt-1 text-gray-700">{comment.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-orange-500"
                        onClick={() => handleReply(comment._id as string)}
                      >
                        Reply
                      </Button>
                      {replyTo && replyTo === comment._id && (
                        <div className="mt-3">
                          <form
                            onSubmit={(e) =>
                              handleSubmitReply(e, comment._id as string)
                            }
                            action=""
                          >
                            <Textarea
                              placeholder="Write a reply..."
                              name="replyComment"
                              className="mb-2"
                            />
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              <Send className="mr-2 h-4 w-4" />
                              Post Reply
                            </Button>
                          </form>
                        </div>
                      )}
                      {post.comments &&
                        post.comments
                          .filter((c) => c.replyTo === comment._id)
                          .map((reply) => (
                            <div
                              key={reply._id}
                              className="mt-4 ml-6 bg-white rounded-lg p-3"
                            >
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={reply.userImage}
                                    alt={reply.userName}
                                  />
                                  <AvatarFallback>
                                    {reply.userName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center justify-between gap-3">
                                    <h4 className="font-semibold">
                                      {reply.userName}
                                    </h4>
                                    <span className="text-xs text-gray-500">
                                      <TimeAgo
                                        time={new Date(reply.createdAt)}
                                      />
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-700">
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-6">
            <Textarea
              placeholder={replyTo ? "Write a reply..." : "Leave a comment..."}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2"
            />
            <Button
              onClick={(e) => handleCommentSubmit(e)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Send className="mr-2 h-4 w-4" />
              Post Comment
            </Button>
          </div>
        </div>
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Recipe Actions</h3>
              <div className="space-y-4">
                <Button
                  onClick={handleLike}
                  className={`w-full ${isLiked && "bg-orange-500"}`}
                >
                  {likeCount}
                  <Heart className={`mr-2 h-4 w-4  `} />{" "}
                  {isLiked ? "Liked" : "Like"}
                </Button>
                {/* <Button
                  onClick={() => toast("Coming Soon")}
                  variant="outline"
                  className="w-full"
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" /> Save Recipe
                </Button> */}
                <ShareModal postId={post?._id} />
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="w-full"
                >
                  <Printer className="mr-2 h-4 w-4" /> Print Recipe
                </Button>
              </div>
              <Separator className="my-6" />
              {/* <h3 className="text-xl font-semibold mb-4">Chef's Notes</h3>
              <p className="text-gray-600 mb-4">
                This Galactic Fortress Cake is not for the faint of heart. Its
                rich, dark chocolate layers represent the power of the dark
                side, while the intricate design mimics the imposing structure
                of Darth Vader's fortress. For an extra galactic touch, consider
                adding edible silver stars to the frosting.
              </p> */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  <ChefHat className="inline-block mr-1 h-4 w-4" />
                  {post?.author.name}
                </span>
                <span>
                  {" "}
                  <TimeAgo time={new Date(post.createdAt)} />{" "}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailClient;
