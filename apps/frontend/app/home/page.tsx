import Link from "next/link";
import { ProductCard } from "@/components/cards/product-card";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { PageSection } from "@/components/layout/page-section";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { mockProducts } from "@/lib/mock/data";

export default function HomePage() {
  return (
    <AppShell>
      <Header showAvatar showBrand />
      <div className="mt-12 space-y-5">
        <SearchBar />
        <Button className="w-full" type="button">
          <Link href="/listas">Mis Listas</Link>
        </Button>
      </div>
      <PageSection title="Productos">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} category={product.category} name={product.name} price={product.price} />
        ))}
      </PageSection>
    </AppShell>
  );
}
