import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ShoppingBag, BadgeCheck } from "lucide-react";

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

export default function HeroSection() {
  const { authenticatedUser } = useAuthStore();

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center">
      <div className="relative z-10">
        {authenticatedUser ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold">
              Привет, {authenticatedUser.name}! 👋
            </h1>
            <p className="text-xl text-muted-foreground">
              Готовы к новым сделкам сегодня?
            </p>
            <HeroButtons>
              <Button asChild size="lg">
                <Link href="/items/create">Разместить товар</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/catalog">Перейти в каталог</Link>
              </Button>
            </HeroButtons>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold">
              Добро пожаловать на платформу
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                &ldquo;Удачная покупка&rdquo;
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Ваше место для безопасных покупок и продаж. Присоединяйтесь к
              тысячам довольных пользователей!
            </p>
            <HeroButtons>
              <Button asChild size="lg">
                <Link href="/auth">Начать покупать</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/auth">Начать продавать</Link>
              </Button>
            </HeroButtons>
          </div>
        )}

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full">
        <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </div>
  );
}
