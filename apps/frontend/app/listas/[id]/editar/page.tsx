"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { EditableItemCard } from "@/components/cards/editable-item-card";
import { ConfirmationModal } from "@/components/feedback/confirmation-modal";
import { EmptyState } from "@/components/feedback/empty-state";
import { Toast } from "@/components/feedback/toast";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppState } from "@/lib/mock/store";

export default function EditListPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { lists, products, replaceListItems, updateListName, deleteList } = useAppState();
  const list = useMemo(() => lists.find((item) => item.id === params.id), [lists, params.id]);
  const [name, setName] = useState(list?.name ?? "");
  const [draftItems, setDraftItems] = useState(list?.items ?? []);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isClearingList, setIsClearingList] = useState(false);
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
    replaceListItems(list.id, draftItems);
    showToast("Cambios guardados");
  }

  function updateDraftQuantity(itemId: string, quantity: number) {
    setDraftItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item)),
    );
  }

  function handleDeleteItem() {
    if (!list || !itemToDelete) {
      return;
    }

    setDraftItems((current) => current.filter((item) => item.id !== itemToDelete));
    setItemToDelete(null);
    showToast("Producto eliminado de los cambios pendientes");
  }

  function handleClearList() {
    setDraftItems([]);
    setIsClearingList(false);
    showToast("Lista limpiada en cambios pendientes");
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
      <AppHeader />
      <section className="mt-14">
        {list ? (
          <>
            <Header backHref={`/listas/${list.id}`} title="Editar Lista" />
            <div className="mt-8">
              <Input label="Nombre de la lista" onChange={(event) => setName(event.target.value)} value={name} />
            </div>
            <div className="mt-8 space-y-5">
              {draftItems.length === 0 ? (
                <EmptyState title="No hay productos para editar" />
              ) : (
                draftItems.map((item) => {
                  const product = products.find((currentProduct) => currentProduct.id === item.productId);
                  return (
                    <EditableItemCard
                      key={item.id}
                      name={product?.name ?? "Producto no disponible"}
                      price={product?.price ?? ""}
                      quantity={Math.max(item.quantity, 1)}
                      onDecrease={() => updateDraftQuantity(item.id, item.quantity - 1)}
                      onDelete={() => setItemToDelete(item.id)}
                      onIncrease={() => updateDraftQuantity(item.id, item.quantity + 1)}
                    />
                  );
                })
              )}
            </div>
            <div className="mt-8 border-t border-border-muted pt-6 text-center">
              <Button className="w-full" disabled={!name.trim()} type="button" onClick={handleSave}>
                Guardar Cambios
              </Button>
            </div>
            <div className="mt-8 space-y-3 border-t border-danger-soft pt-6 text-center">
              <Button
                className="w-full"
                disabled={draftItems.length === 0}
                type="button"
                variant="danger-outline"
                onClick={() => setIsClearingList(true)}
              >
                Limpiar Lista
              </Button>
              <Button className="w-full" type="button" variant="danger-outline" onClick={() => setIsDeletingList(true)}>
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
          description="Este producto saldrá de la lista."
          title="Eliminar producto"
          onCancel={() => setItemToDelete(null)}
          onConfirm={handleDeleteItem}
        />
      ) : null}
      {isClearingList ? (
        <ConfirmationModal
          cancelLabel="Cancelar"
          confirmLabel="Limpiar"
          description="La lista quedará vacía cuando guardes los cambios."
          title="Limpiar lista"
          onCancel={() => setIsClearingList(false)}
          onConfirm={handleClearList}
        />
      ) : null}
      {isDeletingList ? (
        <ConfirmationModal
          cancelLabel="Cancelar"
          confirmLabel="Eliminar"
          description="Esta acción eliminará la lista completa."
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
