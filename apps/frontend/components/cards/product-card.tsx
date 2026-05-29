import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  name: string;
  price: string;
  category: string;
  onAdd?: () => void;
};

const categoryStyles: Record<string, { card: string; tag: string }> = {
  Frutas: {
    card: "bg-[#fff7ed]",
    tag: "border-[#fb923c] bg-[#ffedd5] text-[#c2410c]",
  },
  Vegetales: {
    card: "bg-[#f0fdf4]",
    tag: "border-[#22c55e] bg-[#dcfce7] text-[#15803d]",
  },
  Lacteos: {
    card: "bg-[#eff6ff]",
    tag: "border-[#60a5fa] bg-[#dbeafe] text-[#1d4ed8]",
  },
  Carnes: {
    card: "bg-[#fef2f2]",
    tag: "border-[#f87171] bg-[#fee2e2] text-[#b91c1c]",
  },
  Panaderia: {
    card: "bg-[#fffbeb]",
    tag: "border-[#f59e0b] bg-[#fef3c7] text-[#b45309]",
  },
  Despensa: {
    card: "bg-[#f7fee7]",
    tag: "border-[#84cc16] bg-[#ecfccb] text-[#4d7c0f]",
  },
  Basicos: {
    card: "bg-[#f8fafc]",
    tag: "border-[#94a3b8] bg-[#e2e8f0] text-[#334155]",
  },
  Bebidas: {
    card: "bg-[#ecfeff]",
    tag: "border-[#22d3ee] bg-[#cffafe] text-[#0e7490]",
  },
  Limpieza: {
    card: "bg-[#f5f3ff]",
    tag: "border-[#8b5cf6] bg-[#ede9fe] text-[#6d28d9]",
  },
};

export function ProductCard({ name, price, category, onAdd }: ProductCardProps) {
  const styles = categoryStyles[category] ?? {
    card: "bg-surface",
    tag: "border-warning bg-surface text-warning",
  };

  return (
    <article className={cn("card-shadow min-h-[146px] rounded-2xl p-4", styles.card)}>
      <Tag className={styles.tag}>{category}</Tag>
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
