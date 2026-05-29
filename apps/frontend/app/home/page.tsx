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
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  const categories = useMemo(() => ["Todos", ...Array.from(new Set(products.map((product) => product.category)))], [products]);

  function handleFilterClick() {
    setIsFilterOpen(true);
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function handleAddToList(listId: string) {
    if (!selectedProduct) {
      return;
    }

    addProductToList(listId, selectedProduct.id);
    setSelectedProduct(null);
    showToast("Producto agregado a la lista");
  }

  function handleCreateAndAdd() {
    if (!selectedProduct || !newListName.trim()) {
      return;
    }

    const list = createList(newListName.trim());
    addProductToList(list.id, selectedProduct.id);
    setNewListName("");
    setSelectedProduct(null);
    showToast("Lista creada con el producto");
  }

  return (
    <AppShell>
      <AppHeader />
      <div className="mt-12 space-y-5">
        <SearchBar
          onChange={(event) => setQuery(event.target.value)}
          onFilterClick={handleFilterClick}
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
      {selectedProduct ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-text-primary/20 px-5 pb-6">
          <section className="w-full max-w-[342px] rounded-t-2xl bg-surface p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Seleccionar lista</h2>
                <p className="mt-1 text-xs text-text-secondary">{selectedProduct.name}</p>
              </div>
              <button className="text-sm text-text-secondary" type="button" onClick={() => setSelectedProduct(null)}>
                Cerrar
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {lists.length === 0 ? <EmptyState title="No tienes listas creadas" /> : null}
              {lists.map((list) => (
                <button
                  key={list.id}
                  className="flex min-h-14 w-full items-center justify-between rounded-xl border border-border-muted bg-surface px-4 text-left"
                  type="button"
                  onClick={() => handleAddToList(list.id)}
                >
                  <span className="font-bold text-text-primary">{list.name}</span>
                  <span className="text-xs text-text-secondary">{list.items.length} items</span>
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-3 border-t border-border-muted pt-5">
              <Input
                label="Nueva lista"
                onChange={(event) => setNewListName(event.target.value)}
                placeholder="Compras de la semana"
                value={newListName}
              />
              <Button className="w-full" disabled={!newListName.trim()} type="button" onClick={handleCreateAndAdd}>
                Crear y agregar
              </Button>
            </div>
          </section>
        </div>
      ) : null}
      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-text-primary/20 px-5 pb-6">
          <section className="w-full max-w-[342px] rounded-t-2xl bg-surface p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Filtro de categorías</h2>
              </div>
              <button className="text-sm text-text-secondary" type="button" onClick={() => setIsFilterOpen(false)}>
                Cerrar
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className="flex min-h-14 w-full items-center justify-between rounded-xl border border-border-muted bg-surface px-4 text-left"
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsFilterOpen(false);
                  }}
                >
                  <span className="font-bold text-text-primary">{category}</span>
                  {selectedCategory === category ? <span className="text-xs text-primary font-bold">Activo</span> : null}
                </button>
              ))}
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
