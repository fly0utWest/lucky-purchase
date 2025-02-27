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
        <p className="text-gray-600 font-bold text-sm mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">
            ${price}
          </span>
          <Button >
            Добавить в корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;