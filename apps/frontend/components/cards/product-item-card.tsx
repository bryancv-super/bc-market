import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type ProductItemCardProps = {
  name: string;
  price: string;
  quantity: string;
  checked?: boolean;
  onToggle?: () => void;
};

export function ProductItemCard({ name, price, quantity, checked, onToggle }: ProductItemCardProps) {
  return (
    <article className="card-shadow flex min-h-[108px] items-start gap-4 rounded-2xl bg-surface p-4">
      <button
        aria-label={checked ? "Marcar producto pendiente" : "Marcar producto comprado"}
        className={cn(
          "mt-1 grid size-4 shrink-0 place-items-center rounded-[1px] border border-primary-dark",
          checked && "bg-primary-dark text-white",
        )}
        type="button"
        onClick={onToggle}
      >
        {checked ? <Check className="size-3" /> : null}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h2 className={cn("text-xl font-bold text-text-primary", checked && "text-text-secondary line-through")}>
            {name}
          </h2>
          <span className="text-base text-text-secondary">{quantity}</span>
        </div>
        <p className="mt-8 text-sm text-text-secondary">{price}</p>
      </div>
    </article>
  );
}
