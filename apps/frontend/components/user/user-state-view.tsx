import { Spinner } from "@/components/feedback/spinner";
import { Toast } from "@/components/feedback/toast";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";

type UserStateViewProps = {
  mode: "profile" | "edit-profile" | "change-password";
  state?: string;
};

export function UserStateView({ mode, state = "default" }: UserStateViewProps) {
  if (state === "loading") {
    return (
      <div className="space-y-6">
        <Spinner label={mode === "profile" ? "Cargando perfil..." : mode === "edit-profile" ? "Guardando..." : "Actualizando..."} />
        <div className="space-y-4">
          <div className="h-24 rounded-2xl bg-text-secondary/10" />
          <div className="h-10 rounded-xl bg-text-secondary/10" />
          <div className="h-10 rounded-xl bg-text-secondary/10" />
        </div>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="space-y-8">
        <Toast
          message={
            mode === "profile"
              ? "Sesión cerrada correctamente"
              : mode === "edit-profile"
                ? "Perfil actualizado correctamente"
                : "Contraseña actualizada correctamente"
          }
        />
        <EmptyState
          actionLabel="Continuar"
          title={mode === "profile" ? "Vuelve cuando quieras" : "Cambios guardados"}
        />
      </div>
    );
  }

  if (state === "error") {
    return (
      <ErrorState
        actionLabel="Reintentar"
        title={mode === "profile" ? "No pudimos cargar tu perfil" : "No pudimos guardar los cambios"}
      />
    );
  }

  return null;
}

export function UserValidationMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-danger">{message}</p>;
}
