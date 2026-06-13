"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/utils";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(getAuthToken() ? "/admin/dashboard" : "/admin/login");
  }, [router]);

  return null;
}
