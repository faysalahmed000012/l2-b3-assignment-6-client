import PendingPostCard from "@/components/custom/dashboard/admin/PendingPostCard";
import { getAllPost } from "@/services/PostServices";

const page = async () => {
  const posts = await getAllPost();

  return (
    <div>
      <h1 className="text-3xl">Pending Posts : </h1>
      <div className="mt-6 grid lg:grid-cols-2 grid-cols-1">
        {posts.map((post) => {
          return <PendingPostCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default page;
