import { Phone, Mail, MapPin, Clock, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
              <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
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
              <p className="text-muted-foreground">support@example.com</p>
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
              <p className="text-muted-foreground">
                г. Москва, ул. Примерная, д. 123
              </p>
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
              <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR-код
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src="https://genqrcode.com/embedded?style=14&inner_eye_style=0&outer_eye_style=0&logo=null&color=%23000000FF&background_color=%23FFFFFFFF&inner_eye_color=%23000000&outer_eye_color=%23000000&imageformat=svg&language=en&frame_style=0&frame_text=SCAN%20ME&frame_color=%23000000&invert_colors=false&gradient_style=1&gradient_color_start=%23b80000&gradient_color_end=%23000000&gradient_start_offset=5&gradient_end_offset=95&stl_type=1&logo_remove_background=null&stl_size=100&stl_qr_height=1.5&stl_base_height=2&stl_include_stands=false&stl_qr_magnet_type=3&stl_qr_magnet_count=0&type=0&text=https%3A%2F%2Fpsv4.userapi.com%2Fs%2Fv1%2Fd%2FrNn7tCO6RKi3PzVGN6MYIsKkvFdHVuh5BPUNXgiiQHr3DpCwONukVnTFP7xB7RajsZPj-4BjBMjZIfLQzDvJdN9T4AZfuhknInYYpucvSH92DpNDkn-SJA%2Fimages.jpg&width=500&height=500&bordersize=2"
                alt="QR-код"
                width={150}
                height={150}
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Форма обратной связи */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Форма обратной связи</h2>
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input id="name" placeholder="Введите ваше имя" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Textarea id="message" placeholder="Введите ваше сообщение" />
              </div>

              <Button type="submit" className="w-full">
                Отправить сообщение
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Часто задаваемые вопросы
        </h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Как сделать заказ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Для оформления заказа добавьте товары в корзину и перейдите к
                оформлению заказа. Следуйте инструкциям на экране для завершения
                покупки.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Какие способы оплаты доступны?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Мы принимаем оплату банковскими картами, электронными кошельками
                и наличными при получении.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Как вернуть товар?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Для возврата товара свяжитесь с нашей службой поддержки в
                течение 14 дней с момента получения.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
