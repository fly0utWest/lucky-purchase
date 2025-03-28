"use client";
import { useEffect } from "react";

import { AuthForm } from "@/components/auth-form";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const { authenticatedUser } = useAuthStore();

  useEffect(() => {
    if (authenticatedUser) {
      router.push("/");
    }
  }, [router, authenticatedUser]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AuthForm />
      </div>
    </div>
  );
}
