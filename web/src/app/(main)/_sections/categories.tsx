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
import { motion } from "framer-motion";

const categories = [
  {
    icon: Smartphone,
    name: "Электроника",
    description: "Телефоны, планшеты и гаджеты",
    color: "text-blue-500",
  },
  {
    icon: Car,
    name: "Транспорт",
    description: "Автомобили и запчасти",
    color: "text-red-500",
  },
  {
    icon: Home,
    name: "Для дома",
    description: "Мебель и интерьер",
    color: "text-green-500",
  },
  {
    icon: Shirt,
    name: "Одежда",
    description: "Мужская и женская одежда",
    color: "text-purple-500",
  },
  {
    icon: Laptop,
    name: "Компьютеры",
    description: "Ноутбуки и комплектующие",
    color: "text-yellow-500",
  },
  {
    icon: Baby,
    name: "Детские товары",
    description: "Игрушки и детская одежда",
    color: "text-pink-500",
  },
  {
    icon: Dumbbell,
    name: "Спорт",
    description: "Спортивные товары",
    color: "text-orange-500",
  },
  {
    icon: BookOpen,
    name: "Хобби",
    description: "Книги, музыка и развлечения",
    color: "text-teal-500",
  },
];

export default function Categories() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Популярные категории"
        description="Выберите категорию и найдите нужные товары"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
