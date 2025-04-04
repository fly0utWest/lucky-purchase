"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/shared/providers/toast-provider";
import { useAuthStore } from "@/store/authStore";
import { fetchWrapper } from "@/lib/utils";
import { itemFormSchema, ItemFormValues } from "@/shared/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import CategoriesDropdown from "@/components/categories-dropdown";
import Image from "next/image";
import { useItems } from "@/hooks/use-items";

export default function CreateItemPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = useAuthStore();
  const [images, setImages] = useState<File[]>([]);
  const { createItem, isCreating } = useItems(); // Use the hook

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categoryId: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Ошибка!",
        description: "Необходима авторизация",
      });
      router.push("/auth/login");
    }
  }, [token, toast, router]);

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

  const isSubmitting = uploadImageMutation.isPending || isCreating;

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
      const uploadPromises = images.map((image) =>
        uploadImageMutation.mutateAsync(image)
      );

      toast({
        title: "Загрузка...",
        description: "Загружаем изображения",
      });

      const uploadedImages = await Promise.all(uploadPromises);

      // Use the createItem function from your hook
      const createdItem = await createItem({
        ...values,
        images: uploadedImages,
      });

      router.push(`/items/${createdItem.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (!uploadImageMutation.isError) {
        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: "Произошла неизвестная ошибка при создании товара",
        });
      }
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles = files.filter((file) => {
        const isValidType = file.type.startsWith("image/");
        const isValidSize = file.size <= 5 * 1024 * 1024;
        if (!isValidType || !isValidSize) {
          toast({
            variant: "destructive",
            title: "Ошибка!",
            description: !isValidType
              ? "Разрешены только изображения"
              : "Размер файла не должен превышать 5MB",
          });
          return false;
        }
        return true;
      });
      setImages((prev) => {
        const newImages = [...prev, ...validFiles];
        return newImages.slice(0, 3);
      });
    }
  }

  // Rest of your component remains the same
  return (
    <Card className="container mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* Form content remains the same */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Создание объявления</h1>
          <p className="text-sm text-muted-foreground">
            Заполните форму для создания нового объявления
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Категория
            </label>
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <CategoriesDropdown
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            {form.formState.errors.categoryId && (
              <p className="text-sm text-destructive">
                {form.formState.errors.categoryId.message}
              </p>
            )}
          </div>
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              Изображения (макс. 3)
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                >
                  <Image
                    width={196}
                    height={196}
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
                    disabled={isSubmitting}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <label
                  className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isSubmitting}
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
          disabled={
            isSubmitting || images.length === 0 || !form.formState.isValid
          }
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
  );
}
