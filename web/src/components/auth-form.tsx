"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegistrationSchema = z
  .object({
    login: z.string().email({ message: "Неправильный формат эл. почты" }),
    name: z.string().min(1, { message: "Пожалуйста, введите своё имя" }),
    password: z
      .string()
      .min(6, { message: "Пароль должен быть более 6 символов" }),
    confirmPassword: z.string().min(6, { message: "Подтвердите пароль" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

const LoginSchema = z.object({
  login: z.string().email({ message: "Неправильный формат эл. почты" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть более 6 символов" }),
});

type RegistrationFormData = z.infer<typeof RegistrationSchema>;
type LoginFormData = z.infer<typeof LoginSchema>;

export function AuthForm() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [tab, setTab] = useState<"sign-in" | "sign-up">("sign-up");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormData | LoginFormData>({
    resolver: zodResolver(tab === "sign-up" ? RegistrationSchema : LoginSchema),
  });

  const handleTabChange = (value: string) => {
    if (value === "sign-in" || value === "sign-up") {
      setTab(value);
      setSuccessMessage("");
      reset();
    }
  };

  const onSubmit = async (data: RegistrationFormData | LoginFormData) => {
    const isSignUp = tab === "sign-up";
    const { confirmPassword, ...filteredData } = isSignUp
      ? (data as RegistrationFormData)
      : data;

    try {
      const endpoint = isSignUp ? "/user/register" : "/auth/login";
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData),
      });

      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }

      reset();
      if (isSignUp) {
        setSuccessMessage(
          "Регистрация прошла успешно! Теперь вы можете войти в систему."
        );
        setTab("sign-in");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="sign-in">Вход</TabsTrigger>
            <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
          </TabsList>

          {/* 🔹 Sign-in Form */}
          <TabsContent value="sign-in">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Электронная почта</Label>
                <Input
                  id="email"
                  type="text"
                  {...register("login")}
                  placeholder="example@mail.com"
                />
                {errors.login && (
                  <p className="text-red-500 text-sm">{errors.login.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
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
                {isSubmitting ? "Загрузка..." : "Войти"}
              </Button>
            </form>
          </TabsContent>

          {/* 🔹 Sign-up Form */}
          <TabsContent value="sign-up">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Ваше имя"
                />
                {tab === "sign-up" && errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Электронная почта</Label>
                <Input
                  id="email"
                  type="text"
                  {...register("login")}
                  placeholder="example@mail.com"
                />
                {tab === "sign-up" && errors.login && (
                  <p className="text-red-500 text-sm">{errors.login.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {tab === "sign-up" && errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {tab === "sign-up" && errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Загрузка..." : "Зарегистрироваться"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
