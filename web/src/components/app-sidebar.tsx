"use client";
import { useEffect } from "react";

import {
  Search,
  Home,
  ShoppingBasketIcon,
  Heart,
  Settings,
  User2,
  ChevronUp,
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
import { Button } from "./ui/button";
import { useState } from "react";

// Menu items.
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
  const { authenticatedUser, logout } = useAuthStore();
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
          {/* <SidebarGroupLabel className="text-xl">Удачная покупка</SidebarGroupLabel> */}
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
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Аккаунт
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Link
                      className="w-full flex-1"
                      href={`/profile/${authenticatedUser?.id}`}
                    >
                      Аккаунт
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <span>Выйти из аккаунта</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <Button className="font-bold text-lg">
            <Link className="w-full" href="/auth">
              Войти
            </Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
