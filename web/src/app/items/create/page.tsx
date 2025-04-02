"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/shared/providers/toast-provider";
import { useAuthStore } from "@/store/authStore";
import { fetchWrapper } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

// Define schema using Zod
const itemFormSchema = z.object({
  title: z.string().min(3, "Название должно быть не менее 3 символов"),
  description: z.string().min(10, "Описание должно быть не менее 10 символов"),
  price: z.coerce.number().positive("Цена должна быть положительным числом"),
  categoryId: z.string().uuid("Формат id неправилен"),
});

type ItemFormValues = z.infer<typeof itemFormSchema>;

export default function CreateItemPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = useAuthStore();
  const [images, setImages] = useState<File[]>([]);

  // Setup React Hook Form with Zod validation
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  // Image upload mutation
  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const imageFormData = new FormData();
      imageFormData.append("image", file);

      const data = await fetchWrapper<{ filename: string }>("/item/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: imageFormData,
      });

      return data.filename;
    },
  });

  // Create item mutation
  const createItemMutation = useMutation({
    mutationFn: async (data: ItemFormValues & { images: string[] }) => {
      return fetchWrapper("/item/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      router.push(`/items/${data.id}`);
      toast({
        title: "Успех!",
        description: "Товар успешно создан",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: "Не удалось создать товар",
      });
    },
  });

  const isSubmitting =
    uploadImageMutation.isPending || createItemMutation.isPending;

  async function onSubmit(values: ItemFormValues) {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: "Необходима авторизация",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: "Добавьте хотя бы одно изображение",
      });
      return;
    }

    try {
      // Upload all images first
      const uploadPromises = images.map((image) =>
        uploadImageMutation.mutateAsync(image)
      );
      const uploadedImages = await Promise.all(uploadPromises);

      // Then create the item with the image filenames
      await createItemMutation.mutateAsync({
        ...values,
        images: uploadedImages,
      });
    } catch (error) {
      // Error handling is done in the mutation callbacks
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Создание объявления</h1>
            <p className="text-sm text-muted-foreground">
              Заполните форму для создания нового объявления
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Название
              </label>
              <Input
                id="title"
                placeholder="Введите название товара"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Описание
              </label>
              <Textarea
                id="description"
                placeholder="Опишите ваш товар"
                className="min-h-[150px]"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Цена
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="Укажите цену"
                {...form.register("price", { valueAsNumber: true })}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.price.message}
                </p>
              )}
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
              {images.length === 0 && (
                <p className="mt-2 text-sm text-destructive">
                  Добавьте хотя бы одно изображение
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || images.length === 0}
            className="w-full"
          >
            {isSubmitting ? (
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
