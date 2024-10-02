"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/auth/authApi";
import { IUser, setUser } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyToken } from "../../../../utils";
import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    try {
      const res = await login(data);
      const user = verifyToken(res.data.token) as unknown as IUser;
      dispatch(setUser({ user: user, token: res.data.token }));
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
