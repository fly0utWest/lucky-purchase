import { Phone, Mail, MapPin, Clock, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function ContactsSupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Контакты и Поддержка
      </h1>

      {/* Контактная информация */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Как с нами связаться</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Телефон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Скоро будет доступен</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Скоро будет доступен</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Адрес
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Онлайн-платформа</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Часы работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Круглосуточно</p>

              
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Часто задаваемые вопросы
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Как разместить объявление?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Зарегистрируйтесь на платформе, войдите в свой аккаунт и нажмите
                кнопку "Разместить объявление". Заполните все необходимые поля и
                загрузите фотографии товара.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Как найти нужный товар?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Используйте поиск по названию товара или выберите нужную
                категорию в каталоге. Вы также можете применить фильтры по цене
                для более точного поиска.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Как добавить товар в избранное?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                На странице товара нажмите кнопку с иконкой сердца "В
                избранное". Все избранные товары будут доступны в вашем профиле.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
