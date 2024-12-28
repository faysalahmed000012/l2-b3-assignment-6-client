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
import { useUser } from "@/context/userProvider";
import { useUserLogin } from "@/hooks/auth.hooks";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleUserCredential = () => {
    form.setValue("email", "faysal000015@gmail.com");
    form.setValue("password", "faysalAhmed");
  };
  const handleAdminCredential = () => {
    form.setValue("email", "darth0000@gmail.com");
    form.setValue("password", "darthVader");
  };

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    handleUserLogin(data);
    userLoading(true);
  };
  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <CardWrapper
      label="Write email and password to login to your account"
      title="Welcome Back !"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <div className="flex items-center justify-center gap-6 mb-6">
        <Button
          onClick={handleUserCredential}
          className="bg-orange-500 hover:bg-orange-600"
        >
          User Credential
        </Button>
        <Button
          onClick={handleAdminCredential}
          className="bg-rose-500 hover:bg-rose-600"
        >
          Admin Credential
        </Button>
      </div>
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
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
