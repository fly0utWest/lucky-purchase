"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function ProfilePage() {
  const { authenticatedUser, logout } = useAuthStore();

  if (!authenticatedUser) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="rounded-xl bg-muted/50 p-6 text-center">
          <h1 className="text-4xl font-bold">Доступ запрещен</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Пожалуйста, войдите в систему, чтобы просмотреть эту страницу.
          </p>
          <div className="mt-4">
            <Button asChild>
              <Link href="/auth">Войти</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Заголовок и приветствие */}
      <div className="rounded-xl bg-muted/50 p-6 text-center">
        <h1 className="text-4xl font-bold">Личный кабинет</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Добро пожаловать, {authenticatedUser.name}!
        </p>
      </div>

      {/* Информация о пользователе */}
      <div className="rounded-xl bg-muted/50 p-6">
        <h2 className="text-2xl font-bold">Ваши данные</h2>
        <div className="mt-4 space-y-2">
          <p>
            <strong>Имя:</strong> {authenticatedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {authenticatedUser.email}
          </p>
          <p>
            <strong>Дата регистрации:</strong>{" "}
            {new Date(authenticatedUser.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* История заказов */}
      <div className="rounded-xl bg-muted/50 p-6">
        <h2 className="text-2xl font-bold">История заказов</h2>
        <div className="mt-4">
          <p>Здесь будет отображаться история ваших заказов.</p>
        </div>
      </div>

      {/* Настройки */}
      <div className="rounded-xl bg-muted/50 p-6">
        <h2 className="text-2xl font-bold">Настройки</h2>
        <div className="mt-4 space-y-2">
          <Button asChild>
            <Link href="/profile/settings">Изменить данные</Link>
          </Button>
          <Button variant="destructive" onClick={logout}>
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}