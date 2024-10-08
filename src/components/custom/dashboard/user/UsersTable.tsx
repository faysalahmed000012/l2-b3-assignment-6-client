"use client";
export const fetchCache = "force-not-store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { blockUser, deleteUser, makeAdmin } from "@/services/AuthServices";
import Image from "next/image";

const UsersTable = ({ userData }) => {
  const handleDelete = async (userId: string) => {
    if (confirm("Are you Sure You Want To Delete This User ?") == true) {
      const res = await deleteUser(userId);
    } else {
      return;
    }
  };

  const handleAdmin = async (email: string, role: "admin" | "user") => {
    let res;
    if (role == "admin") {
      res = await makeAdmin(email, "admin");
    } else if (role == "user") {
      res = await makeAdmin(email, "user");
    }
  };
  const handleBlock = async (email: string, role: boolean) => {
    if (role == false) {
      await blockUser(email, false);
    } else if (role == true) {
      await blockUser(email, true);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData?.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">
              <Image
                src={user?.profilePicture}
                width={40}
                height={40}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-center gap-3">
                {user?.role == "admin" ? (
                  <>
                    <Button
                      onClick={() => handleAdmin(user.email, "user")}
                      disabled={user.isBlocked}
                      className="bg-orange-500 hover:bg-orange-700"
                    >
                      Remove From Admin
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleAdmin(user.email, "admin")}
                      disabled={user.isBlocked}
                      className="bg-orange-500 hover:bg-orange-700"
                    >
                      Make Admin
                    </Button>
                  </>
                )}
                {user.isBlocked ? (
                  <>
                    <Button onClick={() => handleBlock(user.email, false)}>
                      Unblock User
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      disabled={user?.isBlocked || user.role == "admin"}
                      onClick={() => handleBlock(user.email, true)}
                    >
                      Block User
                    </Button>
                  </>
                )}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete user
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
