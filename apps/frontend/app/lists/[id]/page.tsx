"use client";

import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Circle,
  PackagePlus,
  RefreshCcw,
  ShoppingBag,
  Trash2,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number | string;
  unit: string;
  category?: {
    name: string;
  };
}

interface ShoppingListItem {
  id: string;
  productId: string;
  quantity: number;
  checked: boolean;
  product: Product;
}

interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
}

const API_URL = "http://localhost:3001/api";

export default function ListDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: listId } = use(params);
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);

  const fetchListDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/lists/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(response.status === 404 ? "Lista no encontrada" : "No se pudo cargar la lista");
      }

      const data = await response.json();
      setList(data);
    } catch (err) {
      setList(null);
      setError(err instanceof Error ? err.message : "No se pudo cargar la lista");
    } finally {
      setLoading(false);
    }
  }, [listId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchListDetails();
  }, [fetchListDetails]);

  const totals = useMemo(() => {
    const items = list?.items ?? [];
    const checked = items.filter((item) => item.checked).length;
    const estimatedTotal = items.reduce((sum, item) => {
      return sum + Number(item.product.price || 0) * item.quantity;
    }, 0);

    return { checked, total: items.length, estimatedTotal };
  }, [list]);

  const toggleItem = async (itemId: string) => {
    setPendingItemId(itemId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/lists/items/${itemId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("No se pudo actualizar el producto");

      const updatedItem = await response.json();
      setList((current) => {
        if (!current) return current;
        return {
          ...current,
          items: current.items.map((item) =>
            item.id === itemId ? { ...item, checked: updatedItem.checked } : item,
          ),
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el producto");
    } finally {
      setPendingItemId(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setPendingItemId(itemId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/lists/items/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("No se pudo eliminar el producto");

      setList((current) => {
        if (!current) return current;
        return {
          ...current,
          items: current.items.filter((item) => item.id !== itemId),
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar el producto");
    } finally {
      setPendingItemId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <div className="h-8 w-44 bg-border-main rounded-md animate-pulse mb-8" />
        <div className="bg-surface rounded-xl border border-border-main shadow-sm p-4 space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-18 bg-bg-main rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col items-center justify-center text-center bg-surface border border-border-main rounded-xl p-10">
          <AlertCircle className="text-danger mb-4" size={32} />
          <p className="text-text-main font-semibold text-lg mb-2">{error || "Lista no encontrada"}</p>
          <Link href="/lists" className="text-primary font-semibold hover:text-primary-dark">
            Volver a mis listas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-3 min-w-0">
          <Link
            href="/lists"
            className="p-2 rounded-lg hover:bg-zinc-100 text-text-muted transition-colors"
            aria-label="Volver a mis listas"
          >
            <ChevronLeft size={24} />
          </Link>
          <div className="min-w-0">
            <h1 className="text-text-main font-bold text-[24px] truncate">{list.name}</h1>
            <p className="text-text-muted text-sm mt-1">
              {totals.checked} de {totals.total} productos comprados
            </p>
          </div>
        </div>
        <Link
          href={`/catalog?listId=${listId}`}
          className="shrink-0 flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors"
        >
          <PackagePlus size={16} />
          Añadir
        </Link>
      </div>

      {error && (
        <div className="mb-4 flex items-center justify-between gap-3 bg-red-50 border border-red-100 text-danger rounded-lg px-4 py-3 text-sm">
          <span>{error}</span>
          <button onClick={fetchListDetails} className="font-semibold inline-flex items-center gap-2">
            <RefreshCcw size={14} />
            Reintentar
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-surface border border-border-main rounded-lg p-4">
          <p className="text-text-muted text-sm">Productos</p>
          <p className="text-text-main font-semibold text-[20px]">{totals.total}</p>
        </div>
        <div className="bg-surface border border-border-main rounded-lg p-4">
          <p className="text-text-muted text-sm">Total estimado</p>
          <p className="text-text-main font-semibold text-[20px]">${totals.estimatedTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border-main shadow-sm overflow-hidden">
        {list.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-6 py-16">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-primary mb-4">
              <ShoppingBag size={30} />
            </div>
            <h2 className="text-text-main font-semibold text-[20px] mb-2">Esta lista está vacía</h2>
            <p className="text-text-muted text-[16px] mb-6">
              Añade productos del catálogo para empezar tu compra.
            </p>
            <Link
              href={`/catalog?listId=${listId}`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
            >
              <PackagePlus size={16} />
              Añadir productos
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border-main">
            {list.items.map((item) => {
              const isPending = pendingItemId === item.id;
              return (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => toggleItem(item.id)}
                      disabled={isPending}
                      className={`shrink-0 transition-colors disabled:opacity-50 ${
                        item.checked ? "text-primary" : "text-text-muted hover:text-primary"
                      }`}
                      aria-label={item.checked ? "Marcar como pendiente" : "Marcar como comprado"}
                    >
                      {item.checked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    <div className="min-w-0">
                      <p className={`font-medium text-[16px] truncate ${item.checked ? "line-through text-text-muted" : "text-text-main"}`}>
                        {item.product.name}
                      </p>
                      <p className="text-text-muted text-sm">
                        {item.quantity} x {item.product.unit}
                        {item.product.category?.name ? ` · ${item.product.category.name}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-text-main font-semibold">
                      ${(Number(item.product.price || 0) * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isPending}
                      className="p-2 text-danger hover:bg-red-50 disabled:opacity-50 transition-colors rounded-md"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
