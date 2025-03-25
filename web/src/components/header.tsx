"use client";

import React from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import Logo from "./logo";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case "/":
      return "Главная";
    case "/catalog":
      return "Каталог";
    case "/favorites":
      return "Избранное";
    case "/cart":
      return "Корзина";
    case "/profile":
      return "Личный кабинет";
    case "/settings":
      return "Настройки";
    case "/auth":
      return "Авторизация";
    default:
      if (pathname.startsWith("/profile/")) {
        return "Профиль";
      }
      return "Меню";
  }
};

const Header = () => {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="font-semibold">{pageTitle}</span>
        </div>

        <div className="flex-1 flex items-center justify-center max-w-xl mx-4">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск товаров..."
              className="w-full pl-10 bg-muted"
            />
          </div>
        </div>

        <div>
          <Link href="/" className="text-lg text-primary font-bold">
            <Logo mobile />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
