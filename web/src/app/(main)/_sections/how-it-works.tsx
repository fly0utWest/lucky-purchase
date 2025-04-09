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
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Для покупателей</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-primary" />
                  <span>Удобный поиск по категориям и фильтрам</span>
                </li>
                <li className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>Сохранение понравившихся товаров</span>
                </li>
                <li className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary" />
                  <span>Уведомления о новых поступлениях</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Система рейтингов и отзывов</span>
                </li>
              </ul>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Для продавцов</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Быстрое размещение объявлений</span>
                </li>
                <li className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Управление товарами и ценами</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Статистика и аналитика продаж</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Повышение рейтинга магазина</span>
                </li>
              </ul>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border rounded-lg overflow-hidden bg-background"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">Поиск и выбор товара</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Используйте расширенный поиск с фильтрами по цене, категории
                    и местоположению
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Просматривайте детальные фотографии и описания товаров
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Сохраняйте понравившиеся товары в избранное для быстрого
                    доступа
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Получайте уведомления о снижении цен на сохраненные товары
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border rounded-lg overflow-hidden bg-background"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">Общение с продавцом</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Встроенный чат для быстрой коммуникации с продавцом
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Возможность задать вопросы о товаре и получить быстрый ответ
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Обсуждение деталей доставки и способов оплаты
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    История переписки сохраняется для удобства
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border rounded-lg overflow-hidden bg-background"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">Доставка и получение</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Выбор удобного способа доставки
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Отслеживание статуса доставки в реальном времени
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Возможность самовывоза из пунктов выдачи
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Безопасное получение товара с проверкой
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border rounded-lg overflow-hidden bg-background"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">Оплата и безопасность</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Безопасная оплата через защищенное соединение
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Возможность оплаты при получении
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Защита от мошенничества и недобросовестных продавцов
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Возврат средств при возникновении проблем
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border rounded-lg overflow-hidden bg-background"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">Управление профилем</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Личный кабинет с историей покупок и продаж
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Настройка уведомлений и предпочтений
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Управление избранными товарами и списками
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Настройка безопасности и приватности
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border rounded-lg overflow-hidden bg-background"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">Поддержка и помощь</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Круглосуточная поддержка пользователей
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Помощь в разрешении спорных ситуаций
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    FAQ и обучающие материалы
                  </p>
                  <p className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-primary" />
                    Обратная связь и предложения по улучшению
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
