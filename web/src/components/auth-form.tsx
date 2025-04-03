"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { env } from "@/env.mjs";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Logo from "./logo";

const RegistrationSchema = z
  .object({
    login: z.string().email({ message: "Неправильный формат эл. почты" }),
    name: z.string().min(1, { message: "Пожалуйста, введите своё имя" }),
    password: z
      .string()
      .min(6, { message: "Пароль должен быть 6 символов или больше" }),
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

function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError && error.message.includes("fetch");
}

function SignInForm({
  onSubmit,
}: {
  onSubmit: (data: LoginFormData) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Электронная почта</Label>
        <Input
          id="email"
          type="text"
          {...register("login")}
          placeholder="example@mail.com"
        />
        {errors.login?.message && (
          <p className="text-destructive text-sm">{errors.login.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password?.message && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Загрузка..." : "Войти"}
      </Button>
    </form>
  );
}

function SignUpForm({
  onSubmit,
}: {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          placeholder="Ваше имя"
        />
        {errors.name?.message && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
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
        {errors.login?.message && (
          <p className="text-destructive text-sm">{errors.login.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password?.message && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p className="text-destructive text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Загрузка..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
}

type AuthMode = "sign-up" | "sign-in";

export function AuthForm() {
  const [tab, setTab] = useState<"sign-in" | "sign-up">("sign-up");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useAuthStore();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (modeParam === "sign-in" || modeParam === "sign-up") {
      setTab(modeParam);
    } else {
      setTab("sign-up");
    }
  }, [modeParam]);

  const handleTabChange = (value: string) => {
    if (value === "sign-in" || value === "sign-up") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("mode", value);
      router.push(path + "?" + params);
      setTab(value);
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const onSignInSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const endpoint = "/auth/login";
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Ошибка авторизации");
      }
      const fetchedToken = await response.json();
      setSuccessMessage("");
      setToken(fetchedToken.token);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Ошибка при авторизации:", error);
        setSuccessMessage("");
        const msg = isNetworkError(error)
          ? "Сетевая ошибка. Проверьте соединение и попробуйте еще раз."
          : error.message;
        setErrorMessage(msg || "Произошла ошибка. Попробуйте еще раз.");
      }
    }
  };

  const onSignUpSubmit = async (data: RegistrationFormData) => {
    try {
      setErrorMessage("");
      const { confirmPassword, ...filteredData } = data;
      const endpoint = "/user/register";
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filteredData),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Ошибка регистрации");
      }
      setSuccessMessage(
        "Регистрация прошла успешно! Теперь вы можете войти в систему."
      );
      setErrorMessage("");
      setTab("sign-in");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Ошибка при регистрации:", error);
        const msg = isNetworkError(error)
          ? "Сетевая ошибка. Проверьте соединение и попробуйте еще раз."
          : error.message;
        setErrorMessage(msg || "Произошла ошибка. Попробуйте еще раз.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex justify-center flex-col items-center gap-3">
        <Logo />
      </CardHeader>
      <CardContent>
        {successMessage && (
          <p className="text-chart-2 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-destructive text-center mb-4">{errorMessage}</p>
        )}
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="sign-in">Вход</TabsTrigger>
            <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm onSubmit={onSignInSubmit} />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm onSubmit={onSignUpSubmit} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
