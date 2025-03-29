"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { env } from "@/env.mjs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";

export default function CreateItemPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!token) {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: "Необходима авторизация",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);

      const uploadedImages: string[] = [];
      for (const image of images) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);

        const uploadRes = await fetch(
          `${env.NEXT_PUBLIC_API_BASE_URL}/item/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imageFormData,
          }
        );

        if (!uploadRes.ok) throw new Error("Ошибка загрузки изображения");
        const { filename } = await uploadRes.json();
        uploadedImages.push(filename);
      }

      // Создаем товар
      const res = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/item/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          price: Number(formData.get("price")),
          images: uploadedImages,
        }),
      });

      if (!res.ok) throw new Error("Ошибка создания товара");

      const item = await res.json();
      router.push(`/items/${item.id}`);
      toast({
        title: "Успех!",
        description: "Товар успешно создан",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: "Не удалось создать товар",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <form onSubmit={onSubmit} className="space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Создание объявления</h1>
            <p className="text-sm text-muted-foreground">
              Заполните форму для создания нового объявления
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Название
              </label>
              <Input
                name="title"
                placeholder="Введите название товара"
                required
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Описание
              </label>
              <Textarea
                name="description"
                placeholder="Опишите ваш товар"
                required
                className="mt-2 min-h-[150px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Цена
              </label>
              <Input
                name="price"
                type="number"
                min="0"
                placeholder="Укажите цену"
                required
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Изображения
              </label>
              <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-gray-700 hover:bg-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {images.length < 3 && (
                  <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                  </label>
                )}
              </div>
            </div>
          </div>

          <Button
            disabled={isLoading || images.length === 0}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Создание...
              </>
            ) : (
              "Создать объявление"
            )}
          </Button>
        </form>
      </Card>
    </main>
  );
}
