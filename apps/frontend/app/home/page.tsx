"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/product-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { SkeletonCard } from "@/components/feedback/skeleton";
import { Toast } from "@/components/feedback/toast";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { PageSection } from "@/components/layout/page-section";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Colores neutros para la opción especial "Todos"
const todosColors = { border: "#e6e7ea", bg: "#f8fafc", text: "#0f172a" };

export default function HomePage() {
  const { products, lists, addProductToList, createList } = useAppState();
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [newListName, setNewListName] = useState("");
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
        selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function handleAddToList(listId: string) {
    if (!selectedProduct) return;
    addProductToList(listId, selectedProduct.id);
    setSelectedProduct(null);
    showToast("Producto agregado a la lista");
  }

  function handleCreateList() {
    if (!newListName.trim()) return;
    createList(newListName.trim());
    setNewListName("");
    setSelectedProduct(null);
    showToast("Lista creada");
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
        {selectedCategory !== "Todos" ? (
          <p className="text-xs text-text-secondary">Filtro activo: {selectedCategory}</p>
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
              name={product.name}
              price={product.price}
              onAdd={() => setSelectedProduct(product)}
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

            <div className="mt-5 space-y-3">
              {lists.length === 0 ? (
                <EmptyState title="No tienes listas creadas" />
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

            <div className="mt-5 space-y-3 border-t border-border-muted pt-5">
              <Input
                label="Nueva lista"
                onChange={(event) => setNewListName(event.target.value)}
                placeholder="Compras de la semana"
                value={newListName}
              />
              <Button
                className="w-full"
                disabled={!newListName.trim()}
                type="button"
                onClick={handleCreateList}
              >
                Crear lista
              </Button>
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
                // Obtenemos los colores para esta categoría.
                // "Todos" usa colores neutros ya que no representa una categoría real.
                const colors = category === "Todos"
                  ? todosColors
                  : (categoryColors[category] ?? todosColors);

                const isActive = selectedCategory === category;

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
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
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
