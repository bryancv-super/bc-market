"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/product-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { SkeletonCard } from "@/components/feedback/skeleton";
import { Toast } from "@/components/feedback/toast";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { PageSection } from "@/components/layout/page-section";
import { Button, buttonVariants } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { Product } from "@/lib/mock/data";
import { useAppState } from "@/lib/mock/store";
import { cn } from "@/lib/cn";

// Definimos los colores aquí para poder usarlos tanto en el filtro
// como en el ProductCard. Si en el futuro quieres compartirlos con
// más componentes, puedes moverlos a lib/category-colors.ts.
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

const defaultFilterColors = { border: "#e6e7ea", bg: "#f8fafc", text: "#0f172a" };

export default function HomePage() {
  const { products, lists, addProductToList } = useAppState();
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(timeout);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategories]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function handleAddToList(listId: string) {
    if (!selectedProduct) return;
    addProductToList(listId, selectedProduct.id, quantity);
    setSelectedProduct(null);
    setQuantity(1);
    showToast("Producto agregado a la lista");
  }

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((selectedCategory) => selectedCategory !== category)
        : [...current, category],
    );
  }

  return (
    <AppShell>
      <AppHeader />
      <div className="mt-12 space-y-5">
        <SearchBar
          onChange={(event) => setQuery(event.target.value)}
          onFilterClick={() => setIsFilterOpen(true)}
          value={query}
        />
        {selectedCategories.length > 0 ? (
          <p className="text-xs text-text-secondary">
            Filtros activos: {selectedCategories.join(", ")}
          </p>
        ) : null}
        <Link
          className={cn(
            "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
            buttonVariants.primary,
          )}
          href="/listas"
        >
          Mis Listas
        </Link>
      </div>

      <PageSection title="Productos">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filteredProducts.length === 0 ? (
          <EmptyState icon="search" title="No encontramos productos para tu búsqueda" />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              category={product.category}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              onAdd={() => {
                setSelectedProduct(product);
                setQuantity(1);
              }}
            />
          ))
        )}
      </PageSection>

      {/* Panel: seleccionar lista existente para agregar el producto */}
      {selectedProduct ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-text-primary/20 px-5 pb-6">
          <section className="w-full max-w-[342px] rounded-t-2xl bg-surface p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Seleccionar lista</h2>
                <p className="mt-1 text-xs text-text-secondary">{selectedProduct.name}</p>
              </div>
              <button
                className="text-sm text-text-secondary"
                type="button"
                onClick={() => setSelectedProduct(null)}
              >
                Cerrar
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-border-muted px-4 py-3">
              <span className="text-sm font-bold text-text-primary">Cantidad</span>
              <div className="flex items-center gap-3">
                <button
                  aria-label="Disminuir cantidad"
                  className="grid size-8 place-items-center rounded-lg bg-primary text-white disabled:opacity-45"
                  disabled={quantity <= 1}
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-8 text-center text-base font-bold text-text-primary">{quantity}</span>
                <button
                  aria-label="Aumentar cantidad"
                  className="grid size-8 place-items-center rounded-lg bg-primary text-white"
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {lists.length === 0 ? (
                <div className="space-y-4 rounded-xl border border-border-muted p-4 text-center">
                  <EmptyState title="No tienes listas creadas" />
                  <Link
                    className={cn(
                      "inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-medium transition-colors",
                      buttonVariants.primary,
                    )}
                    href="/listas?create=true"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Ir a Mis Listas
                  </Link>
                </div>
              ) : (
                lists.map((list) => (
                  <button
                    key={list.id}
                    className="flex min-h-14 w-full items-center justify-between rounded-xl border border-border-muted bg-surface px-4 text-left"
                    type="button"
                    onClick={() => handleAddToList(list.id)}
                  >
                    <span className="font-bold text-text-primary">{list.name}</span>
                    <span className="text-xs text-text-secondary">{list.items.length} items</span>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>
      ) : null}

      {/* Panel: filtro de categorías con colores por categoría */}
      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-text-primary/20 px-5 pb-6">
          <section className="w-full max-w-[342px] rounded-t-2xl bg-surface p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold text-text-primary">Filtro de categorías</h2>
              <button
                className="text-sm text-text-secondary"
                type="button"
                onClick={() => setIsFilterOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {categories.map((category) => {
                const colors = categoryColors[category] ?? defaultFilterColors;
                const isActive = selectedCategories.includes(category);

                return (
                  <button
                    key={category}
                    className="flex min-h-14 w-full items-center justify-between rounded-xl border px-4 text-left transition-opacity"
                    // Aplicamos el color de la categoría al borde y fondo del botón.
                    // Cuando está activo, usamos el fondo de color completo;
                    // cuando no, mantenemos el fondo blanco pero conservamos el borde coloreado.
                    style={{
                      borderColor: colors.border,
                      backgroundColor: isActive ? colors.bg : "#ffffff",
                    }}
                    type="button"
                    onClick={() => toggleCategory(category)}
                  >
                    <span
                      className="font-bold"
                      // El texto adopta el color de la categoría
                      style={{ color: colors.text }}
                    >
                      {category}
                    </span>
                    {isActive ? (
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-bold"
                        // El badge "Activo" usa el color de fondo intenso para destacar
                        style={{
                          backgroundColor: colors.border,
                          color: "#ffffff",
                        }}
                      >
                        Activo
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex gap-3 border-t border-border-muted pt-5">
              <Button
                className="flex-1"
                disabled={selectedCategories.length === 0}
                type="button"
                variant="outline"
                onClick={() => setSelectedCategories([])}
              >
                Limpiar
              </Button>
              <Button className="flex-1" type="button" onClick={() => setIsFilterOpen(false)}>
                Aplicar
              </Button>
            </div>
          </section>
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Toast message={toast} />
        </div>
      ) : null}
    </AppShell>
  );
}
