"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/product-card"; // Импортируем ваш компонент карточки товара
import { Product } from "@/shared/models"; // Импортируем тип Product
import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuthStore();

  // Пример данных о товарах
  const products: Product[] = [
    {
      id: 1,
      name: "Ноутбук Dell XPS",
      description: "Мощный ноутбук для работы и игр",
      price: "1200",
      image: "",
    },
    {
      id: 2,
      name: "Смартфон iPhone 13",
      description: "Стильный и производительный смартфон",
      price: "900",
      image: "",
    },
    {
      id: 3,
      name: "Наушники Sony WH-1000XM4",
      description: "Беспроводные наушники с шумоподавлением",
      price: "350",
      image: "",
    },
  ];

  // Пример данных о заказах
  const orders = [
    {
      id: 1,
      product: "Клавиатура Razer",
      amount: "$150",
      status: "Доставлено",
    },
    { id: 2, product: "Монитор Samsung", amount: "$300", status: "В пути" },
    {
      id: 3,
      product: "Мышь Logitech MX Master 3",
      amount: "$100",
      status: "Обработка",
    },
  ];

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {/* Левая колонка: профиль */}
      <div className="col-span-1 flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-md">
        <Avatar className="w-24 h-24">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">
          {user ? user.name : "Пользователь"}
        </h2>
        <p className="text-gray-500">ivan@example.com</p>
        <Button onClick={() => setEditMode(!editMode)}>
          Редактировать профиль
        </Button>
      </div>

      {/* Правая колонка: контент */}
      <div className="col-span-2">
        <Tabs defaultValue="products">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="products">Мои товары</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          {/* Товары пользователя */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Мои товары</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Button className="mt-4">Добавить товар</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Заказы пользователя */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Мои заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{order.product}</p>
                            <p className="text-sm text-gray-500">
                              {order.amount}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "Доставлено"
                                ? "bg-green-100 text-green-800"
                                : order.status === "В пути"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Настройки пользователя */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Имя</Label>
                    <Input defaultValue="Иван Иванов" disabled={!editMode} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      defaultValue="ivan@example.com"
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input
                      defaultValue="+7 (999) 123-45-67"
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Адрес</Label>
                    <Input
                      defaultValue="ул. Пушкина, д. 10"
                      disabled={!editMode}
                    />
                  </div>
                  <Button className="mt-4" disabled={!editMode}>
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
