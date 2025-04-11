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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Link from "next/link";

interface Items {
  items: Item[];
  count: number;
}

export default function HomePage() {
  const { data, isLoading } = useQuery<Items>({
    queryFn: () => fetchWrapper(`item/get?limit=3`),
    queryKey: ["popularItems"],
  });

  const recentItems = data?.items || [];

  return (
    <>
      <HeroSection />
      <Categories />
      <WhyUs />
      <RecentItems>
        {isLoading ? (
          <div className="container mx-auto flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : recentItems && recentItems.length > 0 ? (
          recentItems.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>Популярные товары не найдены</p>
        )}
      </RecentItems>
      <HowItWorks />
    </>
  );
}
