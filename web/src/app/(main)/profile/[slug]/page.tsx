"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import { Item } from "@/shared/models";
import { Card } from "@/components/ui/card";
import ItemCard from "@/components/item-card";
import { User2, Heart, Clock, Settings, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Функция для получения избранных товаров
const fetchFavoriteItems = async (): Promise<Item[]> => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/item/favorites`
  );
  if (!response.ok) {
    throw new Error("Ошибка при загрузке избранных товаров");
  }
  return response.json();
};

// Функция для получения просмотренных товаров
const fetchViewedItems = async (): Promise<Item[]> => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/item/viewed`);
  if (!response.ok) {
    throw new Error("Ошибка при загрузке просмотренных товаров");
  }
  return response.json();
};

export default function ProfilePage() {
  const { slug } = useParams();
  const { authenticatedUser, logout } = useAuthStore();

  const { data: favoriteItems, isLoading: isFavoritesLoading } = useQuery<
    Item[]
  >({
    queryKey: ["favoriteItems"],
    queryFn: fetchFavoriteItems,
  });

  const { data: viewedItems, isLoading: isViewedLoading } = useQuery<Item[]>({
    queryKey: ["viewedItems"],
    queryFn: fetchViewedItems,
  });

  if (!authenticatedUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-6">
          <h1 className="text-xl font-semibold">Необходима авторизация</h1>
          <p className="mt-2 text-gray-600">Пожалуйста, войдите в систему</p>
          <Link href="/auth?mode=sign-in">
            <Button className="mt-4">Войти</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen space-y-8 p-4 py-8">
      {/* Шапка профиля */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-lg">
            <AvatarFallback className="uppercase bg-primary/10 text-primary">
              {authenticatedUser.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {authenticatedUser.name}
            </h1>
            <p className="text-muted-foreground">
              На площадке с{" "}
              {new Date(authenticatedUser.createdAt).getFullYear()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" onClick={() => logout()}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Вкладки */}
      <Tabs defaultValue="favorites" className="space-y-4">
        <TabsList className="bg-background">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Избранное
          </TabsTrigger>
          <TabsTrigger value="viewed" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Просмотренные
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isFavoritesLoading ? (
              <div className="text-muted-foreground">Загрузка...</div>
            ) : favoriteItems?.length ? (
              favoriteItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))
            ) : (
              <div className="text-muted-foreground">Нет избранных товаров</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="viewed">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isViewedLoading ? (
              <div className="text-muted-foreground">Загрузка...</div>
            ) : viewedItems?.length ? (
              viewedItems.map((item) => <ItemCard key={item.id} item={item} />)
            ) : (
              <div className="text-muted-foreground">
                Нет просмотренных товаров
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
