import { AlertTriangle, CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title: string;
  tone?: "error" | "warning";
  actionLabel?: string;
  onAction?: () => void;
};

export function ErrorState({ title, tone = "error", actionLabel = "Reintentar", onAction }: ErrorStateProps) {
  const Icon = tone === "warning" ? AlertTriangle : CircleAlert;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className={tone === "warning" ? "size-10 text-warning" : "size-10 text-danger"} />
      <p className="mt-5 max-w-[220px] text-base font-bold text-text-primary">{title}</p>
      <Button className="mt-5 h-10 text-xs" type="button" variant="outline" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}
