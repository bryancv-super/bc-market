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
      setError(err instanceof Error ? err.message : "No pudimos actualizar la contrasena");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell title="Nueva contrasena" subtitle="Crea una nueva contrasena segura">
      <form className="space-y-7" onSubmit={handleSubmit}>
        <Input
          label="Nueva contrasena"
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="**********************"
          required
          type="password"
          value={password}
        />
        <Input
          label="Confirmar contrasena"
          minLength={8}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          placeholder="**********************"
          required
          type="password"
          value={passwordConfirmation}
        />
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        {!token ? <p className="text-xs text-danger">El enlace de recuperacion no tiene token.</p> : null}
        <Button className="w-full" disabled={isLoading || !token} type="submit">
          {isLoading ? "Actualizando..." : "Actualizar contrasena"}
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
