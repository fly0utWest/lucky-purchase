import React from "react";
import { Shield, Star, Search, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

const features = [
  {
    title: "Удобный поиск",
    description: "Быстрый поиск товаров с фильтрами по категориям и ценам",
    icon: Search,
  },
  {
    title: "Качественные объявления",
    description: "Подробные описания и качественные фотографии товаров",
    icon: Star,
  },
  {
    title: "Проверенные пользователи",
    description: "Система регистрации и профилей пользователей",
    icon: Users,
  },
  {
    title: "Безопасная платформа",
    description: "Защищенная платформа для размещения объявлений",
    icon: Shield,
  },
];

export default function WhyUs() {
  return (
    <section className="bg-muted/30 py-12 rounded-xl">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Почему выбирают нас"
          description="Создаем лучшие условия для покупателей и продавцов"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
