"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function ProfilePage() {
  const {slug} = useParams();  
  
  const { authenticatedUser, logout } = useAuthStore();

  return <>
  
  </>
}