import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 p-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center gap-4 ">
        {/* Логотип */}
        <div className="w-full mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <Link href="/" className="text-lg font-bold">
            Удачная покупка
          </Link>

          {/* Социальные сети */}
          <div className="flex gap-4 ">
            <Button variant="link" asChild>
              <Link href="#">
                {" "}
                <Twitter /> Twitter
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#">
                {" "}
                <Facebook /> Facebook
              </Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="#">
                {" "}
                <Instagram /> Instagram
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <nav className="flex justify-center w-full gap-6">
        <Link href="/about" className="hover:underline">
          О нас
        </Link>
        <Link href="/contact" className="hover:underline">
          Контакты
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
    </footer>
  );
}
