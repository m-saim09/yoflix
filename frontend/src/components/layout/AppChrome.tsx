"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/Topbar";
import Footer from "@/components/layout/Footer";
import { WebsiteThemeBridge } from "@/components/layout/WebsiteThemeBridge";

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <WebsiteThemeBridge />
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
