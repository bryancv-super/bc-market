"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { ListCard } from "@/components/cards/list-card";
import { EmptyState } from "@/components/feedback/empty-state";
import { SkeletonCard } from "@/components/feedback/skeleton";
import { Toast } from "@/components/feedback/toast";
import { AppShell } from "@/components/layout/app-shell";
import { AppHeader } from "@/components/layout/app-header";
import { PageSection } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppState } from "@/lib/mock/store";

function ListsView() {
  const searchParams = useSearchParams();
  const { lists, createList } = useAppState();
  const [isCreateOpen, setIsCreateOpen] = useState(searchParams.get("create") === "true");
  const [listName, setListName] = useState("");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 300);
    return () => window.clearTimeout(timeout);
  }, []);

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!listName.trim()) {
      return;
    }

    createList(listName.trim());
    setListName("");
    setIsCreateOpen(false);
    setToast("Lista creada");
    window.setTimeout(() => setToast(""), 2200);
  }

  return (
    <AppShell>
      <AppHeader />
      <PageSection title="Mis Listas">
        <Button className="w-full" type="button" variant="outline" onClick={() => setIsCreateOpen(true)}>
          Nueva Lista
        </Button>
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : lists.length === 0 ? (
          <EmptyState title="Todavia no tienes listas" actionLabel="Crear lista" onAction={() => setIsCreateOpen(true)} />
        ) : (
          lists.map((list) => (
            <ListCard
              key={list.id}
              checkedCount={list.items.filter((item) => item.checked).length}
              id={list.id}
              itemCount={list.items.length}
              name={list.name}
            />
          ))
        )}
      </PageSection>
      <div className="mt-8 text-center">
        <Link className="text-xs text-primary" href="/home">
          Volver al catalogo
        </Link>
      </div>
      {isCreateOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-text-primary/20 px-8">
          <form className="w-full max-w-[300px] rounded-xl bg-surface p-5 shadow-xl" onSubmit={handleCreate}>
            <h2 className="text-center text-xl font-bold text-text-primary">Nueva Lista</h2>
            <div className="mt-6">
              <Input
                label="Nombre de la lista"
                onChange={(event) => setListName(event.target.value)}
                placeholder="Compras de la semana"
                required
                value={listName}
              />
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" disabled={!listName.trim()} type="submit">
                Crear
              </Button>
              <Button className="flex-1" type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      ) : null}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Toast message={toast} />
        </div>
      ) : null}
    </AppShell>
  );
}

export default function ListsPage() {
  return (
    <Suspense>
      <ListsView />
    </Suspense>
  );
}
