"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsers } from "@/hooks/auth.hooks";

const TransactionsPage = () => {
  const { data } = useGetAllUsers();
  console.log(data);
  const users = data && data.filter((user) => user.isPremium === true);
  return (
    <div className="flex flex-col gap-5  w-full">
      <h1 className="text-3xl">All Premium Users:</h1>
      <div className="w-full lg:w-[95%] mx-auto overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Role</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users &&
              users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={user.profilePicture}
                          alt={user.name}
                        />
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
                    <p>{user.tranId}</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsPage;
