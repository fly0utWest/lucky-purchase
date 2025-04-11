import { Metadata } from "next";
import {
  BookOpen,
  Shield,
  Star,
  Zap,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О сервисе | Удачная Покупка",
  description: "Информация о нашем сервисе и его возможностях",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-center gap-3 mb-12">
        <div className="relative">
          <Image src="/icon.png" width={48} height={48} alt="Логотип" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          О нашем сервисе
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border/50 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">
              Что такое Удачная Покупка?
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Это современная платформа для покупки и продажи товаров, где каждый
            может найти нужные вещи или продать свои.
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-lg border border-border/50 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Как начать?</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Просто зарегистрируйтесь, разместите объявление или найдите нужный
            товар. Мы поможем вам совершить безопасную сделку.
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-lg border border-border/50 hover:border-primary/50 transition-colors md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Наши преимущества</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-primary/10 rounded-full mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Удобный интерфейс</h3>
                <p className="text-sm text-muted-foreground">
                  Интуитивно понятный дизайн для комфортного использования
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-primary/10 rounded-full mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Безопасные сделки</h3>
                <p className="text-sm text-muted-foreground">
                  Защита от мошенничества и безопасные платежи
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-primary/10 rounded-full mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Широкий выбор</h3>
                <p className="text-sm text-muted-foreground">
                  Тысячи товаров в различных категориях
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-primary/10 rounded-full mt-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Система рейтингов</h3>
                <p className="text-sm text-muted-foreground">
                  Честные отзывы и рейтинги пользователей
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-br from-primary/15 to-primary/10 rounded-xl p-8 border border-border/50 hover:border-primary/50 transition-colors">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" />
          Полезные ссылки
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/faq"
            className="group bg-card/50 hover:bg-card p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Часто задаваемые вопросы</h3>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground">
              Ответы на популярные вопросы о сервисе
            </p>
          </Link>

          <Link
            href="/contacts-support"
            className="group bg-card/50 hover:bg-card p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Контакты и Поддержка</h3>
              <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground">
              Свяжитесь с нашей службой поддержки
            </p>
          </Link>

          <Link
            href="/terms"
            className="group bg-card/50 hover:bg-card p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Условия использования</h3>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-sm text-muted-foreground">
              Ознакомьтесь с условиями использования
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
