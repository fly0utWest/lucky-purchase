"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2, Upload, Save } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/shared/providers/toast-provider";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, UpdateUserValues } from "@/shared/models";
import { useSettings } from "@/hooks/use-settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/env.mjs";
import Link from "next/link";

export default function SettingsPage() {
  const { isUserUpdating, uploadAvatar, uploadBackground, changeUserValues } =
    useSettings();
  const { authenticatedUser, token, logout } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) {
      router.push("/auth?mode=sign-in");
    }
  }, [token, authenticatedUser, router]);

  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: authenticatedUser?.name || "",
      password: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      uploadAvatar(file);
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      uploadBackground(file);
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    changeUserValues(data);
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 relative">
          {authenticatedUser?.background ? (
            <Image
              src={`${env.NEXT_PUBLIC_API_BASE_URL}/static/users/backgrounds/${authenticatedUser?.background}`}
              alt="Background"
              fill
              className="object-cover"
            />
          ) : (
            <Link
              className="absolute flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity inset-0 w-full h-full bg-muted/50"
              href="/settings"
            >
              <figure className="flex flex-col items-center">
                <Upload size={64} />
                <figcaption>Загрузите фон</figcaption>
              </figure>
            </Link>
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 right-4">
            <Label
              htmlFor="background"
              className="cursor-pointer bg-background/80 hover:bg-background p-2 rounded-full"
            >
              <Upload className="h-5 w-5" />
            </Label>
            <Input
              id="background"
              type="file"
              accept="image/*"
              className="hidden"
              ref={backgroundInputRef}
              onChange={handleBackgroundChange}
            />
          </div>
        </div>
        <div className="p-6 -mt-16">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 rounded-full border-4 border-background overflow-hidden bg-primary/10">
                <AvatarImage
                  src={`${env.NEXT_PUBLIC_STATIC_URL}/users/avatars/${authenticatedUser?.avatar}`}
                />
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
              </Avatar>

              <Label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 cursor-pointer bg-background/80 hover:bg-background p-2 rounded-full"
              >
                <Upload className="h-5 w-5" />
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
      </Card>

      <form className="space-y-8" onSubmit={onSubmit}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={authenticatedUser?.login || ""}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                Email нельзя изменить
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Введите ваше имя"
                defaultValue={authenticatedUser?.name}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Изменение пароля</h3>

            <div className="space-y-2">
              <Label htmlFor="password">Новый пароль</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder="Введите новый пароль"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isUserUpdating}
          >
            <Save className="mr-2 h-5 w-5" />
            Сохранить изменения
          </Button>
        </div>
      </form>
    </div>
  );
}
