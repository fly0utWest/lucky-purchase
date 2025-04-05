"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import {
  User,
  MessageCircle,
  LogOut,
  Heart,
  Package,
  Upload,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchWrapper } from "@/lib/utils";
import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { UserItems } from "./_components/user-items";
import { FavoriteItems } from "@/app/(main)/profile/[slug]/_components/favorite-items";
import { PublicUser, PublicUserSchema } from "@/shared/models";
import React from "react";

export default function ProfilePage() {
  const { slug } = useParams();
  const router = useRouter();
  const { authenticatedUser, logout } = useAuthStore();
  const isOwnProfile = authenticatedUser?.id === slug || slug === "me";

  // Редирект на логин если пытаемся получить доступ к /me без авторизации
  React.useEffect(() => {
    if (slug === "me" && !authenticatedUser) {
      router.push("/auth/login");
    }
  }, [slug, authenticatedUser, router]);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<PublicUser>({
    queryKey: ["user", slug === "me" ? authenticatedUser?.id : slug],
    queryFn: () =>
      fetchWrapper(
        `user/${slug === "me" ? authenticatedUser?.id : slug}`,
        undefined,
        PublicUserSchema
      ),
    enabled:
      !!slug && (slug !== "me" || (slug === "me" && !!authenticatedUser?.id)),
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
      {/* Профиль */}
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5" />
        <div className="p-6 -mt-16">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-4 border-background overflow-hidden bg-primary/10">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 pt-16">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    На площадке с {new Date(user.createdAt).getFullYear()}
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
                      <MessageCircle className="mr-2 h-5 w-5" />
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
            <div className="flex justify-between items-center">
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
            <FavoriteItems />
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
