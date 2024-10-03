import { AboutSection } from "@/components/custom/profile/AboutSection";
import { UserInfo } from "@/components/custom/profile/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserDetail } from "@/services/AuthServices";

const mockUserProfile = {
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

export default async function ProfilePage({
  params,
}: {
  params: { email: string };
}) {
  // const [user] = useState(mockUserProfile);
  console.log(params.email);

  const user = await getUserDetail(params.email);
  console.log(user);
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
          {/* <div className="space-y-4">
            {mockRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div> */}
        </TabsContent>
        <TabsContent value="media">
          {/* {mockRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))} */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
