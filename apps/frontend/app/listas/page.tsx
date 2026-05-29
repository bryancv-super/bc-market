import Link from "next/link";
import { ListCard } from "@/components/cards/list-card";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { PageSection } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { mockLists } from "@/lib/mock/data";

export default function ListsPage() {
  return (
    <AppShell>
      <Header showAvatar showBrand />
      <PageSection title="Mis Listas">
        <Button className="w-full" type="button" variant="outline">
          <Link href="/listas?create=true">Nueva Lista</Link>
        </Button>
        {mockLists.map((list) => (
          <ListCard
            key={list.id}
            checkedCount={list.items.filter((item) => item.checked).length}
            id={list.id}
            itemCount={list.items.length}
            name={list.name}
          />
        ))}
      </PageSection>
    </AppShell>
  );
}
