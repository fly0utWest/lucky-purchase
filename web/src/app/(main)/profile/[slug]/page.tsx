"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { User2, MessageSquare, LogOut, Upload } from "lucide-react";
import { fetchWrapper } from "@/lib/utils";
import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { UserItems } from "./_sectioms/user-items";
import { FavoriteItems } from "@/app/(main)/profile/[slug]/_sectioms/favorite-items";
import { PublicUser } from "@/shared/models";
import React from "react";
import { env } from "@/env.mjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { slug } = useParams();
  const router = useRouter();
  const { authenticatedUser, token, logout } = useAuthStore();
  const isOwnProfile = authenticatedUser?.id === slug;

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<PublicUser>({
    queryKey: ["user", slug],
    queryFn: () => fetchWrapper(`user/${slug}`),
  });

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="container mx-auto py-10">
        <ErrorMessage
          title="Ошибка загрузки профиля"
          message={
            error instanceof Error
              ? error.message
              : "Не удалось загрузить информацию о пользователе"
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 relative">
          {user?.background ? (
            <Image
              src={`${env.NEXT_PUBLIC_API_BASE_URL}/static/users/backgrounds/${user?.background}`}
              alt="Background"
              fill
              className="object-cover"
            />
          ) : null}
          {isOwnProfile && !authenticatedUser?.background ? (
            <Link
              className="absolute flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity inset-0 w-full h-full bg-muted/50"
              href="/settings"
            >
              <figure className="flex flex-col items-center">
                <Upload size={64} />
                <figcaption>Загрузите фон</figcaption>
              </figure>
            </Link>
          ) : null}
        </div>
        <div className="p-6 -mt-16">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 rounded-full border-4 border-background overflow-hidden bg-primary/10">
                <AvatarImage
                  src={`${env.NEXT_PUBLIC_STATIC_URL}/users/avatars/${user?.avatar}`}
                />
                <AvatarFallback>
                  {isOwnProfile && !authenticatedUser?.background ? (
                    <Link
                      className="absolute flex justify-center items-center inset-0 w-full h-full bg-muted/50"
                      href="/settings"
                    >
                      <figure className="flex flex-col items-center">
                        <Upload />
                        <figcaption>Загрузить</figcaption>
                      </figure>
                    </Link>
                  ) : null}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 md:pt-16">
              <div className="flex flex-col gap-6 md:gap-0 md:flex-row items-center justify-between">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    На площадке с{" "}
                    {new Date(user.createdAt).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  {isOwnProfile ? (
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="mr-2 h-5 w-5" />
                      Выйти
                    </Button>
                  ) : (
                    <Button>
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Написать сообщение
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isOwnProfile ? (
        <>
          <section className="space-y-6">
            <div className="flex justify-between items-center flex-wrap">
              <h2 className="text-2xl font-semibold">Мои объявления</h2>
              <Button asChild>
                <Link href="/items/create">
                  <Upload className="mr-2 h-5 w-5" />
                  Разместить объявление
                </Link>
              </Button>
            </div>
            <UserItems userId={user.id} />
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Избранное</h2>
            <FavoriteItems userId={user.id} />
          </section>
        </>
      ) : (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Объявления пользователя</h2>
          <UserItems userId={user.id} />
        </section>
      )}
    </div>
  );
}
