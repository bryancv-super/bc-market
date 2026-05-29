import { InputHTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  rightIcon?: ReactNode;
};

export function Input({ className, label, error, rightIcon, ...props }: InputProps) {
  return (
    <label className="block w-full">
      {label ? <span className="mb-2 block text-xs text-text-primary">{label}</span> : null}
      <span className="relative block">
        <input
          className={cn(
            "h-[50px] w-full rounded-[13px] border bg-surface px-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary",
            error ? "border-danger pr-11" : "border-border-muted",
            className,
          )}
          {...props}
        />
        {error ? (
          <X className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-danger" />
        ) : (
          rightIcon
        )}
      </span>
      {error ? <span className="mt-2 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}
