import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/router";

const UserFollowManagement = ({ userData }) => {
  const router = useRouter();
  return (
    <div>
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
                  <Button
                    onClick={() => router.push(`/profile/${user?.email}`)}
                  >
                    Profile
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserFollowManagement;
