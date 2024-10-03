"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { blockUser, makeAdmin } from "@/services/AuthServices";
import Image from "next/image";

const UsersTable = (userData: any) => {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData?.userData?.map((user) => (
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
                <Button
                  onClick={async () => await makeAdmin(user.email)}
                  disabled={user.role == "admin" || user.isBlocked}
                  className="bg-orange-500 hover:bg-orange-700"
                >
                  {user.role == "admin" ? "Admin" : "Make Admin"}
                </Button>
                <Button
                  disabled={user?.isBlocked}
                  onClick={async () => await blockUser(user.email)}
                >
                  {user.isBlocked ? "Blocked" : "Block"}
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
