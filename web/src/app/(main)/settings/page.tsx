"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User2, Bell, Shield, Palette, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/shared/providers/toast-provider";

export default function SettingsPage() {
  const { authenticatedUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Здесь будет логика сохранения профиля
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация запроса
      toast({
        title: "Успех!",
        description: "Настройки профиля сохранены",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: "Не удалось сохранить настройки",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto min-h-screen space-y-8 p-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Настройки</h1>
          <p className="text-muted-foreground">
            Управление аккаунтом и настройками
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-background">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User2 className="h-4 w-4" />
            Профиль
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSaveProfile} className="space-y-6 p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="uppercase bg-primary/10 text-primary">
                    {authenticatedUser.name[0]}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">Изменить фото</Button>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-foreground">
                    Имя
                  </Label>
                  <Input
                    id="name"
                    defaultValue={authenticatedUser.name}
                    placeholder="Ваше имя"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={authenticatedUser.login}
                    placeholder="example@example.com"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Сохранение..." : "Сохранить изменения"}
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
