"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border-main px-4 md:px-6 flex items-center justify-between z-50">
      <Link href="/" className="text-text-main font-bold text-[20px]">
        BC Market
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/catalog" className="text-text-muted hover:text-text-main text-[16px] transition-colors">
          Catálogo
        </Link>
        <Link href="/lists" className="text-text-muted hover:text-text-main text-[16px] transition-colors">
          Mis Listas
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="text-danger hover:text-red-600 text-[16px] transition-colors flex items-center gap-2"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </nav>
    </header>
  );
} 
