import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export function MobileContainer({
  children,
  className,
}: MobileContainerProps) {
  return (
    <main
      className={cn(
        `
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-md
          flex-col
          bg-background
        `,
        className
      )}
    >
      {children}
    </main>
  );
}