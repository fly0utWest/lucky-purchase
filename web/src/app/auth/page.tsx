"use client";
import { useEffect } from "react";

import { AuthForm } from "@/components/auth-form";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { authenticatedUser } = useAuthStore();

  useEffect(() => {
    if (authenticatedUser) {
      router.push("/");
    }
  }, [router, authenticatedUser]);

  return (
      <section className="w-full h-full flex items-center justify-center">
        <Suspense>
          <AuthForm />
        </Suspense>
      </section>
  );
}
