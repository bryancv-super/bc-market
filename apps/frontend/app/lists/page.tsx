"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MoreVertical, Plus, ShoppingBag, Trash2 } from "lucide-react";

interface ShoppingList {
  id: string;
  name: string;
  _count: {
    items: number;
  };
  createdAt: string;
}

const API_URL = "http://localhost:3001/api";

export default function ListsPage() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/lists`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("No se pudieron cargar tus listas");

      const data = await response.json();
      setLists(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching lists:", err);
      setLists([]);
      setError(err instanceof Error ? err.message : "No se pudieron cargar tus listas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLists();
  }, []);

  const handleCreateList = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newListName.trim() }),
      });

      if (!response.ok) throw new Error("No se pudo crear la lista");

      setNewListName("");
      setIsModalOpen(false);
      fetchLists();
    } catch (err) {
      console.error("Error creating list:", err);
      setError(err instanceof Error ? err.message : "No se pudo crear la lista");
    }
  };

  const handleDeleteList = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta lista?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/lists/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("No se pudo eliminar la lista");

      setLists((current) => current.filter((list) => list.id !== id));
    } catch (err) {
      console.error("Error deleting list:", err);
      setError(err instanceof Error ? err.message : "No se pudo eliminar la lista");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex flex-col">
          <h1 className="text-text-main font-bold text-[30px] mb-2">Mis Listas</h1>
          <p className="text-text-muted text-[16px]">Gestiona tus listas de compras y organiza tus productos</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
        >
          <Plus size={18} />
          Crear nueva lista
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-surface p-6 rounded-xl border border-border-main shadow-sm">
              <div className="h-10 w-10 rounded-lg bg-border-main animate-pulse mb-6" />
              <div className="h-5 w-3/4 rounded bg-border-main animate-pulse mb-8" />
              <div className="h-4 w-1/2 rounded bg-border-main animate-pulse" />
            </div>
          ))}
        </div>
      ) : lists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center text-primary mb-6">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-text-main font-semibold text-[20px] mb-2">No tienes listas aún</h2>
          <p className="text-text-muted text-[16px] mb-8">
            Comienza creando tu primera lista de compras para organizar tus productos
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Crear mi primera lista
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => (
            <div
              key={list.id}
              className="bg-surface p-6 rounded-xl border border-border-main shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary shrink-0">
                    <ShoppingBag size={20} />
                  </div>
                  <h2 className="text-text-main font-semibold text-[18px] truncate">{list.name}</h2>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="p-2 text-text-muted hover:text-danger transition-colors rounded-md"
                    title="Eliminar lista"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button className="p-2 text-text-muted hover:text-text-main transition-colors rounded-md" title="Más opciones">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-text-muted text-sm font-medium">{list._count?.items || 0} productos</span>
                <Link
                  href={`/lists/${list.id}`}
                  className="text-primary hover:text-primary-dark font-semibold text-sm transition-colors flex items-center gap-1"
                >
                  Ver detalles &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-surface w-full max-w-md rounded-xl shadow-lg border border-border-main p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-text-main font-semibold text-[20px] mb-4">Crear nueva lista</h2>
            <form onSubmit={handleCreateList} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main">Nombre de la lista</label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ej. Compras semanales"
                  className="w-full px-4 py-3 rounded-lg border border-border-main focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
                  value={newListName}
                  onChange={(event) => setNewListName(event.target.value)}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-text-muted hover:bg-zinc-100 font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  Crear lista
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
