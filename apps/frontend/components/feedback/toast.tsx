import { Check } from "lucide-react";

type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  return (
    <div className="inline-flex min-h-14 items-center gap-3 rounded-xl bg-primary px-4 text-sm text-white shadow-md">
      <Check className="size-4" />
      {message}
    </div>
  );
}
