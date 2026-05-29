import Link from "next/link";
import { ProductItemCard } from "@/components/cards/product-item-card";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { getProduct, mockLists } from "@/lib/mock/data";

type ListDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListDetailPage({ params }: ListDetailPageProps) {
  const { id } = await params;
  const list = mockLists.find((item) => item.id === id) ?? mockLists[0];

  return (
    <AppShell>
      <Header showAvatar showBrand />
      <section className="mt-14">
        <Header
          backHref="/listas"
          subtitle={`${list.items.length} items · ${list.items.filter((item) => item.checked).length} comprados`}
          title={list.name}
        />
        <div className="mt-10 flex gap-3">
          <Button className="flex-1" type="button">
            Agregar Producto
          </Button>
          <Button className="flex-1" type="button" variant="outline">
            <Link href={`/listas/${list.id}/editar`}>Editar Lista</Link>
          </Button>
        </div>
        <div className="mt-10 space-y-5">
          {list.items.map((item) => {
            const product = getProduct(item.productId);
            return (
              <ProductItemCard
                key={item.id}
                checked={item.checked}
                name={product.name}
                price={product.price}
                quantity={`${item.quantity} uds`}
              />
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
