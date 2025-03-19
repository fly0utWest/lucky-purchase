'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <AlertTriangle className="w-16 h-16 text-destructive" />
      <h1 className="text-4xl font-bold mt-4">404 - Не найдено</h1>
      <p className="mt-2">
      Страница не найдена
      </p>
      <Button className="mt-6" onClick={() => router.push("/")}>
        Домой
      </Button>
    </div>
  );
}
