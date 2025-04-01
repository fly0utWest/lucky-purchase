"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

interface ToasterProps {
  toasts: Array<{
    id: number;
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
  }>;
  setToasts: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: number;
        title?: string;
        description?: string;
        variant?: "default" | "destructive";
      }>
    >
  >;
}

export function Toaster({ toasts, setToasts }: ToasterProps) {
  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
