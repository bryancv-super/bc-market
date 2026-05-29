"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/api/auth";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(token, password, passwordConfirmation);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos actualizar la contraseña");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell title="Nueva contraseña" subtitle="Crea una nueva contraseña segura">
      <form className="space-y-7" onSubmit={handleSubmit}>
        <Input
          label="Nueva contraseña"
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="**********************"
          required
          type="password"
          value={password}
        />
        <Input
          label="Confirmar contraseña"
          minLength={8}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          placeholder="**********************"
          required
          type="password"
          value={passwordConfirmation}
        />
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        {!token ? <p className="text-xs text-danger">El enlace de recuperación no tiene token.</p> : null}
        <Button className="w-full" disabled={isLoading || !token} type="submit">
          {isLoading ? "Actualizando..." : "Actualizar contraseña"}
        </Button>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
