"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, CreditCard } from "lucide-react";
import Link from "next/link";

// Данные о популярных товарах
const products = [
  {
    id: 1,
    name: "Беспроводные наушники",
    description: "Наушники с шумоподавлением и длительной автономностью.",
    price: "129.99$",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Игровая клавиатура",
    description: "Механическая клавиатура с RGB-подсветкой.",
    price: "79.99$",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Умные часы",
    description: "Мониторинг активности и уведомления прямо на запястье.",
    price: "99.99$",
    image: "https://via.placeholder.com/300",
  },
];

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  return (
    <div className="rounded-xl bg-muted/50 shadow-md p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-muted-foreground">{product.description}</p>
      <p className="text-xl font-bold mt-2">{product.price}</p>
      <Button className="mt-4">Купить</Button>
    </div>
  );
};

export default function HomePage() {
  const { authenticatedUser } = useAuthStore();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Блок заголовка и призыва к действию */}
      {authenticatedUser ? (
        <div className="rounded-xl bg-muted/50 p-6 text-center">
          <h1 className="text-4xl font-bold">
            Привет, {authenticatedUser.name}
          </h1>
        </div>
      ) : (
        <div className="rounded-xl bg-muted/50 p-6 text-center">
          <h1 className="text-4xl font-bold">
            Добро пожаловать в Marketplace!
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
      <h2 className="text-2xl font-bold">Популярные товары</h2>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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
