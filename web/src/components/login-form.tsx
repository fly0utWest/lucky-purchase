"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegistrationScheme = z.object({
  login: z.string().email({ message: "Неправильный формат эл. почты" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть более 6 символов" }),
});

type RegistratiomFormInputs = z.infer<typeof RegistrationScheme>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegistratiomFormInputs>({
    resolver: zodResolver(RegistrationScheme),
  });

  // Handle form submission
  const onSubmit = async (data: RegistratiomFormInputs) => {
    try {
      const response = await fetch(`http://localhost:7777/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      console.log("User registered successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          {isSubmitSuccessful ? (
            <p className="bg-green-200 text-green-300 p-4 border-2 border-green-300">
              Registered successfully
            </p>
          ) : null}
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  {...register("login")}
                  placeholder="m@example.com"
                />
                {errors.login && (
                  <p className="text-red-500 text-sm">{errors.login.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
