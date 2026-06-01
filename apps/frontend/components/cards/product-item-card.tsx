import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { getProductImageUrl } from "@/lib/products/images";

type ProductItemCardProps = {
  name: string;
  price: string;
  quantity: string;
  imageUrl?: string | null;
  checked?: boolean;
  onToggle?: () => void;
};

export function ProductItemCard({ name, price, quantity, imageUrl, checked, onToggle }: ProductItemCardProps) {
  const resolvedImageUrl = getProductImageUrl(name, imageUrl);

  return (
    <article className="card-shadow flex min-h-27 items-start gap-4 rounded-2xl bg-surface p-4">
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
      <div
        className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary-soft bg-cover bg-center text-base font-bold text-primary-dark"
        role="img"
        aria-label={name}
        style={{ backgroundImage: `url(${resolvedImageUrl})` }}
      >
      </div>
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
