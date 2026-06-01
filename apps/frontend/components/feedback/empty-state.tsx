import { Bookmark, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  actionLabel?: string;
  icon?: "bookmark" | "search";
  onAction?: () => void;
};

export function EmptyState({ title, actionLabel, icon = "bookmark", onAction }: EmptyStateProps) {
  const Icon = icon === "search" ? Search : Bookmark;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="size-10 text-text-secondary" />
      <p className="mt-5 max-w-[220px] text-base font-bold text-text-primary">{title}</p>
      {actionLabel ? (
        <Button className="mt-5 h-10 text-xs" type="button" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
