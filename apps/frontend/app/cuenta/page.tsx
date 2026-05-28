"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Camera, CheckCircle2, KeyRound, LogOut, Pencil, UserCircle, X } from "lucide-react";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  profileImage?: string | null;
}

type ViewMode = "profile" | "edit" | "password";

const API_URL = "http://localhost:3001/api";

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mode, setMode] = useState<ViewMode>("profile");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileForm, setProfileForm] = useState({ username: "", profileImage: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const initials = useMemo(() => {
    const source = user?.username || user?.email || "BC";
    return source
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!response.ok) throw new Error("No se pudo cargar tu cuenta");

      const data = await response.json();
      setUser(data);
      setProfileForm({
        username: data.username || "",
        profileImage: data.profileImage || "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar tu cuenta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);

  const openEditProfile = () => {
    if (!user) return;
    setMode("edit");
    setError("");
    setSuccess("");
    setFieldErrors({});
    setProfileForm({
      username: user.username,
      profileImage: user.profileImage || "",
    });
  };

  const openPassword = () => {
    setMode("password");
    setError("");
    setSuccess("");
    setFieldErrors({});
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    setError("");
    setSuccess("");

    if (profileForm.username.trim().length < 2) {
      setFieldErrors({ username: "El nombre debe tener al menos 2 caracteres" });
      return;
    }

    setSavingProfile(true);
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          username: profileForm.username.trim(),
          profileImage: profileForm.profileImage.trim() || null,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || "No se pudo actualizar el perfil");

      setUser(data);
      setMode("profile");
      setSuccess("Perfil actualizado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar el perfil");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});
    setError("");
    setSuccess("");

    const nextErrors: Record<string, string> = {};
    if (!passwordForm.currentPassword) nextErrors.currentPassword = "Ingresa tu contraseña actual";
    if (passwordForm.newPassword.length < 6) nextErrors.newPassword = "Usa al menos 6 caracteres";
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      nextErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setSavingPassword(true);
    try {
      const response = await fetch(`${API_URL}/auth/password`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || "No se pudo actualizar la contraseña");

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMode("profile");
      setSuccess("Contraseña actualizada");
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo actualizar la contraseña";
      if (message.includes("actual")) setFieldErrors({ currentPassword: message });
      setError(message);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3 rounded-lg border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary ${
      fieldErrors[name] ? "border-danger" : "border-border-main"
    }`;

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-surface border border-border-main rounded-xl p-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-border-main animate-pulse mb-6" />
          <div className="mx-auto h-6 w-48 rounded bg-border-main animate-pulse mb-3" />
          <div className="mx-auto h-4 w-64 rounded bg-border-main animate-pulse mb-8" />
          <div className="space-y-3">
            <div className="h-11 rounded-lg bg-border-main animate-pulse" />
            <div className="h-11 rounded-lg bg-border-main animate-pulse" />
            <div className="h-11 rounded-lg bg-border-main animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-text-main font-bold text-[30px] mb-2">Mi cuenta</h1>
        <p className="text-text-muted text-[16px]">Administra tus datos y el acceso a BC Market.</p>
      </div>

      {success && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-primary bg-primary-light px-4 py-3 text-sm font-medium text-primary">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {!user ? (
        <div className="bg-surface border border-border-main rounded-xl p-6 text-center">
          <p className="text-text-muted mb-6">No pudimos mostrar tu perfil.</p>
          <button
            onClick={fetchProfile}
            className="px-5 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary-light transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="bg-surface border border-border-main rounded-xl p-6">
          {mode === "profile" && (
            <section>
              <div className="flex flex-col items-center text-center mb-8">
                <Avatar user={user} initials={initials} size="large" />
                <h2 className="mt-4 text-text-main font-semibold text-[20px]">{user.username}</h2>
                <p className="text-text-muted text-sm">{user.email}</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={openEditProfile}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary-light transition-colors"
                >
                  <Pencil size={18} />
                  Editar perfil
                </button>
                <button
                  onClick={openPassword}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                >
                  <KeyRound size={18} />
                  Cambiar contraseña
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-danger text-danger font-semibold hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Cerrar sesión
                </button>
              </div>
            </section>
          )}

          {mode === "edit" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-text-main font-semibold text-[20px]">Editar perfil</h2>
                  <p className="text-text-muted text-sm">Actualiza tu nombre y foto visible.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMode("profile")}
                  className="p-2 rounded-md text-text-muted hover:text-text-main hover:bg-zinc-100 transition-colors"
                  title="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-3">
                <Avatar
                  user={{ ...user, username: profileForm.username, profileImage: profileForm.profileImage }}
                  initials={profileForm.username.slice(0, 2).toUpperCase() || initials}
                  size="large"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("profileImage")?.focus()}
                  className="w-full max-w-xs flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary-light transition-colors"
                >
                  <Camera size={18} />
                  Cambiar foto
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main">URL de foto</label>
                <input
                  id="profileImage"
                  type="url"
                  placeholder="https://..."
                  className={inputClass("profileImage")}
                  value={profileForm.profileImage}
                  onChange={(event) => setProfileForm({ ...profileForm, profileImage: event.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main">Nombre</label>
                <input
                  type="text"
                  className={inputClass("username")}
                  value={profileForm.username}
                  onChange={(event) => setProfileForm({ ...profileForm, username: event.target.value })}
                />
                {fieldErrors.username && <p className="text-xs text-danger">{fieldErrors.username}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-main">Email</label>
                <input
                  type="email"
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-border-main bg-bg-main text-text-muted cursor-not-allowed"
                  value={user.email}
                />
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark disabled:bg-border-main disabled:text-text-muted transition-colors"
              >
                {savingProfile ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
          )}

          {mode === "password" && (
            <form onSubmit={handleSavePassword} className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-text-main font-semibold text-[20px]">Cambiar contraseña</h2>
                  <p className="text-text-muted text-sm">Ingresa tu contraseña actual y define una nueva.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMode("profile")}
                  className="p-2 rounded-md text-text-muted hover:text-text-main hover:bg-zinc-100 transition-colors"
                  title="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>

              <PasswordInput
                label="Contraseña actual"
                value={passwordForm.currentPassword}
                error={fieldErrors.currentPassword}
                onChange={(value) => setPasswordForm({ ...passwordForm, currentPassword: value })}
              />
              <PasswordInput
                label="Nueva contraseña"
                value={passwordForm.newPassword}
                error={fieldErrors.newPassword}
                onChange={(value) => setPasswordForm({ ...passwordForm, newPassword: value })}
              />
              <PasswordInput
                label="Confirmar nueva contraseña"
                value={passwordForm.confirmPassword}
                error={fieldErrors.confirmPassword}
                onChange={(value) => setPasswordForm({ ...passwordForm, confirmPassword: value })}
              />

              <button
                type="submit"
                disabled={savingPassword}
                className="w-full px-5 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark disabled:bg-border-main disabled:text-text-muted transition-colors"
              >
                {savingPassword ? "Guardando..." : "Guardar contraseña"}
              </button>
            </form>
          )}
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-500/30" onClick={() => setShowLogoutConfirm(false)} />
          <div className="relative w-full max-w-xs rounded-xl bg-bg-main border border-border-main p-6 shadow-lg text-center">
            <h2 className="text-text-main font-semibold text-[20px] mb-2">Cerrar sesión</h2>
            <p className="text-text-muted text-sm mb-6">Confirma que quieres salir de tu cuenta.</p>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full px-5 py-3 rounded-lg bg-danger text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full px-5 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary-light transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Avatar({ user, initials, size }: { user: UserProfile; initials: string; size: "large" | "small" }) {
  const dimension = size === "large" ? "h-24 w-24" : "h-10 w-10";

  if (user.profileImage) {
    return (
      <img
        src={user.profileImage}
        alt={user.username}
        className={`${dimension} rounded-full border-2 border-border-main object-cover bg-border-main`}
      />
    );
  }

  return (
    <div className={`${dimension} rounded-full border-2 border-border-main bg-border-main flex items-center justify-center text-text-muted`}>
      {initials ? <span className="font-semibold text-[20px]">{initials}</span> : <UserCircle size={32} />}
    </div>
  );
}

function PasswordInput({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-main">{label}</label>
      <input
        type="password"
        className={`w-full px-4 py-3 rounded-lg border bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-danger" : "border-border-main"
        }`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
