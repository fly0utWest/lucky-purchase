// components/FavoriteToggle.tsx
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";

interface FavoriteToggleProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  };
}

export const FavoriteToggle = ({ product }: FavoriteToggleProps) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  // Проверяем, добавлен ли товар в избранное
  const isFavorite = favorites.some((item) => item.id === product.id);

  // Обработчик переключения состояния
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="p-2 rounded-full hover:bg-muted/50 transition-colors"
      aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    >
      {isFavorite ? (
        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
      ) : (
        <Heart className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
};