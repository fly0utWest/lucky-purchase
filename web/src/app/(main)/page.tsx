"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import { Item } from "@/shared/models";
import PopularItems from "./_sections/popular-items";
import ItemCard from "@/components/item-card";
import HowItWorks from "./_sections/how-it-works";

const fetchPopularItems = async (): Promise<Item[]> => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/item/get?limit=3`
  );

  if (!response.ok) {
    throw new Error("гг не будет");
  }

  const data = await response.json();
  console.log(data);

  return data.items;
};

export default function HomePage() {
  const { authenticatedUser } = useAuthStore();
  const { isLoading, data: popularItems } = useQuery<Item[]>({
    queryFn: fetchPopularItems,
    queryKey: ["popularItems"],
  });

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

      <PopularItems>
        {isLoading ? (
          <p>Загрузка популярных товаров...</p>
        ) : popularItems && popularItems.length > 0 ? (
          popularItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>Популярные товары не найдены</p>
        )}
      </PopularItems>
      <HowItWorks />
    </div>
  );
}
