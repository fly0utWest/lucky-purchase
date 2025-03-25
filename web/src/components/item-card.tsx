import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Item } from "@/shared/models";
import { env } from "@/env.mjs";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductCardProps {
  item: Item;
  variant?: "default" | "compact";
}

const ItemCard: React.FC<ProductCardProps> = ({
  item: { id, title, description, price, images, createdAt },
  variant = "default",
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  return (
    <Card className="group overflow-hidden rounded-lg transition-all duration-200 hover:shadow-lg">
      <div
        className={cn(
          "flex",
          variant === "compact" ? "flex-row gap-4" : "flex-col"
        )}
      >
        <div className="relative">
          <div
            className={cn(
              "relative",
              variant === "default" && "aspect-[4/3]",
              variant === "compact" ? "w-[160px] aspect-square" : "w-full"
            )}
          >
            <Image
              src={`${env.NEXT_PUBLIC_STATIC_URL}/items/${images[0]}`}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <button
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-all hover:bg-white"
            onClick={() => console.log("Добавить в избранное", id)}
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div
          className={cn(
            "flex flex-col",
            variant === "compact" ? "py-2 pr-3" : "p-3",
            "flex-1"
          )}
        >
          <div className="flex-1 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={cn(
                  "font-medium leading-tight",
                  variant === "compact" ? "text-base" : "text-lg"
                )}
              >
                {title}
              </h3>
              <span className="whitespace-nowrap font-semibold text-primary">
                {formatPrice(price)}
              </span>
            </div>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
            <Button
              variant="default"
              size="sm"
              className="ml-auto font-medium"
              asChild
            >
              <Link href={`/items/${id}`}>
                Подробнее
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
