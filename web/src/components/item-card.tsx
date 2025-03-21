import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Item } from "@/shared/models";
import { env } from "@/env.mjs";

interface ProductCardProps {
  item: Item;
}

const ItemCard: React.FC<ProductCardProps> = ({
  item: { title, description, price, images },
}) => {
  return (
    <Card className="w-80 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <Image
          src={`${env.NEXT_PUBLIC_STATIC_URL}/items/${images[0]}`}
          alt={images[0]}
          width={100}
          height={100}
          className="w-full h-48 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="text-gray-600 font-bold text-sm mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold">{price}</span>
          <Button>Добавить в корзину</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
