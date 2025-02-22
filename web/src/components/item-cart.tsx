import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Добавить в корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Пример использования компонента
const sampleProduct = {
  name: "Беспроводные наушники",
  description:
    "Стильные и удобные наушники с шумоподавлением и длительной автономностью.",
  price: "129.99",
  image: "https://via.placeholder.com/300", // Замените на URL реального изображения
};

export default function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <ProductCard product={sampleProduct} />
    </div>
  );
}
