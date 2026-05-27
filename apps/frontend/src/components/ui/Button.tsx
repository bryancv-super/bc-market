import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        `
          flex
          items-center
          justify-center
          rounded-lg
          px-4
          py-3
          text-sm
          font-medium
          transition-colors
          disabled:opacity-50
        `,
        variant === "primary" &&
          `
            bg-green-600
            text-white
            hover:bg-green-700
          `,

        variant === "secondary" &&
          `
            bg-slate-100
            text-slate-950
          `,

        variant === "destructive" &&
          `
            bg-red-500
            text-white
          `,

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}