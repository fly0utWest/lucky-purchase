"use client";
import { useQuery } from "@tanstack/react-query";
import { Item } from "@/shared/models";
import ItemCard from "@/components/item-card";
import HowItWorks from "./_sections/how-it-works";
import HeroSection from "./_sections/hero-section";
import Categories from "./_sections/categories";
import WhyUs from "./_sections/why-us";
import { fetchWrapper } from "@/lib/utils";
import RecentItems from "./_sections/recent-items";

export default function HomePage() {
  const { isLoading, data: popularItems } = useQuery<Item[]>({
    queryFn: () => fetchWrapper(`item/get?limit=3`),
    queryKey: ["popularItems"],
  });

  return (
    <>
      <HeroSection />
      <Categories />
      <WhyUs />
      <RecentItems>
        {isLoading ? (
          <p>Загрузка популярных товаров...</p>
        ) : popularItems && popularItems.length > 0 ? (
          popularItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>Популярные товары не найдены</p>
        )}
      </RecentItems>
      <HowItWorks />
    </>
  );
}
