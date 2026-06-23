import type { Metadata } from "next";
import { Suspense } from "react";
import ThemeRegistry from "@/components/ThemeRegistry";
import ToastProvider from "@/components/ToastProvider";
import Navbar from "@/components/Navbar";
import AuthToast from "@/components/AuthToast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recetas",
  description: "Catálogo de recetas de cocina con favoritos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          <ToastProvider>
            <Suspense fallback={null}>
              <AuthToast />
            </Suspense>
            <Navbar />
            <main>{children}</main>
          </ToastProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
