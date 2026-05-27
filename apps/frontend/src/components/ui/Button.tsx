import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "icon";
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
          inline-flex
          items-center
          justify-center
          rounded-lg
          text-sm
          font-medium
          transition-colors
          disabled:pointer-events-none
          disabled:opacity-50
        `,

        variant === "primary" &&
          `
            bg-green-600
            px-4
            py-3
            text-white
            hover:bg-green-700
          `,

        variant === "secondary" &&
          `
            bg-slate-100
            px-4
            py-3
            text-slate-950
            hover:bg-slate-200
          `,

        variant === "destructive" &&
          `
            bg-red-500
            px-4
            py-3
            text-white
            hover:bg-red-600
          `,

        variant === "ghost" &&
          `
            text-slate-700
            hover:bg-slate-100
            hover:text-slate-950
          `,

        variant === "icon" &&
          `
            h-10
            w-10
            p-0
          `,

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}