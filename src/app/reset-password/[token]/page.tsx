"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/services/AuthServices";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await resetPassword(params.token, password);
    if (res) {
      router.push("/auth/login");
    }
  };

  return (
    <div className="mt-[70px] min-h-[60vh] flex items-center justify-center">
      <div>
        <form className="border p-3 rounded-xl flex flex-col items-center justify-center">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="text"
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </form>
        <Link className="text-center underline" href="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
