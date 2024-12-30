export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import UsersTable from "@/components/custom/dashboard/user/UsersTable";
import { getAllUsers } from "@/services/AuthServices";

const page = async () => {
  const users = await getAllUsers();

  return (
    <div className="flex flex-col gap-5  w-full">
      <h1 className="text-3xl">All Users:</h1>

      <UsersTable userData={users} />
    </div>
  );
};

export default page;
