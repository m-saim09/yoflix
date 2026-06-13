import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin | Yoflix",
  description: "Admin CRM interface for Yoflix inquiry management.",
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="min-h-screen bg-[#eef3f8] text-slate-950">{children}</div>;
}
