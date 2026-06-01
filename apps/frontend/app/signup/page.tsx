"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/layout/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { saveAuthSession, signup } from "@/lib/api/auth";
import { getEmailValidationError, getPasswordValidationError } from "@/lib/auth/validation";

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

    const emailError = getEmailValidationError(email);
    const passwordError = getPasswordValidationError(password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }

    if (password !== passwordConfirmation) {
      setError("La confirmación de contraseña no coincide.");
      return;
    }

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
          label="Correo electrónico"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ejemplo@correo.com"
          required
          type="email"
          value={email}
        />
        <PasswordInput
          label="Contraseña"
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="****************"
          required
          value={password}
        />
        <PasswordInput
          label="Confirmar contraseña"
          minLength={8}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          placeholder="****************"
          required
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
          Inicia sesión
        </Link>
      </p>
    </AuthShell>
  );
}
