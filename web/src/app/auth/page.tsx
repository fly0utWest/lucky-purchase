"use client";
import { useEffect } from "react";

import { AuthForm } from "@/components/auth-form";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm />
      </div>
    </div>
  );
}
