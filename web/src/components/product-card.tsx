import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/shared/models";

interface ProductCardProps {
 product: Product 
}

const ProductCard: React.FC< ProductCardProps > = ({ product: { name, description, price, image }}) => {
  return (
    <Card className="w-80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <Image
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-blue-600">
            ${price}
          </span>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Добавить в корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;