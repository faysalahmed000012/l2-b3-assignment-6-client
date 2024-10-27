import AllLikes from "./cards/AllLikes";
import TotalAdmins from "./cards/TotalAdmins";
import TotalPosts from "./cards/TotalPosts";
import TotalUserPosts from "./cards/TotalUserPosts";
import TotalUsers from "./cards/TotalUsers";

const AdminStats = () => {
  return (
    <div className="max-w-7xl mx-auto grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-10">
      <TotalAdmins />
      <TotalUsers />
      <TotalPosts />
      <AllLikes />
      <TotalUserPosts />
    </div>
  );
};

export default AdminStats;
