import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { AuthenticatedUser } from "@/shared/models";
import { useToast } from "@/shared/providers/toast-provider";
import { UpdateUserValues } from "@/shared/models";
import { useRouter } from "next/navigation";

export const useSettings = () => {
  const { token, setAuthenticatedUser, authenticatedUser } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: uploadAvatar, isPending: isAvatarUploading } = useMutation({
    mutationFn: async (file: File) => {
      if (!token) {
        throw new Error("Пользователь не авторизован!");
      }

      const formData = new FormData();
      formData.append("avatar", file);

      return fetchWrapper<AuthenticatedUser>("/user/update/avatar", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
    },
    onSuccess: (data) => {
      setAuthenticatedUser(data);
      toast({ title: "Успех!", description: "Аватар был успешно обновлён!" });
    },
    onError: (error) => {
      toast({
        title: "Ошибка!",
        description:
          error instanceof Error ? error.message : "Аватар не был обновлён!",
        variant: "destructive",
      });
    },
  });

  const { mutate: uploadBackground, isPending: isBackgroundUploading } =
    useMutation({
      mutationFn: async (file: File) => {
        if (!token) {
          throw new Error("Пользователь не авторизован!");
        }

        const formData = new FormData();
        formData.append("background", file);

        return fetchWrapper<AuthenticatedUser>("/user/update/background", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      },
      onSuccess: (data) => {
        setAuthenticatedUser(data);
        toast({
          title: "Успех!",
          description: "Фон профиля был успешно обновлён!",
        });
      },
      onError: (error) => {
        toast({
          title: "Ошибка!",
          description:
            error instanceof Error
              ? error.message
              : "Фон профиля не был обновлён!",
          variant: "destructive",
        });
      },
    });

  const { mutate: changeUserValues, isPending: isUserUpdating } = useMutation({
    mutationFn: async (values: UpdateUserValues) => {
      if (!token) throw new Error("Необходима авторизация");
      return fetchWrapper<AuthenticatedUser>("user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    onSuccess: (data) => {
      setAuthenticatedUser(data);
      toast({
        title: "Успешно",
        description: "Данные пользователя обновлены",
      });

      router.push(`/profile/${authenticatedUser?.id}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description:
          error instanceof Error
            ? error.message
            : "Не удалось обновить данные пользователя",
      });
    },
  });

  return {
    uploadAvatar,
    uploadBackground,
    changeUserValues,
    isUserUpdating,
    isAvatarUploading,
    isBackgroundUploading,
    isLoading: isUserUpdating || isAvatarUploading || isBackgroundUploading,
  };
};
