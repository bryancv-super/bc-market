import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-text-main font-bold text-[30px] mb-4 leading-tight">
          Bienvenido a BC Market
        </h1>
        <p className="text-text-muted text-[16px] max-w-lg">
          Gestiona tus listas de compras de manera inteligente. Organiza tus productos,
          comparte tus listas y optimiza tu tiempo en el supermercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface p-8 rounded-xl border border-border-main shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-primary mb-6">
            <ShoppingBag size={32} />
          </div>
          <h3 className="text-text-main font-semibold text-[20px] mb-3">Mis Listas</h3>
          <p className="text-text-muted text-[16px] mb-6">
            Accede a tus listas guardadas, marca productos comprados y organiza tus compras semanales.
          </p>
          <Link 
            href="/lists" 
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Ver mis listas
          </Link>
        </div>

        <div className="bg-surface p-8 rounded-xl border border-border-main shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-primary mb-6">
            <Plus size={32} />
          </div>
          <h3 className="text-text-main font-semibold text-[20px] mb-3">Nuevo Producto</h3>
          <p className="text-text-muted text-[16px] mb-6">
            Explora nuestro catálogo y añade rápidamente los productos que necesites a cualquiera de tus listas.
          </p>
          <Link 
            href="/catalog" 
            className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Explorar catálogo
          </Link>
        </div>
      </div>
    </div>
  );
} 
