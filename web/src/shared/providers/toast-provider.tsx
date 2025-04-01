"use client";

import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";

type ToastContextType = {
  toast: (props: {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }>
  >([]);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "default",
    }: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, title, description, variant }]);
    },
    []
  );

  useEffect(() => {
    const timeouts = toasts.map((toast) => {
      return setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toaster toasts={toasts} setToasts={setToasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
