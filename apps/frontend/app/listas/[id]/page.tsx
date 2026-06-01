"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductItemCard } from "@/components/cards/product-item-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { Header } from "@/components/layout/header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useAppState } from "@/lib/mock/store";

export default function ListDetailPage() {
  const params = useParams<{ id: string }>();
  const { lists, products, toggleItem } = useAppState();
  const list = lists.find((item) => item.id === params.id);

  return (
    <AppShell>
      <AppHeader />
      <section className="mt-14">
        {list ? (
          <>
            <Header
              backHref="/listas"
              subtitle={`${list.items.length} items · ${list.items.filter((item) => item.checked).length} comprados`}
              title={list.name}
            />
            <div className="mt-10 flex gap-3">
              <Link
                className={cn(
                  "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
                  buttonVariants.primary,
                )}
                href="/home"
              >
                Agregar Producto
              </Link>
              <Link
                className={cn(
                  "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed",
                  buttonVariants.outline,
                )}
                href={`/listas/${list.id}/editar`}
              >
                Editar Lista
              </Link>
            </div>
            <div className="mt-10 space-y-5">
              {list.items.length === 0 ? (
                <EmptyState title="Esta lista todavía no tiene productos" actionLabel="Ir al catálogo" />
              ) : (
                list.items.map((item) => {
                  const product = products.find((currentProduct) => currentProduct.id === item.productId);
                  return (
                    <ProductItemCard
                      key={item.id}
                      category={product?.category}
                      checked={item.checked}
                      imageUrl={product?.imageUrl}
                      name={product?.name ?? "Producto no disponible"}
                      price={product?.price ?? ""}
                      quantity={`${item.quantity} ${product?.unit ?? "unidad"}`}
                      onToggle={() => toggleItem(list.id, item.id)}
                    />
                  );
                })
              )}
            </div>
          </>
        ) : (
          <EmptyState title="No encontramos esta lista" />
        )}
      </section>
    </AppShell>
  );
}
