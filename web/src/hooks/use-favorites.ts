// hooks/useFavorites.ts
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Загрузка избранных товаров из localStorage при монтировании
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Добавление товара в избранное
  const addToFavorites = (product: Product) => {
    const updatedFavorites = [...favorites, product];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Удаление товара из избранного
  const removeFromFavorites = (productId: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, addToFavorites, removeFromFavorites };
};