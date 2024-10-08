"use client";
import LoginForm from "@/components/custom/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/services/AuthServices";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    const res = await forgotPassword(email);
    setEmail("");
  };

  return (
    <div className="mt-[150px] mx-[80px] min-h-[70vh] flex flex-col items-center justify-center">
      <LoginForm />
      <form
        className="border mt-3 flex flex-col items-center justify-center p-3 rounded-xl"
        action=""
      >
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
        <Button onClick={handleSubmit}>Forgot Password ?</Button>
      </form>
    </div>
  );
};

export default Login;
