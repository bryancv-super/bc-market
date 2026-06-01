import { Button } from "@/components/ui/button";

type ConfirmationModalProps = {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmationModal({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-text-primary/20 px-8">
      <section className="w-full max-w-56 rounded-xl bg-surface-muted p-5 text-center shadow-xl">
        <h2 className="text-base font-bold text-text-primary">{title}</h2>
        <p className="mt-6 text-sm text-text-primary">{description}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button className="h-11 px-4" type="button" variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button className="h-11 px-4" type="button" variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}
