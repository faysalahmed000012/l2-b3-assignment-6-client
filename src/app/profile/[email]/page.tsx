import { AboutSection } from "@/components/custom/profile/AboutSection";
import { UserInfo } from "@/components/custom/profile/UserInfo";
import RecipeCard from "@/components/custom/RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserDetail } from "@/services/AuthServices";
import { getPostByUser, userUpvotedPosts } from "@/services/PostServices";

export default async function ProfilePage({
  params,
}: {
  params: { email: string };
}) {
  // const [user] = useState(mockUserProfile);
  console.log(params.email);

  const user = await getUserDetail(params.email);

  let postsByUser;
  let userUpVotedPosts;
  if (user) {
    postsByUser = await getPostByUser(user?._id as string);
    userUpVotedPosts = await userUpvotedPosts(user?._id as string);
  }

  return (
    <div className="mt-[70px] container mx-auto p-4 max-w-3xl">
      <UserInfo user={user} />
      <AboutSection bio={user?.bio || "sala tui ke ?"} />
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Liked</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="space-y-4">
            {postsByUser.length > 0 &&
              postsByUser?.map((post) => (
                <RecipeCard key={post._id} post={post} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="media">
          <div className="space-y-4">
            {userUpVotedPosts.length > 0 &&
              userUpVotedPosts.map((post) => (
                <RecipeCard key={post._id} post={post} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
