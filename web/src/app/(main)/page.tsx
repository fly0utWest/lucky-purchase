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
import HeroSection from "./_sections/hero-section";
import Categories from "./_sections/categories";
import WhyUs from "./_sections/why-us";

const fetchPopularItems = async (): Promise<Item[]> => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/item/get?limit=3`
  );

  if (!response.ok) {
    throw new Error("Ошибка при загрузке популярных товаров");
  }

  const data = await response.json();
  return data.items;
};

export default function HomePage() {
  const { isLoading, data: popularItems } = useQuery<Item[]>({
    queryFn: fetchPopularItems,
    queryKey: ["popularItems"],
  });

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:gap-16 md:p-8">
      <HeroSection />

      <Categories />

      <WhyUs />

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
