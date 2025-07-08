"use client";

import * as React from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export type ToastActionElement = React.ReactElement;

export const ToastContext = React.createContext<{
  toast: (props: ToastProps & { title?: string; description?: string }) => void;
}>({
  toast: () => {},
});

export function ToastContainer() {
  const [toasts, setToasts] = React.useState<
    Array<ToastProps & { id: string; title?: string; description?: string }>
  >([]);

  const toast = React.useCallback(
    ({
      title,
      description,
      ...props
    }: ToastProps & { title?: string; description?: string }) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, ...props }]);
      return id;
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {toasts.map(({ id, title, description, ...props }) => (
          <Toast
            key={id}
            {...props}
            onOpenChange={(open) => !open && removeToast(id)}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
