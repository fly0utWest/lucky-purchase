"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@radix-ui/react-dropdown-menu";

import { useSidebar } from "@/components/ui/sidebar";

import {
  Search,
  Home,
  Heart,
  Settings,
  ChevronsUpDown,
  LogOut,
  BadgeCheck,
  ShoppingBag,
  HelpCircle,
  Smartphone,
  Car,
  BookOpen,
  Shirt,
  Laptop,
  Baby,
  Dumbbell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/env.mjs";

const commonNavItems = [
  {
    title: "Домой",
    url: "/",
    icon: Home,
  },
  {
    title: "Каталог товаров",
    url: "/catalog",
    icon: Search,
  },
];

const categoryItems = [
  {
    title: "Электроника",
    url: "/catalog?category=Электроника",
    icon: Smartphone,
    color: "text-[hsl(var(--chart-1))]",
  },
  {
    title: "Транспорт",
    url: "/catalog?category=Транспорт",
    icon: Car,
    color: "text-[hsl(var(--chart-2))]",
  },
  {
    title: "Для дома",
    url: "/catalog?category=для дома",
    icon: Home,
    color: "text-[hsl(var(--chart-3))]",
  },
  {
    title: "Одежда",
    url: "/catalog?category=Одежда",
    icon: Shirt,
    color: "text-[hsl(var(--chart-4))]",
  },
  {
    title: "Компьютеры",
    url: "/catalog?category=Компьютеры",
    icon: Laptop,
    color: "text-[hsl(var(--chart-5))]",
  },
  {
    title: "Детские товары",
    url: "/catalog?category=Детские товары",
    icon: Baby,
    color: "text-[hsl(var(--chart-1))]",
  },
  {
    title: "Спорт",
    url: "/catalog?category=Спорт",
    icon: Dumbbell,
    color: "text-[hsl(var(--chart-2))]",
  },
  {
    title: "Хобби",
    url: "/catalog?category=Хобби",
    icon: BookOpen,
    color: "text-[hsl(var(--chart-3))]",
  },
];

const accountItems = [
  {
    title: "Аккаунт",
    url: "/profile",
    icon: BadgeCheck,
  },
  {
    title: "Настройки",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Поддержка",
    url: "/contacts-support",
    icon: HelpCircle,
  },
  {
    title: "О сервисе",
    url: "/about",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const { logout, authenticatedUser } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const { setOpenMobile } = useSidebar();

  const navItems = [...commonNavItems];

  const handleMobileClose = () => {
    setOpenMobile(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={handleMobileClose} asChild>
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleMobileClose}
                  asChild
                  className="text-primary"
                >
                  <Link
                    href={
                      authenticatedUser
                        ? "/items/create"
                        : "/auth?mode=sign-in&redirect=/items/create"
                    }
                  >
                    <ShoppingBag className="size-5" />
                    <span>Разместить объявление</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3">
            Популярные категории
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={handleMobileClose} asChild>
                    <Link href={item.url}>
                      <item.icon className={`size-5 ${item.color}`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleMobileClose} asChild>
                  <Link href="/catalog">
                    <Search className="size-5" />
                    <span>Все категории</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {authenticatedUser ? (
          <SidebarMenuItem className="list-none">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-10 w-10 rounded-full">
                    {authenticatedUser.avatar === null ? null : (
                      <AvatarImage
                        src={`${env.NEXT_PUBLIC_STATIC_URL}/users/avatars/${authenticatedUser.avatar}`}
                      />
                    )}
                    <AvatarFallback className="rounded-full uppercase">
                      {authenticatedUser.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {authenticatedUser.name}
                    </span>
                    <span className="truncate text-xs">
                      {authenticatedUser.login}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage
                        src={`${env.NEXT_PUBLIC_STATIC_URL}/users/avatars/${authenticatedUser.avatar}`}
                      />
                      <AvatarFallback className="rounded-full uppercase">
                        {authenticatedUser.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate text-xs">
                        {authenticatedUser.login}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {accountItems.map((item) => (
                    <DropdownMenuItem
                      key={item.title}
                      onClick={handleMobileClose}
                    >
                      <item.icon className="size-5" />
                      <Link
                        className="w-full"
                        href={
                          item.url === "/profile"
                            ? `/profile/${authenticatedUser.id}`
                            : item.url
                        }
                      >
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    handleMobileClose();
                    logout();
                  }}
                  className="text-destructive cursor-pointer hover:text-destructive"
                >
                  <LogOut className="size-5" />
                  Выйти из аккаунта
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ) : (
          <div className="space-y-2 px-2">
            <Button asChild onClick={handleMobileClose} className="w-full">
              <Link href={"/auth?mode=sign-in"}>Войти</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              onClick={handleMobileClose}
              className="w-full"
            >
              <Link href={"/auth?mode=sign-up"}>Регистрация</Link>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
