import React from "react";
import { Search, MessageCircle, CreditCard } from "lucide-react";

const HowItWorks = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mt-6">Как это работает?</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-xl bg-muted/50 text-center flex flex-col items-center">
          <Search className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-semibold mt-2">Найдите товар</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Используйте поиск и фильтры для удобного выбора.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center flex flex-col items-center">
          <MessageCircle className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-semibold mt-2">Свяжитесь с продавцом</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Задайте вопросы и уточните детали.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center flex flex-col items-center">
          <CreditCard className="w-8 h-8 text-primary" />
          <h3 className="text-lg font-semibold mt-2">Совершите сделку</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Договоритесь о покупке и получите товар.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
