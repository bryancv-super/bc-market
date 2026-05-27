import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className,
  ...props
}: Props) {
  return (
    <input
      className={cn(
        `
          w-full
          rounded-lg
          border
          border-slate-100
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          transition-colors
          placeholder:text-slate-500
          focus:border-green-600
        `,
        className
      )}
      {...props}
    />
  );
}