"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosApi from "@/utils/axiosConfig";
import { toast } from "@/hooks/use-toast";
import authValidator from "@/utils/zodValidator";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const { register, reset, handleSubmit } = useForm();
  const router = useRouter(); // Use useRouter for client-side navigation

  const handleLogin = handleSubmit(async (data) => {
    const validate = authValidator.safeParse(data);
    if (!validate.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validate.error.message,
        duration: 3000,
      });
      return;
    }

    try {
      const res = await axiosApi.post("/auth", data);
      if (!res.data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.message,
          duration: 3000,
        });
        return;
      }
      toast({
        title: "Success",
        description: "Login successful",
        variant: "default",
        duration: 3000,
      });
      reset();
      router.push("/dashboard"); // Redirect to home page after successful login
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please try again",
        duration: 3000,
      });
    }
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your admin credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              placeholder="password"
              type="password"
              {...register("password")}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
