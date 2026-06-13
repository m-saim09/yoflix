import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AppChrome from "@/components/layout/AppChrome";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Yoflix | Premium Business Website and Lead Platform",
  description:
    "Yoflix builds modern business websites, inquiry funnels, and CRM-ready admin dashboards for serious teams.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AppChrome>{children}</AppChrome>
        <Toaster position="bottom-right" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
