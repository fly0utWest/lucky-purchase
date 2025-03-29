"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/item-card"; // Подключаем карточку товара
import { Button } from "@/components/ui/button";
import { Item } from "@/shared/models";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Item[]>([]);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(savedFavorites);
    } catch (error) {
      console.error("Ошибка загрузки избранного:", error);
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-6 min-h-svh">
      <h1 className="text-3xl font-bold mb-4">Избранное</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">Избранных товаров не найдено.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard item={item} />
              <Button
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                onClick={() => removeFavorite(item.id)}
              >
                ❌ Удалить
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
