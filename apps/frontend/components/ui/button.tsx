import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "danger" | "danger-outline" | "disabled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-md active:bg-primary-soft active:text-text-primary",
  outline:
    "border border-primary bg-surface text-primary active:border-primary-soft active:bg-text-primary active:text-primary-soft",
  danger: "bg-danger text-white active:bg-danger-soft active:text-text-primary",
  "danger-outline": "border border-danger bg-surface text-danger",
  disabled: "bg-border-muted text-text-secondary",
};

export function Button({
  className,
  variant = "primary",
  icon,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const resolvedVariant = disabled ? "disabled" : variant;

  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
        buttonVariants[resolvedVariant],
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
