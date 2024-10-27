import AllLikes from "./cards/AllLikes";
import TotalUserPosts from "./cards/TotalUserPosts";

const UserStats = () => {
  return (
    <div className="max-w-7xl mx-auto grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-10">
      <AllLikes />
      <TotalUserPosts />
    </div>
  );
};

export default UserStats;
