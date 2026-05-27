import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function Card({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        `
          rounded-xl
          bg-white
          p-4
          shadow-sm
        `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}