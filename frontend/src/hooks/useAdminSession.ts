"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import type { AdminProfile } from "@/lib/types";
import { getAdmin, removeAuthToken, setAdmin } from "@/lib/utils";

export function useAdminSession(required = true) {
  const router = useRouter();
  const [admin, setAdminState] = useState<AdminProfile | null>(getAdmin());
  const [loading, setLoading] = useState(required);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        if (!active || !response.data?.admin) return;

        setAdminState(response.data.admin);
        setAdmin(response.data.admin);
      } catch {
        removeAuthToken();
        setAdminState(null);
        if (required && active) {
          router.replace("/admin/login");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      active = false;
    };
  }, [required, router]);

  return {
    admin,
    loading,
    isAuthenticated: Boolean(admin),
  };
}
