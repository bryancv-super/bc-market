import { LoaderCircle } from "lucide-react";

type SpinnerProps = {
  label?: string;
};

export function Spinner({ label = "Cargando..." }: SpinnerProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-surface px-4 py-3 text-sm text-text-secondary">
      <LoaderCircle className="size-4 animate-spin text-info" />
      {label}
    </div>
  );
}
