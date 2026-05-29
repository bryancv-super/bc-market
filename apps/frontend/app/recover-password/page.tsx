"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recoverPassword } from "@/lib/api/auth";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const result = await recoverPassword(email);
      setSuccessMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar el enlace");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell title="Recuperar contrasena" subtitle="Ingresa tu correo para recibir el enlace de restablecimiento">
      <form className="space-y-7" onSubmit={handleSubmit}>
        <Input
          label="Correo"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ejemplo@correo.com"
          required
          type="email"
          value={email}
        />
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        {successMessage ? (
          <p className="rounded-xl bg-primary-soft p-3 text-xs text-text-primary">
            Revisa tu correo para continuar con el restablecimiento de contrasena.
          </p>
        ) : null}
        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading ? "Enviando..." : "Enviar enlace"}
        </Button>
      </form>
      <div className="mt-9 text-center">
        <Link className="text-xs text-primary" href="/login">
          Volver al inicio de sesion
        </Link>
      </div>
    </AuthShell>
  );
}
