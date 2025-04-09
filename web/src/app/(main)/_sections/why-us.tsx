import {
  Shield,
  UserCheck,
  Truck,
  CreditCard,
  MessageSquare,
  Clock,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";

const features = [
  {
    icon: Shield,
    title: "Безопасные сделки",
    description: "Гарантия безопасности платежей и доставки товаров",
  },
  {
    icon: UserCheck,
    title: "Проверенные продавцы",
    description: "Все продавцы проходят верификацию",
  },
  {
    icon: Truck,
    title: "Удобная доставка",
    description: "Быстрая доставка в любую точку страны",
  },
  {
    icon: CreditCard,
    title: "Выгодные условия",
    description: "Низкая комиссия и бонусы для постоянных клиентов",
  },
  {
    icon: MessageSquare,
    title: "Поддержка 24/7",
    description: "Всегда готовы помочь с любыми вопросами",
  },
  {
    icon: Clock,
    title: "Быстрые сделки",
    description: "Простой и быстрый процесс покупки и продажи",
  },
];

export default function WhyUs() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Почему выбирают нас"
        description="Создаем лучшие условия для покупателей и продавцов"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
