"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { blockUser, deleteUser, makeAdmin } from "@/services/AuthServices";
import {
  MoreHorizontal,
  Shield,
  ShieldOff,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isBlocked: boolean;
  profilePicture: string;
}

interface UsersTableProps {
  userData: User[];
}

export const UsersTable = ({ userData }: UsersTableProps) => {
  // const { toast } = useToast();
  const [users, setUsers] = useState(userData);

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
      toast("User deleted", {
        description: "The user has been successfully deleted.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete user. Please try again.",
      });
    }
  };

  const handleAdmin = async (email: string, newRole: "admin" | "user") => {
    try {
      await makeAdmin(email, newRole);
      setUsers(
        users.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );
      toast("Role updated", {
        description: `User role has been updated to ${newRole}.`,
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to update user role. Please try again.",
      });
    }
  };

  const handleBlock = async (email: string, shouldBlock: boolean) => {
    try {
      await blockUser(email, shouldBlock);
      setUsers(
        users.map((user) =>
          user.email === email ? { ...user, isBlocked: shouldBlock } : user
        )
      );
      toast(`${shouldBlock ? "User blocked" : "User unblocked"}`, {
        description: `The user has been ${
          shouldBlock ? "blocked" : "unblocked"
        }.`,
      });
    } catch (error) {
      toast.error("Error", {
        description: `Failed to ${
          shouldBlock ? "block" : "unblock"
        } user. Please try again.`,
      });
    }
  };

  return (
    <div className="w-full lg:w-[95%] mx-auto overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden sm:table-cell">Role</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.email}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant={user.isBlocked ? "destructive" : "outline"}>
                  {user.isBlocked ? "Blocked" : "Active"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        handleAdmin(
                          user.email,
                          user.role === "admin" ? "user" : "admin"
                        )
                      }
                      disabled={user.isBlocked}
                    >
                      {user.role === "admin" ? (
                        <>
                          <ShieldOff className="mr-2 h-4 w-4" />
                          <span className="cursor-pointer">Remove Admin</span>
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          <span className="cursor-pointer">Make Admin</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBlock(user.email, !user.isBlocked)}
                      disabled={user.role === "admin"}
                    >
                      {user.isBlocked ? (
                        <>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span className="cursor-pointer">Unblock User</span>
                        </>
                      ) : (
                        <>
                          <UserX className="mr-2 h-4 w-4" />
                          <span className="cursor-pointer">Block User</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <UserX className="mr-2 h-4 w-4" />
                          <span className="cursor-pointer">Delete User</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this user?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete the user account and remove their data from
                            our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete User
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
