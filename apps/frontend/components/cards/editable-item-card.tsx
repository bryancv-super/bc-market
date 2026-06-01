import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductImageUrl } from "@/lib/products/images";

type EditableItemCardProps = {
  name: string;
  price: string;
  imageUrl?: string | null;
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onDelete?: () => void;
};

export function EditableItemCard({
  name,
  price,
  imageUrl,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}: EditableItemCardProps) {
  const resolvedImageUrl = getProductImageUrl(name, imageUrl);

  return (
    <article className="card-shadow flex min-h-[100px] items-center justify-between gap-3 rounded-2xl bg-surface p-4">
      <div
        className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary-soft bg-cover bg-center text-base font-bold text-primary-dark"
        role="img"
        aria-label={name}
        style={{ backgroundImage: `url(${resolvedImageUrl})` }}
      >
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h2 className="truncate text-xl font-bold text-text-primary">{name}</h2>
          <span className="text-sm text-text-secondary">{price}</span>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button className="grid size-6 place-items-center rounded bg-primary text-white shadow-md" type="button" onClick={onIncrease}>
            <Plus className="size-4" />
          </button>
          <span className="text-base text-text-primary">{quantity} unidad</span>
          <button className="grid size-6 place-items-center rounded bg-primary text-white shadow-md" type="button" onClick={onDecrease}>
            <Minus className="size-4" />
          </button>
        </div>
      </div>
      <Button className="h-[68px] px-4 text-xs" type="button" variant="danger-outline" onClick={onDelete}>
        Eliminar
      </Button>
    </article>
  );
}
