"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
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
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";

// Navigation items
const navItems = [
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

// Account menu items
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
];

export function AppSidebar() {
  const { logout, authenticatedUser } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const { setOpenMobile, setOpen } = useSidebar();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMobileClose = () => {
    setOpenMobile(false);
    setOpen(false);
    setMenuOpen(false);
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {authenticatedUser ? (
          <SidebarMenuItem className="list-none">
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
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
                        onClick={handleMobileClose}
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
          <Button asChild onClick={handleMobileClose}>
            <Link href={"/auth?mode=sign-in"}>Войти</Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
