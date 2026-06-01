import { cn } from "@/lib/cn";

type TagProps = {
  children: string;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[29px] min-w-[96px] items-center rounded-xl border border-warning bg-surface px-3 text-xs text-warning",
        className,
      )}
    >
      {children}
    </span>
  );
}
