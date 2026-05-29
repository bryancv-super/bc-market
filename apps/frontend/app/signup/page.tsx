"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveAuthSession, signup } from "@/lib/api/auth";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const auth = await signup(username, email, password, passwordConfirmation);
      saveAuthSession(auth);
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos crear tu cuenta");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Para acceder a la mejor plataforma de listas">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input label="Nombre completo" onChange={(event) => setUsername(event.target.value)} required value={username} />
        <Input
          label="Correo electronico"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ejemplo@correo.com"
          required
          type="email"
          value={email}
        />
        <Input
          label="Contrasena"
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="****************"
          required
          type="password"
          value={password}
        />
        <Input
          label="Confirmar contrasena"
          minLength={8}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          placeholder="****************"
          required
          type="password"
          value={passwordConfirmation}
        />
        {error ? <p className="text-xs text-danger">{error}</p> : null}
        <Button className="w-full" disabled={isLoading} type="submit">
          {isLoading ? "Creando..." : "Crear cuenta"}
        </Button>
      </form>
      <p className="mt-9 text-center text-sm text-text-primary">
        ¿Ya tienes cuenta?{" "}
        <Link className="text-primary" href="/login">
          Inicia Sesion
        </Link>
      </p>
    </AuthShell>
  );
}
