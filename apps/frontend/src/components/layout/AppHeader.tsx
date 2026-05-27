import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  className?: string;
}

export function AppHeader({
  title,
  subtitle,
  leftSlot,
  rightSlot,
  sticky = true,
  bordered = true,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        `
          w-full
          bg-background
        `,
        sticky &&
          `
            sticky
            top-0
            z-40
          `,

        bordered &&
          `
            border-b
            border-border
          `,

        className
      )}
    >
      <div
        className="
          flex
          min-h-16
          items-center
          justify-between
          gap-3
          px-4
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
          "
        >
          {leftSlot}

          {(title || subtitle) && (
            <div
              className="
                flex
                min-w-0
                flex-col
              "
            >
              {title && (
                <h1
                  className="
                    truncate
                    text-base
                    font-semibold
                    text-foreground
                  "
                >
                  {title}
                </h1>
              )}

              {subtitle && (
                <p
                  className="
                    truncate
                    text-sm
                    text-muted-foreground
                  "
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {rightSlot && (
          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
            "
          >
            {rightSlot}
          </div>
        )}
      </div>
    </header>
  );
}