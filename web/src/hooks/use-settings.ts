import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/providers/toast-provider";
import { useAuthStore } from "@/store/authStore";
import { fetchWrapper } from "@/lib/utils";
import { UpdateUserValues } from "@/shared/models";


export function useSettings() {
  const { toast } = useToast();
  const { authenticatedUser, token } = useAuthStore();

  const updateUser = useMutation({
    mutationFn: async (values: UpdateUserValues) => {
      if (!authenticatedUser || !token) {
        throw new Error("Пользователь не авторизован");
      }
      const response = await fetchWrapper(`user/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Успешно",
        description: "Данные пользователя успешно обновлены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные пользователя",
      });
    },
  });

  return { updateUser };
}  


