"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { login, saveAuthSession } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const auth = await login(email, password);
      saveAuthSession(auth);
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell title="Inicia sesión" subtitle="Accede a tu cuenta para ver tus listas">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Correo electrónico"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ejemplo@correo.com"
          required
          type="email"
          value={email}
        />
        <PasswordInput
          label="Contraseña"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="**********************"
          required
          value={password}
        />
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        <div className="text-right">
          <Link className="text-xs text-primary" href="/recover-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading ? "Iniciando..." : "Iniciar sesión"}
        </Button>
      </form>
      <p className="mt-9 text-center text-sm text-text-primary">
        ¿No tienes cuenta?{" "}
        <Link className="text-primary" href="/signup">
          Regístrate
        </Link>
      </p>
    </AuthShell>
  );
}
