import Link from "next/link";
import {
  Smartphone,
  Car,
  Home,
  Shirt,
  Laptop,
  Baby,
  Dumbbell,
  BookOpen,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const categories = [
  {
    icon: Smartphone,
    name: "Электроника",
    description: "Телефоны, планшеты и гаджеты",
    color: "text-[hsl(var(--chart-1))]",
  },
  {
    icon: Car,
    name: "Транспорт",
    description: "Автомобили и запчасти",
    color: "text-[hsl(var(--chart-2))]",
  },
  {
    icon: Home,
    name: "Для дома",
    description: "Мебель и интерьер",
    color: "text-[hsl(var(--chart-3))]",
  },
  {
    icon: Shirt,
    name: "Одежда",
    description: "Мужская и женская одежда",
    color: "text-[hsl(var(--chart-4))]",
  },
  {
    icon: Laptop,
    name: "Компьютеры",
    description: "Ноутбуки и комплектующие",
    color: "text-[hsl(var(--chart-5))]",
  },
  {
    icon: Baby,
    name: "Детские товары",
    description: "Игрушки и детская одежда",
    color: "text-[hsl(var(--chart-1))]",
  },
  {
    icon: Dumbbell,
    name: "Спорт",
    description: "Спортивные товары",
    color: "text-[hsl(var(--chart-2))]",
  },
  {
    icon: BookOpen,
    name: "Хобби",
    description: "Книги, музыка и развлечения",
    color: "text-[hsl(var(--chart-3))]",
  },
];

export default function Categories() {
  return (
    <section className="bg-muted/30 py-12 rounded-xl">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Популярные категории"
          description="Выберите категорию и найдите нужные товары"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="animate-in fade-in slide-in-from-bottom-4 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/catalog?category=${category.name}`}
                className="group block space-y-2 rounded-xl bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10`}
                >
                  <category.icon
                    className={`h-6 w-6 ${category.color} transition-transform group-hover:scale-110`}
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
