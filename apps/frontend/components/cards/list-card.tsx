import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ListCardProps = {
  id: string;
  name: string;
  itemCount: number;
  checkedCount: number;
};

export function ListCard({ id, name, itemCount, checkedCount }: ListCardProps) {
  return (
    <article className="card-shadow rounded-2xl bg-surface p-4">
      <h2 className="text-xl font-bold text-text-primary">{name}</h2>
      <p className="mt-4 text-sm text-text-secondary">
        {itemCount} items · {checkedCount} comprados
      </p>
      <Link
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary bg-surface px-4 text-sm font-medium text-primary"
        href={`/listas/${id}`}
      >
        Abrir
        <ArrowRight className="size-5" />
      </Link>
    </article>
  );
}
