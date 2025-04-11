import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Shield,
  User,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-center gap-3 mb-12">
        <FileText className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Условия использования
        </h1>
      </div>

      <div className="space-y-6">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">1. Общие положения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Настоящие условия использования (далее - &quot;Условия&quot;)
                регулируют отношения между пользователями и сервисом.
              </p>
              <ul className="space-y-2 list-disc pl-4">
                <li>Регистрация на платформе доступна лицам старше 18 лет</li>
                <li>
                  Пользователь обязан предоставлять достоверную информацию
                </li>
                <li>Запрещено создавать несколько аккаунтов</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">2. Использование сервиса</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Используя наш сервис, вы соглашаетесь с настоящими Условиями и
                обязуетесь их соблюдать.
              </p>
              <ul className="space-y-2 list-disc pl-4">
                <li>
                  Размещение объявлений должно соответствовать правилам
                  платформы
                </li>
                <li>Запрещено размещение запрещенных товаров и услуг</li>
                <li>
                  Обязательно указывать актуальные цены и описание товаров
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">3. Конфиденциальность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Мы обязуемся защищать вашу конфиденциальность и персональные
                данные в соответствии с действующим законодательством.
              </p>
              <ul className="space-y-2 list-disc pl-4">
                <li>Ваши данные защищены современными методами шифрования</li>
                <li>
                  Мы не передаем ваши данные третьим лицам без вашего согласия
                </li>
                <li>
                  Вы можете запросить удаление ваших данных в любой момент
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">4. Ответственность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Сервис предоставляется &quot;как есть&quot;. Мы не несем
                ответственности за возможные убытки, связанные с использованием
                сервиса.
              </p>
              <ul className="space-y-2 list-disc pl-4">
                <li>
                  Платформа не несет ответственности за сделки между
                  пользователями
                </li>
                <li>
                  Рекомендуется проверять достоверность информации о товарах
                </li>
                <li>
                  При возникновении споров рекомендуем обращаться в службу
                  поддержки
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
