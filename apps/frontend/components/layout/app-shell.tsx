import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AppShellProps = {
  children: ReactNode;
  className?: string;
};

export function AppShell({ children, className }: AppShellProps) {
  return <main className={cn("mobile-shell px-8 py-10", className)}>{children}</main>;
}
