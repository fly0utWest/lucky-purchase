import * as React from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback(
    ({ title, description, variant = "default" }: ToastProps) => {
      setToasts((prev) => [...prev, { title, description, variant }]);
    },
    []
  );

  return {
    toast,
    toasts,
    setToasts,
  };
}
