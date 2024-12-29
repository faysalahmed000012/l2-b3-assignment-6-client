import AllLikes from "./cards/AllLikes";
import TotalPosts from "./cards/TotalPosts";
import TotalUserPosts from "./cards/TotalUserPosts";
import TotalPostsStats from "./statistics/TotalPosts";
import UserAdminRatio from "./statistics/UserAdminRatio";

const AdminStats = () => {
  return (
    <>
      <TotalPostsStats />
      <div className="container max-w-7xl lg:flex items-center justify-start gap-20">
        <UserAdminRatio />
        {/* <TotalAdmins /> */}
        {/* <TotalUsers /> */}
        <div className="w-full mt-3 lg:mt-0 lg:w-[30%] flex flex-col justify-center gap-3">
          <TotalPosts />
          <AllLikes />
          <TotalUserPosts />
        </div>
      </div>
    </>
  );
};

export default AdminStats;
