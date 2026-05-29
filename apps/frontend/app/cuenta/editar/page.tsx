"use client";

import { UserRound } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/feedback/toast";
import { fetchProfile, updateProfile, uploadAvatar } from "@/lib/api/market";
import { getStoredToken, getStoredUser, StoredUser, updateStoredUser } from "@/lib/auth/session";

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    const storedUser = getStoredUser();

    if (!token) {
      router.replace("/login");
      return;
    }

    if (storedUser) {
      window.setTimeout(() => {
        setUser(storedUser);
        setName(storedUser.username);
      }, 0);
    }

    fetchProfile(token)
      .then((profile) => {
        setUser(profile);
        setName(profile.username);
        updateStoredUser(profile);
      })
      .catch(() => {
        if (!storedUser) {
          router.replace("/login");
        }
      });
  }, [router]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = getStoredToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const result = await updateProfile(token, name);
      setUser(result.user);
      updateStoredUser(result.user);
      showToast("Perfil actualizado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAvatarChange(file?: File) {
    const token = getStoredToken();

    if (!token || !file) {
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const result = await uploadAvatar(token, file);
      setUser(result.user);
      updateStoredUser(result.user);
      showToast("Foto actualizada");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos cambiar la foto");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <AppShell className="bg-surface px-8">
      <Header backHref="/cuenta" title="Editar perfil" />
      <section className="mt-12">
        {user?.profileImage ? (
          <div
            aria-label=""
            className="mx-auto size-[60px] rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${user.profileImage})` }}
          />
        ) : (
          <div className="mx-auto grid size-[60px] place-items-center rounded-full bg-border-muted text-text-primary">
            <UserRound className="size-10" />
          </div>
        )}
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(event) => handleAvatarChange(event.target.files?.[0])}
        />
        <Button
          className="mt-8 w-full"
          disabled={isUploading}
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? "Subiendo..." : "Cambiar foto de perfil"}
        </Button>
        <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
          <Input label="Nombre" onChange={(event) => setName(event.target.value)} required value={name} />
          <Input label="Correo electronico" readOnly type="email" value={user?.email ?? ""} />
          {error ? <p className="text-xs text-danger">{error}</p> : null}
          <Button className="w-full" disabled={isSaving || !name.trim()} type="submit">
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </section>
      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <Toast message={toast} />
        </div>
      ) : null}
    </AppShell>
  );
}
