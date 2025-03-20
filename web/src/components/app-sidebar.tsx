"use client";
import { useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@radix-ui/react-dropdown-menu";

import {
  Search,
  Home,
  ShoppingBasketIcon,
  Heart,
  Settings,
  User2,
  ChevronUp,
  Sparkles,
  LogOut,
  BadgeCheck,
  CreditCard,
  ChevronsUpDown,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { DropdownMenu } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarFooter } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

const items = [
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
  {
    title: "Корзина",
    url: "/cart",
    icon: ShoppingBasketIcon,
  },
  {
    title: "Избранное",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Настройки",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { logout, authenticatedUser } = useAuthStore();
  const [mounted, setMounted] = useState(false);

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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
                  <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center">
                    <AvatarFallback className="rounded-lg uppercase">
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
                    <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center">
                      <AvatarFallback className="rounded-lg uppercase">
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
                  <DropdownMenuItem>
                    <BadgeCheck />
                    <Link
                      className="w-full"
                      href={`/profile/${authenticatedUser.id}`}
                    >
                      Аккаунт
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive cursor-pointer hover:text-destructive"
                >
                  <LogOut />
                  Выйти из аккаунта
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ) : (
          <Button asChild>
            <Link href={"/auth"}>Войти</Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
