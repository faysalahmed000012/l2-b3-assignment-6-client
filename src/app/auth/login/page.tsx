"use client";
import LoginForm from "@/components/custom/auth/LoginForm";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/AuthServices";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    await forgotPassword(email);
    setEmail("");
  };

  return (
    <div className="mt-[150px] mx-[80px] min-h-[70vh] flex flex-col items-center justify-center">
      <LoginForm />
      <Dialog>
        <DialogTrigger asChild>
          <p className="underline text-sm cursor-pointer">Forgot Password?</p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action="">
            <DialogHeader>
              <DialogTitle>Write Your Email</DialogTitle>
              <DialogDescription>
                A link will be sent to your email to reset existing password
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>Send Link</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
