import React, { useState, useCallback, memo } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ShoppingBag, BadgeCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const STATS_CONFIG = [
  {
    icon: Users,
    value: "1,000+",
    label: "Пользователей",
    iconColor: "text-pink-500",
    bgColor: "bg-pink-500/15 dark:bg-pink-500/20",
  },
  {
    icon: ShoppingBag,
    value: "5,000+",
    label: "Товаров",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/15 dark:bg-blue-500/20",
  },
  {
    icon: BadgeCheck,
    value: "500+",
    label: "Успешных сделок",
    iconColor: "text-green-500",
    bgColor: "bg-green-500/15 dark:bg-green-500/20",
  },
];

const HeroButtons = memo(({ children }: { children: React.ReactNode }) => (
  <nav className="flex flex-col md:flex-row justify-center gap-4">
    {children}
  </nav>
));
HeroButtons.displayName = "HeroButtons";

const DecorativeElements = memo(() => (
  <figure className="absolute inset-0 -z-10 flex flex-wrap justify-between items-center pointer-events-none">
    <section className="flex-1 h-full flex justify-start items-center">
      <span className="w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-40 transform -translate-x-10" />
    </section>
    <section className="flex-1 h-full flex justify-end items-center">
      <span className="w-52 h-52 rounded-full bg-primary/5 blur-3xl opacity-30" />
    </section>
    <section className="w-full h-1/4 flex justify-center items-end">
      <span className="w-32 h-32 rounded-full bg-primary/8 blur-3xl opacity-40 transform -translate-y-10" />
    </section>
  </figure>
));
DecorativeElements.displayName = "DecorativeElements";

const StatItem = memo(
  ({ stat, index }: { stat: (typeof STATS_CONFIG)[0]; index: number }) => (
    <article
      className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <figure className={cn("rounded-full p-4", stat.bgColor)}>
        <stat.icon className={cn("h-6 w-6", stat.iconColor)} />
      </figure>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        {stat.value}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
    </article>
  )
);
StatItem.displayName = "StatItem";

const StatsSection = memo(() => (
  <section className="mt-12">
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
      {STATS_CONFIG.map((stat, index) => (
        <li key={stat.label}>
          <StatItem stat={stat} index={index} />
        </li>
      ))}
    </ul>
  </section>
));
StatsSection.displayName = "StatsSection";

const AuthenticatedContent = memo(({ name }: { name: string }) => (
  <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
    <header>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 dark:text-white">
        Привет, <span className="text-primary">{name}</span>! 👋
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
        Готовы к новым сделкам сегодня?
      </p>
    </header>

    <HeroButtons>
      <Button
        asChild
        size="lg"
        className="bg-primary text-white hover:bg-primary/90 px-6"
      >
        <Link href="/items/create">начать продавать</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="bg-white/90 dark:bg-white/10 text-primary dark:text-white border-gray-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/20 px-6"
      >
        <Link href="/catalog">Начать покупать</Link>
      </Button>
    </HeroButtons>
  </section>
));
AuthenticatedContent.displayName = "AuthenticatedContent";

const GuestContent = memo(() => (
  <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
    <header>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 dark:text-white">
        Добро пожаловать на платформу
        <span className="block mt-2 text-primary">
          &ldquo;Удачная покупка&rdquo;
        </span>
      </h1>
      <p className="mx-auto max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
        Ваше место для безопасных покупок и продаж. Присоединяйтесь к тысячам
        довольных пользователей!
      </p>
    </header>

    <HeroButtons>
      <Button
        asChild
        size="lg"
        className="bg-primary text-white font-medium px-6"
      >
        <Link href="/auth?mode=sign-in">Начать покупать</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="bg-white/90 dark:bg-white/10 text-primary dark:text-white border-gray-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/20 px-6"
      >
        <Link href="/auth?mode=sign-up">Начать продавать</Link>
      </Button>
    </HeroButtons>
  </section>
));
GuestContent.displayName = "GuestContent";
const HeroSection = () => {
  const { authenticatedUser } = useAuthStore();

  return (
    <main className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-200/80 via-pink-100/50 to-pink-50/30 dark:from-primary/20 dark:via-primary/1 dark:to-primary/1 text-gray-800 dark:text-white rounded-lg shadow-md overflow-hidden">
      <DecorativeElements />

      <section className="container mx-auto px-4 py-12 relative z-10 text-center">
        {authenticatedUser ? (
          <AuthenticatedContent name={authenticatedUser.name} />
        ) : (
          <GuestContent />
        )}

        <StatsSection />
      </section>
    </main>
  );
};

export default HeroSection;
