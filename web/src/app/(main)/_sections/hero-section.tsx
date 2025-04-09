import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ShoppingBag, BadgeCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const stats = [
  {
    icon: Users,
    value: "1,000+",
    label: "Пользователей",
  },
  {
    icon: ShoppingBag,
    value: "5,000+",
    label: "Товаров",
  },
  {
    icon: BadgeCheck,
    value: "500+",
    label: "Успешных сделок",
  },
];

function HeroButtons({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4">
      {children}
    </div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto w-full">
      <Input
        type="text"
        placeholder="Что вы ищете сегодня?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-gray-600/20 dark:bg-black/30 text-gray-700 dark:text-white border-none pl-4 pr-12 py-6 h-12 text-base rounded-full shadow-sm placeholder:text-gray-500 dark:placeholder:text-gray-300"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-1 top-1 rounded-full h-10 w-10 bg-primary hover:bg-primary/90"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Искать</span>
      </Button>
    </form>
  );
}

export default function HeroSection() {
  const { authenticatedUser } = useAuthStore();

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-200/80 via-pink-100/50 to-pink-50/30 dark:from-primary/20 dark:via-primary/1 dark:to-primary/1 text-gray-800 dark:text-white rounded-lg shadow-md">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
        <div className="absolute -left-20 top-1/4 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-40" />
        <div className="absolute right-10 top-1/2 h-52 w-52 rounded-full bg-primary/5 blur-3xl opacity-30" />
        <div className="absolute bottom-10 left-1/3 h-32 w-32 rounded-full bg-primary/8 blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 text-center">
        {authenticatedUser ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 dark:text-white">
              Привет,{" "}
              <span className="text-primary">{authenticatedUser.name}</span>! 👋
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Готовы к новым сделкам сегодня?
            </p>

            <SearchBar />

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
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
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 dark:text-white">
              Добро пожаловать на платформу
              <div className="mt-2">
                <span className="text-primary">
                  &ldquo;Удачная покупка&rdquo;
                </span>
              </div>
            </h1>
            <p className="mx-auto max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Ваше место для безопасных покупок и продаж. Присоединяйтесь к
              тысячам довольных пользователей!
            </p>

            <SearchBar />

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
          </div>
        )}

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`rounded-full p-4 ${
                    index === 0
                      ? "bg-pink-500/15 dark:bg-pink-500/20"
                      : index === 1
                      ? "bg-blue-500/15 dark:bg-blue-500/20"
                      : "bg-green-500/15 dark:bg-green-500/20"
                  }`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${
                      index === 0
                        ? "text-pink-500"
                        : index === 1
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
