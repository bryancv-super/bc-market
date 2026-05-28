"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, PackagePlus, Search, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number | string;
  unit: string;
  imageUrl?: string | null;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const API_URL = "http://localhost:3001/api";

function CatalogContent() {
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const fetchInitialData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch(`${API_URL}/categories`),
        fetch(`${API_URL}/products`),
      ]);

      if (!catRes.ok || !prodRes.ok) throw new Error("No se pudo cargar el catálogo");

      const catData = await catRes.json();
      const prodData = await prodRes.json();
      setCategories(Array.isArray(catData) ? catData : []);
      setProducts(Array.isArray(prodData) ? prodData : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar el catálogo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInitialData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategoryId === "Todos" || product.category.id === selectedCategoryId;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategoryId]);

  const addProductToList = async (productId: string) => {
    if (!listId) return;

    setPendingProductId(productId);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/lists/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listId,
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "No se pudo añadir el producto");
      }

      setAddedProductIds((current) => Array.from(new Set([...current, productId])));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo añadir el producto");
    } finally {
      setPendingProductId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="h-9 w-72 bg-border-main rounded-md animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-surface p-6 rounded-xl border border-border-main">
              <div className="aspect-square w-full mb-4 rounded-lg bg-border-main animate-pulse" />
              <div className="h-5 w-3/4 bg-border-main rounded animate-pulse mb-3" />
              <div className="h-4 w-1/2 bg-border-main rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-text-main font-bold text-[30px]">Catálogo de Productos</h1>
          <p className="text-text-muted text-[16px]">Encuentra productos y agrégalos a tus listas.</p>
          {listId && (
            <Link
              href={`/lists/${listId}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm"
            >
              <ShoppingBag size={18} />
              Añadiendo a una lista. Volver al detalle
            </Link>
          )}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border-main focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {!listId && (
        <div className="mb-6 rounded-lg border border-border-main bg-surface px-4 py-3 text-sm text-text-muted">
          Abre una lista y usa “Añadir productos” para guardar productos en ella.
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategoryId("Todos")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategoryId === "Todos"
              ? "bg-primary-light text-primary border border-primary"
              : "bg-white text-text-muted border border-border-main hover:border-primary"
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategoryId === category.id
                ? "bg-primary-light text-primary border border-primary"
                : "bg-white text-text-muted border border-border-main hover:border-primary"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg mb-6">No se encontraron productos que coincidan con tu búsqueda</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategoryId("Todos");
            }}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const wasAdded = addedProductIds.includes(product.id);
            const isPending = pendingProductId === product.id;

            return (
              <div
                key={product.id}
                className="bg-surface p-6 rounded-xl border border-border-main shadow-sm hover:shadow-md transition-all group"
              >
                <div className="aspect-square w-full mb-4 overflow-hidden rounded-lg bg-zinc-100">
                  <img
                    src={product.imageUrl || "https://placehold.co/300x300/f8fafc/64748b?text=BC+Market"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="min-w-0">
                    <span className="text-xs text-text-muted uppercase font-medium">{product.category.name}</span>
                    <h2 className="text-text-main font-semibold text-[20px] leading-tight truncate">{product.name}</h2>
                  </div>
                  <span className="text-text-main font-bold text-[18px]">${Number(product.price).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-text-muted text-sm">{product.unit}</span>
                  <button
                    onClick={() => addProductToList(product.id)}
                    disabled={!listId || isPending}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors disabled:cursor-not-allowed ${
                      wasAdded
                        ? "bg-primary-light text-primary"
                        : "bg-primary hover:bg-primary-dark text-white disabled:bg-border-main disabled:text-text-muted"
                    }`}
                  >
                    {wasAdded ? <Check size={16} /> : <PackagePlus size={16} />}
                    {wasAdded ? "Añadido" : isPending ? "Añadiendo" : "Agregar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-100">
          <div className="w-12 h-12 border-4 border-primary-light border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
