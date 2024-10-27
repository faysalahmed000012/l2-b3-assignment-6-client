"use client";

import AdminStats from "@/components/custom/dashboard/AdminStats";
import UserStats from "@/components/custom/dashboard/UserStats";
import { useUser } from "@/context/userProvider";

const DashboardPage = () => {
  const { user } = useUser();
  return (
    <div className="ms-10 mt-[70px]">
      <div className="mt-10">
        {user?.role == "admin" ? (
          <div>
            <AdminStats />
          </div>
        ) : (
          <div>
            <UserStats />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
