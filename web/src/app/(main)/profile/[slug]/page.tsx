"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function ProfilePage() {
  const { authenticatedUser, logout } = useAuthStore();

  return <div>

  </div>
}