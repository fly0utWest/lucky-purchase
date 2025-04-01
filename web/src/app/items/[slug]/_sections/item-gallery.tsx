import { useState } from "react";
import { Card } from "@/components/ui/card";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ItemGalleryProps {
  images: string[];
  title: string;
}

export function ItemGallery({ images, title }: ItemGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-4 p-4 sm:grid-cols-[2fr,1fr]">
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            width={300}
            height={300}
            src={`${env.NEXT_PUBLIC_STATIC_URL}/items/${images[currentImage]}`}
            alt={`${title} - Основное изображение`}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg bg-gray-100",
                index === currentImage && "ring-2 ring-primary ring-offset-2"
              )}
            >
              <Image
                width={300}
                height={300}
                src={`${env.NEXT_PUBLIC_STATIC_URL}/items/${image}`}
                alt={`${title} - Дополнительное изображение ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnail row for more than 4 images */}
      {images.length > 4 && (
        <div className="flex overflow-auto p-4 gap-2 scrollbar-thin">
          {images.slice(4).map((image, index) => (
            <button
              key={index + 4}
              onClick={() => setCurrentImage(index + 4)}
              className={cn(
                "relative min-w-16 h-16 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0",
                index + 4 === currentImage &&
                  "ring-2 ring-primary ring-offset-2"
              )}
            >
              <Image
                width={300}
                height={300}
                src={`${env.NEXT_PUBLIC_STATIC_URL}/items/${image}`}
                alt={`${title} - Дополнительное изображение ${index + 5}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
