import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const generateMetadata = (): Metadata => {
  return {
    title: "Главная",
  };
};

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
    {/* Блок заголовка и призыва к действию */}
    <div className="rounded-xl bg-muted/50 p-6 text-center bg-">
      <h1 className="text-4xl font-bold">Добро пожаловать в Marketplace!</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Покупайте и продавайте товары легко и быстро.
      </p>
      <div className="mt-4">
        <Button asChild>
          <Link href="/sign_up">Присоединиться</Link>
        </Button>
      </div>
    </div>

    {/* Раздел популярных товаров */}
    <h2 className="text-2xl font-bold">Популярные товары</h2>
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Товар 1
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Товар 2
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
        Товар 3
      </div>
    </div>

    {/* Секция "Как это работает" */}
    <h2 className="text-2xl font-bold mt-6">Как это работает?</h2>
    <div className="grid gap-4 md:grid-cols-3">
      <div className="p-4 rounded-xl bg-muted/50 text-center">
        <h3 className="text-lg font-semibold">🔍 Найдите товар</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Используйте поиск и фильтры для удобного выбора.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-muted/50 text-center">
        <h3 className="text-lg font-semibold">💬 Свяжитесь с продавцом</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Задайте вопросы и уточните детали.
        </p>
      </div>
      <div className="p-4 rounded-xl bg-muted/50 text-center">
        <h3 className="text-lg font-semibold">💳 Совершите сделку</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Договоритесь о покупке и получите товар.
        </p>
      </div>
    </div>
  </div>
  );
}
