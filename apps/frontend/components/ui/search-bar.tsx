import { InputHTMLAttributes } from "react";
import { Funnel } from "lucide-react";
import { cn } from "@/lib/cn";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  onFilterClick?: () => void;
};

export function SearchBar({ className, onFilterClick, ...props }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        className={cn(
          "h-[50px] min-w-0 flex-1 rounded-[13px] border border-border-muted bg-surface px-4 text-sm text-text-primary outline-none placeholder:text-text-secondary",
          className,
        )}
        placeholder="Busca productos..."
        {...props}
      />
      <button
        aria-label="Filtrar productos"
        className="grid size-10 place-items-center text-icon-dark"
        type="button"
        onClick={onFilterClick}
      >
        <Funnel className="size-6" />
      </button>
    </div>
  );
}
