import { EditableItemCard } from "@/components/cards/editable-item-card";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProduct, mockLists } from "@/lib/mock/data";

type EditListPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditListPage({ params }: EditListPageProps) {
  const { id } = await params;
  const list = mockLists.find((item) => item.id === id) ?? mockLists[0];

  return (
    <AppShell>
      <Header showAvatar showBrand />
      <section className="mt-14">
        <Header backHref={`/listas/${list.id}`} title="Editar Lista" />
        <div className="mt-8">
          <Input defaultValue={list.name} label="Nombre de la lista" />
        </div>
        <div className="mt-8 space-y-5">
          {list.items.map((item) => {
            const product = getProduct(item.productId);
            return (
              <EditableItemCard
                key={item.id}
                name={product.name}
                price={product.price}
                quantity={Math.max(item.quantity, 1)}
              />
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button type="button">Guardar Cambios</Button>
        </div>
      </section>
    </AppShell>
  );
}
