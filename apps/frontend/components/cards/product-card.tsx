import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

type ProductCardProps = {
  name: string;
  price: string;
  category: string;
  onAdd?: () => void;
};

export function ProductCard({ name, price, category, onAdd }: ProductCardProps) {
  return (
    <article className="card-shadow min-h-[146px] rounded-2xl bg-surface p-4">
      <Tag>{category}</Tag>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">{name}</h2>
          <p className="mt-6 text-base text-text-primary">{price}</p>
        </div>
        <Button className="h-10 px-3 text-xs" type="button" variant="outline" onClick={onAdd}>
          Agregar a lista
        </Button>
      </div>
    </article>
  );
}
