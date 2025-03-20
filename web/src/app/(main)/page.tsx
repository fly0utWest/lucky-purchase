"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, CreditCard } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import { Item } from "@/shared/models";

const fetchPopularItems = async (): Promise<Item[]> => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/item/get?limit=3`
  );

  if (!response.ok) {
    throw new Error("гг не будет");
  }

  const data = await response.json();

  return data;
};

export default function HomePage() {
  const { authenticatedUser } = useAuthStore();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {authenticatedUser ? (
        <div className="rounded-xl bg-muted/50 p-6 text-center">
          <h1 className="text-4xl font-bold">
            Привет, {authenticatedUser.name}
          </h1>
        </div>
      ) : (
        <div className="rounded-xl bg-muted/50 p-6 text-center">
          <h1 className="text-4xl font-bold">
            Добро пожаловать на ТП <br />
            <span className="text-primary">&quot;Удачная покупка&quot;</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Покупайте и продавайте товары легко и быстро.
          </p>
          <div className="mt-4">
            <Button asChild>
              <Link href="/auth">Присоединиться</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Раздел популярных товаров */}

      {/* Секция "Как это работает" */}
      <h2 className="text-2xl font-bold mt-6">Как это работает?</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-xl bg-muted/50 text-center flex flex-col items-center">
          <Search className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-semibold mt-2">Найдите товар</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Используйте поиск и фильтры для удобного выбора.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center flex flex-col items-center">
          <MessageCircle className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-semibold mt-2">Свяжитесь с продавцом</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Задайте вопросы и уточните детали.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center flex flex-col items-center">
          <CreditCard className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-semibold mt-2">Совершите сделку</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Договоритесь о покупке и получите товар.
          </p>
        </div>
      </div>
    </div>
  );
}
