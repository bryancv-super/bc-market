import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "BC Market",
  description: "Sistema de listas de supermercados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-background text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
