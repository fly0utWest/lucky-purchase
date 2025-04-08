import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { fetchWrapper } from "@/lib/utils";
import { AuthenticatedUser } from "@/shared/models";
import { useToast } from "@/shared/providers/toast-provider";
import { UpdateUserValues } from "@/shared/models";

export const useSettings = () => {
  const { token, setAuthenticatedUser } = useAuthStore();
  const { toast } = useToast();

  const { mutate: uploadAvatar } = useMutation({
    mutationFn: async (file: File) => {
      if (!token) {
        throw new Error("Пользователь не авторизован!");
      }

      return fetchWrapper<AuthenticatedUser>("/user/update/avatar", {
        headers: { Authorization: `Bearer ${token}` },
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

  const { mutate: changeUserValues, isPending: isUserUpdating } = useMutation({
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

  return { uploadAvatar, isUserUpdating };
};
