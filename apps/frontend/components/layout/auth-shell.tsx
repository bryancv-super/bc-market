import { ReactNode } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { AppShell } from "@/components/layout/app-shell";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <AppShell className="bg-surface px-8">
      <div className="pt-8">
        <BrandLogo />
      </div>
      <section className="mt-16 text-center">
        <h1 className="text-xl font-bold text-text-primary">{title}</h1>
        <p className="mx-auto mt-3 max-w-[260px] text-sm text-text-secondary">{subtitle}</p>
      </section>
      <div className="mt-8">{children}</div>
    </AppShell>
  );
}
