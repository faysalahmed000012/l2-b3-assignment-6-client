"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import Link from "next/link";
import { useState } from "react";
import AuthHeader from "./auth-header";

interface CardWrapperProps {
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) => {
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    await forgotPassword(email);
    setEmail("");
  };

  return (
    <Card className="w-full h-full shadow-md ">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent className="md:w-[70%] mx-auto">{children}</CardContent>
      <CardFooter>
        <div className="mx-auto">
          <Button
            variant="link"
            className="font-normal w-full mb-3"
            size="sm"
            asChild
          >
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <p className="underline text-center text-sm cursor-pointer">
                Forgot Password?
              </p>
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
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
