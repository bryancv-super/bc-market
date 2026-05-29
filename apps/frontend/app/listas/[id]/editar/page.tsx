"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { EditableItemCard } from "@/components/cards/editable-item-card";
import { ConfirmationModal } from "@/components/feedback/confirmation-modal";
import { EmptyState } from "@/components/feedback/empty-state";
import { Toast } from "@/components/feedback/toast";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProduct } from "@/lib/mock/data";
import { useAppState } from "@/lib/mock/store";

export default function EditListPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { lists, updateItemQuantity, removeItem, updateListName, deleteList } = useAppState();
  const list = useMemo(() => lists.find((item) => item.id === params.id), [lists, params.id]);
  const [name, setName] = useState(list?.name ?? "");
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeletingList, setIsDeletingList] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function handleSave() {
    if (!list || !name.trim()) {
      return;
    }

    updateListName(list.id, name.trim());
    showToast("Cambios guardados");
  }

  function handleDeleteItem() {
    if (!list || !itemToDelete) {
      return;
    }

    removeItem(list.id, itemToDelete);
    setItemToDelete(null);
    showToast("Producto eliminado");
  }

  function handleDeleteList() {
    if (!list) {
      return;
    }

    deleteList(list.id);
    router.push("/listas");
  }

  return (
    <AppShell>
      <Header showAvatar showBrand />
      <section className="mt-14">
        {list ? (
          <>
            <Header backHref={`/listas/${list.id}`} title="Editar Lista" />
            <div className="mt-8">
              <Input label="Nombre de la lista" onChange={(event) => setName(event.target.value)} value={name} />
            </div>
            <div className="mt-8 space-y-5">
              {list.items.length === 0 ? (
                <EmptyState title="No hay productos para editar" />
              ) : (
                list.items.map((item) => {
                  const product = getProduct(item.productId);
                  return (
                    <EditableItemCard
                      key={item.id}
                      name={product.name}
                      price={product.price}
                      quantity={Math.max(item.quantity, 1)}
                      onDecrease={() => updateItemQuantity(list.id, item.id, item.quantity - 1)}
                      onDelete={() => setItemToDelete(item.id)}
                      onIncrease={() => updateItemQuantity(list.id, item.id, item.quantity + 1)}
                    />
                  );
                })
              )}
            </div>
            <div className="mt-8 space-y-3 text-center">
              <Button disabled={!name.trim()} type="button" onClick={handleSave}>
                Guardar Cambios
              </Button>
              <Button type="button" variant="danger-outline" onClick={() => setIsDeletingList(true)}>
                Eliminar Lista
              </Button>
            </div>
          </>
        ) : (
          <EmptyState title="No encontramos esta lista" />
        )}
      </section>
      {itemToDelete ? (
        <ConfirmationModal
          cancelLabel="Cancelar"
          confirmLabel="Eliminar"
          description="Este producto saldra de la lista."
          title="Eliminar producto"
          onCancel={() => setItemToDelete(null)}
          onConfirm={handleDeleteItem}
        />
      ) : null}
      {isDeletingList ? (
        <ConfirmationModal
          cancelLabel="Cancelar"
          confirmLabel="Eliminar"
          description="Esta accion eliminara la lista completa."
          title="Eliminar lista"
          onCancel={() => setIsDeletingList(false)}
          onConfirm={handleDeleteList}
        />
      ) : null}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Toast message={toast} />
        </div>
      ) : null}
    </AppShell>
  );
}
