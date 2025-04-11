import React from "react";
import {
  Search,
  MessageCircle,
  CreditCard,
  User,
  Shield,
  ChevronDown,
  Package,
  Star,
  Truck,
  Heart,
  Bell,
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
  { icon: Bell, text: "Уведомления о новых поступлениях" },
  { icon: Star, text: "Система рейтингов и отзывов" },
];

const sellerFeatures = [
  { icon: Package, text: "Быстрое размещение объявлений" },
  { icon: Settings, text: "Управление товарами и ценами" },
  { icon: FileText, text: "Статистика и аналитика продаж" },
  { icon: Star, text: "Повышение рейтинга магазина" },
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
      "Получайте уведомления о снижении цен на сохраненные товары",
    ],
  },
  {
    id: "item-2",
    icon: MessageCircle,
    title: "Общение с продавцом",
    items: [
      "Встроенный чат для быстрой коммуникации с продавцом",
      "Возможность задать вопросы о товаре и получить быстрый ответ",
      "Обсуждение деталей доставки и способов оплаты",
      "История переписки сохраняется для удобства",
    ],
  },
  {
    id: "item-3",
    icon: Truck,
    title: "Доставка и получение",
    items: [
      "Выбор удобного способа доставки",
      "Отслеживание статуса доставки в реальном времени",
      "Возможность самовывоза из пунктов выдачи",
      "Безопасное получение товара с проверкой",
    ],
  },
  {
    id: "item-4",
    icon: CreditCard,
    title: "Оплата и безопасность",
    items: [
      "Безопасная оплата через защищенное соединение",
      "Возможность оплаты при получении",
      "Защита от мошенничества и недобросовестных продавцов",
      "Возврат средств при возникновении проблем",
    ],
  },
  {
    id: "item-5",
    icon: User,
    title: "Управление профилем",
    items: [
      "Личный кабинет с историей покупок и продаж",
      "Настройка уведомлений и предпочтений",
      "Управление избранными товарами и списками",
      "Настройка безопасности и приватности",
    ],
  },
  {
    id: "item-6",
    icon: HelpCircle,
    title: "Поддержка и помощь",
    items: [
      "Круглосуточная поддержка пользователей",
      "Помощь в разрешении спорных ситуаций",
      "FAQ и обучающие материалы",
      "Обратная связь и предложения по улучшению",
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
            <h2 className="text-3xl font-bold mb-4">
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
