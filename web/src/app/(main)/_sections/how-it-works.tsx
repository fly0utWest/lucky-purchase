import React from "react";
import {
  Search,
  User,
  ChevronDown,
  Package,
  Star,
  Heart,
  Settings,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const buyerFeatures = [
  { icon: Search, text: "Удобный поиск по категориям и фильтрам" },
  { icon: Heart, text: "Сохранение понравившихся товаров" },
];

const sellerFeatures = [
  { icon: Package, text: "Быстрое размещение объявлений" },
  { icon: Settings, text: "Управление товарами и ценами" },
];

const accordionItems = [
  {
    id: "item-1",
    icon: Search,
    title: "Поиск и выбор товара",
    items: [
      "Используйте расширенный поиск с фильтрами по цене, категории и местоположению",
      "Просматривайте детальные фотографии и описания товаров",
      "Сохраняйте понравившиеся товары в избранное для быстрого доступа",
    ],
  },
  {
    id: "item-2",
    icon: Package,
    title: "Размещение объявлений",
    items: [
      "Создавайте подробные описания ваших товаров",
      "Загружайте качественные фотографии",
      "Устанавливайте справедливые цены",
      "Управляйте своими объявлениями в личном кабинете",
    ],
  },
  {
    id: "item-3",
    icon: User,
    title: "Управление профилем",
    items: [
      "Личный кабинет с историей объявлений",
      "Настройка профиля и загрузка аватара",
      "Управление избранными товарами",
      "Просмотр статистики ваших объявлений",
    ],
  },
  {
    id: "item-4",
    icon: HelpCircle,
    title: "Поддержка и помощь",
    items: [
      "Подробные инструкции по использованию платформы",
      "FAQ с ответами на популярные вопросы",
      "Советы по безопасным сделкам",
      "Рекомендации по созданию качественных объявлений",
    ],
  },
];

const FeatureCard = ({
  title,
  features,
}: {
  title: string;
  features: typeof buyerFeatures;
}) => (
  <div className="bg-background p-6 rounded-lg shadow-sm">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <ul className="space-y-3">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <li key={index} className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-primary" />
            <span>{feature.text}</span>
          </li>
        );
      })}
    </ul>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="how-it-works" className="text-3xl font-bold mb-4 ">
              Как работает наш маркетплейс
            </h2>
            <p className="text-muted-foreground text-lg">
              Платформа для безопасных и удобных покупок и продаж
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <FeatureCard title="Для покупателей" features={buyerFeatures} />
            <FeatureCard title="Для продавцов" features={sellerFeatures} />
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {accordionItems.map((item) => {
              const Icon = item.icon;
              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border rounded-lg overflow-hidden bg-background"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-3 text-muted-foreground">
                      {item.items.map((text, index) => (
                        <p key={index} className="flex items-center gap-2">
                          <ChevronDown className="w-4 h-4 text-primary" />
                          {text}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

