"use client"

import React, { useState, useEffect } from "react";
import { Search, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const listId = searchParams.get("listId");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("http://localhost:3001/api/categories"),
        fetch("http://localhost:3001/api/products")
      ]);
      const catData = await catRes.json();
      const prodData = await prodRes.json();
      setCategories(catData);
      setProducts(prodData);
    } catch (error) {
      console.error("Error fetching catalog data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    (selectedCategoryId === "Todos" || p.category.id === selectedCategoryId) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProductToList = async (productId: string) => {
    if (!listId) {
      alert("Por favor, selecciona una lista primero desde la vista de detalles de la lista.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/lists/items", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          listId, 
          productId, 
          quantity: 1 
        }),
      });

      if (response.ok) {
        alert("Producto añadido a la lista correctamente");
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Ocurrió un error al añadir el producto");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-12 h-12 border-4 border-primary-light border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-text-main font-bold text-[30px] mb-2">Catálogo de Productos</h1>
          {listId && (
            <div className="flex items-center gap-2 text-primary font-medium">
              <ShoppingBag size={18} />
              <span>Añadiendo a la lista: <span className="font-bold underline">Ver Detalles</span></span>
            </div>
          )}
          <p className="text-text-muted text-[16px]">Encuentra todo lo que necesitas para tus listas</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input 
              type="text"
              placeholder="Buscar producto..."
              className="pl-10 pr-4 py-3 rounded-lg border border-border-main focus:outline-none focus:ring-2 focus:ring-primary text-text-main w-full md:w-75"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategoryId("Todos")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategoryId === "Todos" 
              ? "bg-primary text-white" 
              : "bg-white text-text-muted border border-border-main hover:border-primary"
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryId(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategoryId === cat.id 
                ? "bg-primary text-white" 
                : "bg-white text-text-muted border border-border-main hover:border-primary"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-surface p-6 rounded-xl border border-border-main shadow-sm hover:shadow-md transition-all group"
          >
            <div className="aspect-square w-full mb-4 overflow-hidden rounded-lg bg-zinc-100">
              <img 
                src={product.imageUrl || "https://via.placeholder.com/150"} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className="text-caption text-text-muted uppercase font-medium">{product.category.name}</span>
                <h3 className="text-text-main font-semibold text-[20px] leading-tight">{product.name}</h3>
              </div>
              <span className="text-text-main font-bold text-[18px]">${Number(product.price).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span className="text-text-muted text-sm">{product.unit}</span>
              <button 
                onClick={() => addProductToList(product.id)}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                <Plus size={16} />
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg mb-6">No se encontraron productos que coincidan con tu búsqueda</p>
          <button 
            onClick={() => {setSearchQuery(""); setSelectedCategoryId("Todos");}}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
} 
