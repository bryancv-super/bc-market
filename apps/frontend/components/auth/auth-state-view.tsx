import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/feedback/spinner";
import { Toast } from "@/components/feedback/toast";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";

type AuthStateViewProps = {
  mode: "login" | "signup" | "recover" | "reset";
  state?: string;
};

export function AuthStateView({ mode, state = "default" }: AuthStateViewProps) {
  if (state === "loading") {
    return (
      <div className="space-y-6">
        <Spinner
          label={
            mode === "signup"
              ? "Creando cuenta..."
              : mode === "recover"
                ? "Enviando..."
                : mode === "reset"
                  ? "Actualizando contraseña..."
                  : "Iniciando sesión..."
          }
        />
        <div className="space-y-5">
          <Input disabled label={mode === "login" ? "Correo electronico" : mode === "signup" ? "Nombre completo" : "Correo"} />
          <Input disabled label={mode === "login" ? "Contrasena" : "Contrasena"} />
        </div>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="space-y-8">
        <Toast
          message={
            mode === "signup"
              ? "Cuenta creada correctamente"
              : mode === "recover"
                ? "Enlace enviado"
                : mode === "reset"
                  ? "Contraseña actualizada correctamente"
                  : "Sesión iniciada correctamente"
          }
        />
        <EmptyState
          actionLabel="Continuar"
          icon="bookmark"
          title={
            mode === "signup"
              ? "Ya puedes iniciar sesión"
              : mode === "recover"
                ? "Revisa tu correo"
                : mode === "reset"
                  ? "Vuelve a iniciar sesión"
                  : "Listo para seguir"
          }
        />
      </div>
    );
  }

  if (state === "error") {
    return (
      <ErrorState
        actionLabel={mode === "recover" ? "Reintentar" : "Volver a intentar"}
        title={
          mode === "signup"
            ? "No pudimos crear la cuenta"
            : mode === "recover"
              ? "No pudimos enviar el enlace"
              : mode === "reset"
                ? "No pudimos actualizar la contraseña"
                : "No pudimos iniciar sesión"
        }
      />
    );
  }

  return null;
}

export function AuthLinks({
  mode,
}: {
  mode: "login" | "signup" | "recover" | "reset";
}) {
  if (mode === "login") {
    return (
      <p className="mt-9 text-center text-sm text-text-primary">
        ¿No tienes cuenta?{" "}
        <Link className="text-primary" href="/signup">
          Registrate
        </Link>
      </p>
    );
  }

  if (mode === "signup") {
    return (
      <p className="mt-9 text-center text-sm text-text-primary">
        ¿Ya tienes cuenta?{" "}
        <Link className="text-primary" href="/login">
          Inicia Sesion
        </Link>
      </p>
    );
  }

  if (mode === "recover") {
    return (
      <div className="mt-9 text-center">
        <Link className="text-xs text-primary" href="/login">
          Volver al inicio de sesion
        </Link>
      </div>
    );
  }

  return null;
}
