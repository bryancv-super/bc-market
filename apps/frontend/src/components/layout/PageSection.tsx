import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: ReactNode;
  className?: string;
}

export function PageSection({
  children,
  className,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        `
          flex
          flex-col
          gap-4
          px-4
          py-4
        `,
        className
      )}
    >
      {children}
    </section>
  );
}