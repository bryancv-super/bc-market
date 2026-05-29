"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductItemCard } from "@/components/cards/product-item-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/mock/data";
import { useAppState } from "@/lib/mock/store";

export default function ListDetailPage() {
  const params = useParams<{ id: string }>();
  const { lists, toggleItem } = useAppState();
  const list = lists.find((item) => item.id === params.id);

  return (
    <AppShell>
      <Header showAvatar showBrand />
      <section className="mt-14">
        {list ? (
          <>
            <Header
              backHref="/listas"
              subtitle={`${list.items.length} items · ${list.items.filter((item) => item.checked).length} comprados`}
              title={list.name}
            />
            <div className="mt-10 flex gap-3">
              <Button className="flex-1" type="button">
                <Link href="/home">Agregar Producto</Link>
              </Button>
              <Button className="flex-1" type="button" variant="outline">
                <Link href={`/listas/${list.id}/editar`}>Editar Lista</Link>
              </Button>
            </div>
            <div className="mt-10 space-y-5">
              {list.items.length === 0 ? (
                <EmptyState title="Esta lista todavia no tiene productos" actionLabel="Ir al catalogo" />
              ) : (
                list.items.map((item) => {
                  const product = getProduct(item.productId);
                  return (
                    <ProductItemCard
                      key={item.id}
                      checked={item.checked}
                      name={product.name}
                      price={product.price}
                      quantity={`${item.quantity} ${product.unit}`}
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
