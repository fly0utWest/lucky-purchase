"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { User2, Upload, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useToast } from "@/shared/providers/toast-provider";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthenticatedUser } from "@/shared/models";

const UpdateUserSchema = z.object({
  name: z.string().min(1, "Имя обязательно").optional(),
  password: z.string().optional(),
});

type UpdateUserValues = z.infer<typeof UpdateUserSchema>;

export default function SettingsPage() {
  const { authenticatedUser, token, logout } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: authenticatedUser?.name,
    },
  });

  const { data: user, isLoading } = useQuery<AuthenticatedUser>({
    queryKey: ["user", authenticatedUser?.id],
    queryFn: () => fetchWrapper(`user/${authenticatedUser?.id}`),
    enabled: !!authenticatedUser?.id,
  });

  const updateUser = useMutation({
    mutationFn: async (values: UpdateUserValues) => {
      if (!token) throw new Error("Необходима авторизация");
      return fetchWrapper("user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      toast({
        title: "Успешно",
        description: "Данные пользователя обновлены",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось обновить данные пользователя",
      });
    },
  });

  const handleFileUpload = async (
    file: File,
    type: "avatar" | "background"
  ) => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Необходима авторизация",
      });
      return;
    }

    const formData = new FormData();
    formData.append(type, file);

    try {
      const response = await fetchWrapper("user/upload-files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (type === "avatar") {
        setAvatarFile(file);
      } else {
        setBackgroundFile(file);
      }

      toast({
        title: "Успешно",
        description: `${type === "avatar" ? "Аватар" : "Фон"} обновлен`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: `Не удалось загрузить ${
          type === "avatar" ? "аватар" : "фон"
        }`,
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file, "avatar");
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file, "background");
  };

  const onSubmit = (values: UpdateUserValues) => {
    const dataToUpdate: Partial<UpdateUserValues> = {};

    if (values.name && values.name !== user?.name) {
      dataToUpdate.name = values.name;
    }

    if (values.password) {
      dataToUpdate.password = values.password;
    }

    if (Object.keys(dataToUpdate).length > 0) {
      updateUser.mutate(dataToUpdate);
    }
  };

  if (!token) {
    router.push("/auth?mode=sign-in");
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <ErrorMessage
          title="Ошибка загрузки профиля"
          message="Не удалось загрузить информацию о пользователе"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 relative">
          {backgroundFile ? (
            <Image
              src={URL.createObjectURL(backgroundFile)}
              alt="Background"
              fill
              className="object-cover"
            />
          ) : user.background ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/users/backgrounds/${user.background}`}
              alt="Background"
              fill
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 right-4">
            <Label
              htmlFor="background"
              className="cursor-pointer bg-background/80 hover:bg-background p-2 rounded-full"
            >
              <Upload className="h-5 w-5" />
            </Label>
            <Input
              id="background"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBackgroundChange}
            />
          </div>
        </div>
        <div className="p-6 -mt-16">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-4 border-background overflow-hidden bg-primary/10">
                {avatarFile ? (
                  <Image
                    src={URL.createObjectURL(avatarFile)}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : user.avatar ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/static/users/avatars/${user.avatar}`}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User2 className="h-12 w-12 text-primary" />
                  </div>
                )}
              </div>
              <Label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 cursor-pointer bg-background/80 hover:bg-background p-2 rounded-full"
              >
                <Upload className="h-5 w-5" />
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
      </Card>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.login}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                Email нельзя изменить
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Введите ваше имя"
                defaultValue={user.name}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Изменение пароля</h3>

            <div className="space-y-2">
              <Label htmlFor="password">Новый пароль</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder="Введите новый пароль"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={updateUser.isPending}
          >
            <Save className="mr-2 h-5 w-5" />
            Сохранить изменения
          </Button>
        </div>
      </form>
    </div>
  );
}
