import Link from "next/link";
import { Users, Phone,  } from "lucide-react";
import {
  Send as TelegramIcon,
  PersonStanding as OkIcon,
} from "lucide-react";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 p-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center gap-4 ">
        <div className="w-full mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <Link href="/" className="text-lg font-bold">
            <Logo />
          </Link>

          {/* Социальные сети */}
          <div className="flex flex-col gap-4 items-center md:flex-row *:text-ring *:flex *:flex-row *:gap-2">
            <Link
              href="https://vk.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Users className="h-5 w-5" />{" "}
              <span className="md:hidden">ВКонтакте</span>
            </Link>
            <Link href="https://t.me" target="_blank" rel="noopener noreferrer">
            
              <TelegramIcon className="h-5 w-5" />{" "}
              <span className="md:hidden">Telegram</span>
            </Link>
            <Link
              href="https://ok.ru"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OkIcon className="h-6 w-6" />{" "}
              <span className="md:hidden">Одноклассники</span>
            </Link>
            <Link
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="h-5 w-5" />{" "}
              <span className="md:hidden">WhatsApp</span>
            </Link>
          </div>
        </div>
        <div>
          <nav className="flex justify-center w-full gap-6">
            <Link href="/about" className="hover:underline">
              О нас
            </Link>
            <Link href="/contacts-support" className="hover:underline">
              Контакты и Поддержка
            </Link>
            <Link href="/terms" className="hover:underline">
              Условия
            </Link>
          </nav>{" "}
          {/* Навигация */}
          {/* Копирайт */}
          <p className="mt-4 text-xs">
            &copy; 2025 Удачная покупка. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
