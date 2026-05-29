import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

type ProductCardProps = {
  name: string;
  price: string;
  category: string;
  onAdd?: () => void;
};

// Usamos estilos inline porque Tailwind elimina en compilación
// las clases que no aparecen literalmente en el código estático.
// Con style={{}} los valores se aplican siempre en runtime.
const categoryColors: Record<string, { border: string; bg: string; text: string }> = {
  Frutas:    { border: "#fb923c", bg: "#ffedd5", text: "#c2410c" },
  Vegetales: { border: "#22c55e", bg: "#dcfce7", text: "#15803d" },
  Lácteos:   { border: "#60a5fa", bg: "#dbeafe", text: "#1d4ed8" },
  Carnes:    { border: "#f87171", bg: "#fee2e2", text: "#b91c1c" },
  Panadería: { border: "#f59e0b", bg: "#fef3c7", text: "#b45309" },
  Despensa:  { border: "#84cc16", bg: "#ecfccb", text: "#4d7c0f" },
  Básicos:   { border: "#94a3b8", bg: "#e2e8f0", text: "#334155" },
  Bebidas:   { border: "#22d3ee", bg: "#cffafe", text: "#0e7490" },
  Limpieza:  { border: "#8b5cf6", bg: "#ede9fe", text: "#6d28d9" },
};

const defaultColors = { border: "#f59e0b", bg: "#ffffff", text: "#f59e0b" };

export function ProductCard({ name, price, category, onAdd }: ProductCardProps) {
  const colors = categoryColors[category] ?? defaultColors;

  return (
    <article className="card-shadow min-h-[146px] rounded-2xl bg-surface p-4">
      {/* Tag con colores inline para que Tailwind no los elimine */}
      <span
        className="inline-flex h-[29px] min-w-[96px] items-center rounded-xl border px-3 text-xs"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.bg,
          color: colors.text,
        }}
      >
        {category}
      </span>

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
