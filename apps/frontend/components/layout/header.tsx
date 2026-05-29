import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/cn";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  showBrand?: boolean;
  showAvatar?: boolean;
  className?: string;
};

export function Header({
  title,
  subtitle,
  backHref,
  showBrand = false,
  showAvatar = false,
  className,
}: HeaderProps) {
  const isAppNav = showBrand || showAvatar;

  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4",
        isAppNav && "sticky top-0 z-40 -mx-8 bg-surface-muted px-8 py-3",
        className,
      )}
    >
      {showBrand ? (
        <Link aria-label="Ir al inicio" href="/home">
          <BrandLogo />
        </Link>
      ) : null}
      {backHref ? (
        <Link className="inline-flex items-center gap-2 text-base text-text-primary" href={backHref}>
          <ArrowLeft className="size-5" />
          Volver
        </Link>
      ) : null}
      {title ? (
        <div className="min-w-0 flex-1 text-center">
          <h1 className="text-xl font-bold text-text-primary">{title}</h1>
          {subtitle ? <p className="mt-1 text-xs text-text-secondary">{subtitle}</p> : null}
        </div>
      ) : null}
      {showAvatar ? (
        <Link
          aria-label="Abrir perfil"
          className="grid size-10 place-items-center rounded-full bg-border-muted text-text-primary"
          href="/cuenta"
        >
          <UserRound className="size-6" />
        </Link>
      ) : null}
    </header>
  );
}
