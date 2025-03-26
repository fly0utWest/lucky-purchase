import { notFound } from "next/navigation";
import { env } from "@/env.mjs";
import { Item } from "@/shared/models";
import { formatPrice } from "@/lib/utils";
import { Calendar, Heart, MessageCircle, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

async function getItem(id: string): Promise<Item> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/item/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch item");
  }
  return res.json();
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  let item: Item;

  try {
    item = await getItem(params.id);
  } catch (error) {
    notFound();
  }

  const formattedDate = new Date(item.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4">
        {/* Навигация */}
        <div className="mb-6 text-sm text-muted-foreground">
          <span>Главная</span>
          <span className="mx-2">/</span>
          <span>Товары</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{item.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Основная информация */}
          <div className="space-y-8">
            {/* Галерея */}
            <Card className="overflow-hidden">
              <div className="grid gap-4 p-4 sm:grid-cols-[2fr,1fr]">
                {/* Основное изображение */}
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {item.images && item.images.length > 0 && (
                    <img
                      src={`${env.NEXT_PUBLIC_STATIC_URL}/items/${item.images[0]}`}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                </div>

                {/* Дополнительные изображения */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                  {item.images?.slice(1, 3).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <img
                        src={`${env.NEXT_PUBLIC_STATIC_URL}/items/${image}`}
                        alt={`${item.title} ${index + 2}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Описание */}
            <Card>
              <div className="space-y-6 p-6">
                <div>
                  <h2 className="text-xl font-semibold">Описание</h2>
                  <p className="mt-4 whitespace-pre-wrap text-gray-600">
                    {item.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold">Характеристики</h2>
                  <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-gray-500">ID товара</dt>
                      <dd className="text-gray-900">{item.id}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Дата публикации</dt>
                      <dd className="text-gray-900">{formattedDate}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Card>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Информация о цене и действия */}
            <Card>
              <div className="space-y-6 p-6">
                <div>
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button size="lg" className="w-full">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Написать продавцу
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg">
                      <Heart className="mr-2 h-5 w-5" />В избранное
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="mr-2 h-5 w-5" />
                      Поделиться
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Информация о продавце */}
            <Card>
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.user.name}</h3>
                    <p className="text-sm text-gray-500">Продавец</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    На площадке с {new Date(item.user.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
