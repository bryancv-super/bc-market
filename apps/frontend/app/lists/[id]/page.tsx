"use client"

import React, { useState, useEffect, use } from "react";
import { Trash2, CheckCircle2, Circle, ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
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

export default function ListDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const listId = resolvedParams.id;
  
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListDetails();
  }, [listId]);

  const fetchListDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/lists/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error("Error fetching list details:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3001/api/lists/items/${itemId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      fetchListDetails();
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3001/api/lists/items/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchListDetails();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-12 h-12 border-4 border-primary-light border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!list) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 text-center">
        <p className="text-text-muted text-lg mb-4">Lista no encontrada</p>
        <Link href="/lists" className="text-primary font-semibold hover:text-primary-dark">
          Volver a mis listas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/lists" 
          className="p-2 rounded-lg hover:bg-zinc-100 text-text-muted transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-text-main font-bold text-[24px]">{list.name}</h1>
      </div>

      <div className="bg-surface rounded-xl border border-border-main shadow-sm overflow-hidden">
        <div className="divide-y divide-border-main">
          {list.items.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-text-muted text-sm">Esta lista está vacía</p>
            </div>
          ) : (
            list.items.map((item) => (
              <div 
                key={item.id} 
                className="p-4 flex items-center justify-between group hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleItem(item.id)}
                    className={`transition-colors ${item.checked ? "text-primary" : "text-text-muted"}`}
                  >
                    {item.checked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div className="flex flex-col">
                    <span className={`text-text-main font-medium text-[16px] ${item.checked ? "line-through text-text-muted" : ""}`}>
                      {item.product.name}
                    </span>
                    <span className="text-text-muted text-sm">
                      {item.quantity} x {item.product.unit}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-all rounded-md"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 bg-zinc-50 border-t border-border-main flex justify-center">
          <Link 
            href={`/catalog?listId=${listId}`}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            <Plus size={16} />
            Añadir productos
          </Link>
        </div>
      </div>
    </div>
  );
} 
