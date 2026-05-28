"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setError("");
 setLoading(true);

 try {
 const response = await fetch("http://localhost:3001/api/auth/login", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ email, password }),
 });

 if (!response.ok) {
 const data = await response.json();
 throw new Error(data.message || "Login failed");
 }

 const data = await response.json();
 localStorage.setItem("token", data.token);
 window.location.href = "/";
 } catch (err: any) {
 setError(err.message);
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="min-h-screen flex items-center justify-center bg-bg-main px-4">
 <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-lg border border-border-main">
 <div className="text-center mb-8">
 <h1 className="text-text-main font-bold mb-2">Bienvenido de vuelta</h1>
 <p className="text-text-muted text-sm">Ingresa tus credenciales para acceder a tus listas</p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="space-y-1">
 <label className="block text-sm font-medium text-text-main">Email</label>
 <input
 type="email"
 required
 className="w-full px-4 py-3 rounded-md border border-border-main focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
 placeholder="correo@ejemplo.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 />
 </div>

 <div className="space-y-1">
 <label className="block text-sm font-medium text-text-main">Contraseña</label>
 <input
 type="password"
 required
 className="w-full px-4 py-3 rounded-md border border-border-main focus:outline-none focus:ring-2 focus:ring-primary text-text-main"
 placeholder="********"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>

 {error && (
 <div className="p-3 rounded-md bg-danger-light text-danger-dark text-sm font-medium">
 {error}
 </div>
 )}

 <button
 type="submit"
 disabled={loading}
 className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {loading ? "Ingresando..." : "Iniciar Sesión"}
 </button>
 </form>

 <div className="mt-6 text-center">
 <p className="text-text-muted text-sm">
 ¿No tienes una cuenta? <Link href="/signup" className="text-primary hover:underline font-medium">Regístrate aquí</Link>
 </p>
 </div>
 </div>
 </div>
 );
}
