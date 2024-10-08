"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordChange } from "@/services/AuthServices";
import { useState } from "react";

const ChangePassword = ({ email }: { email: string }) => {
  const [open, setOpen] = useState(false);
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    await passwordChange(email, oldPassword, newPassword);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open}>
        {/* <Dialog.overlay onClick={() => setOpen(false)} /> */}
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} variant="outline">
            Change Password
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Button onClick={() => setOpen(false)}>Close</Button>
          <form onSubmit={handlePasswordChange} action="">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Current Password
                </Label>
                <Input
                  name="oldPassword"
                  id="oldPassword"
                  type="password"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  New Password
                </Label>
                <Input
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
