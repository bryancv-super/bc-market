import { Button } from "@/components/ui/button";
import { getProductImageUrl } from "@/lib/products/images";

type ProductCardProps = {
  name: string;
  price: string;
  category: string;
  imageUrl?: string | null;
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

export function ProductCard({ name, price, category, imageUrl, onAdd }: ProductCardProps) {
  const colors = categoryColors[category] ?? defaultColors;
  const resolvedImageUrl = getProductImageUrl(name, imageUrl);

  return (
    <article className="card-shadow flex min-h-38.5 gap-4 rounded-2xl bg-surface p-4">
      <div
        className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border text-xl font-bold"
        role="img"
        aria-label={name}
        style={{
          borderColor: colors.border,
          backgroundColor: colors.bg,
          backgroundImage: `url(${resolvedImageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: colors.text,
        }}
      >
      </div>
      <div className="min-w-0 flex-1">
        <span
          className="inline-flex h-7.25 max-w-full items-center rounded-xl border px-3 text-xs"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.bg,
            color: colors.text,
          }}
        >
          {category}
        </span>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-text-primary">{name}</h2>
            <p className="mt-4 text-base text-text-primary">{price}</p>
          </div>
          <Button className="h-10 shrink-0 px-3 text-xs" type="button" variant="outline" onClick={onAdd}>
            Agregar
          </Button>
        </div>
      </div>
    </article>
  );
}
