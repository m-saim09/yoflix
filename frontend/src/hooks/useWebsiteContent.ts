"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { pricingAPI, websiteSettingsAPI } from "@/lib/api";
import { defaultManagedPricingPlans, defaultWebsiteSettings } from "@/lib/site-defaults";
import type { ManagedPricingPlan, WebsiteSettings } from "@/lib/types";

let websiteSettingsCache: WebsiteSettings | null = null;
let websiteSettingsPromise: Promise<WebsiteSettings> | null = null;
let pricingPlansCache: ManagedPricingPlan[] | null = null;
let pricingPlansPromise: Promise<ManagedPricingPlan[]> | null = null;

const fetchWebsiteSettings = async () => {
  if (websiteSettingsCache) return websiteSettingsCache;

  if (!websiteSettingsPromise) {
    websiteSettingsPromise = websiteSettingsAPI
      .getPublic()
      .then((response) => {
        websiteSettingsCache = response.data.settings;
        return response.data.settings;
      })
      .finally(() => {
        websiteSettingsPromise = null;
      });
  }

  return websiteSettingsPromise;
};

const fetchPricingPlans = async () => {
  if (pricingPlansCache) return pricingPlansCache;

  if (!pricingPlansPromise) {
    pricingPlansPromise = pricingAPI
      .getPublic()
      .then((response) => {
        pricingPlansCache = response.data.pricingPlans;
        return response.data.pricingPlans;
      })
      .finally(() => {
        pricingPlansPromise = null;
      });
  }

  return pricingPlansPromise;
};

export function useWebsiteSettings() {
  const [settings, setSettingsState] = useState<WebsiteSettings>(websiteSettingsCache || defaultWebsiteSettings);
  const [loading, setLoading] = useState(!websiteSettingsCache);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const response = await fetchWebsiteSettings();
        if (active) {
          setSettingsState(response);
        }
      } catch (error) {
        console.error("Unable to load website settings:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, []);

  const setSettings: Dispatch<SetStateAction<WebsiteSettings>> = (value) => {
    setSettingsState((current) => {
      const nextValue = typeof value === "function" ? value(current) : value;
      websiteSettingsCache = nextValue;
      return nextValue;
    });
  };

  return { settings, loading, setSettings };
}

export function usePricingPlans() {
  const [pricingPlans, setPricingPlansState] = useState<ManagedPricingPlan[]>(pricingPlansCache || defaultManagedPricingPlans);
  const [loading, setLoading] = useState(!pricingPlansCache);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const response = await fetchPricingPlans();
        if (active) {
          setPricingPlansState(response);
        }
      } catch (error) {
        console.error("Unable to load pricing plans:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, []);

  const setPricingPlans: Dispatch<SetStateAction<ManagedPricingPlan[]>> = (value) => {
    setPricingPlansState((current) => {
      const nextValue = typeof value === "function" ? value(current) : value;
      pricingPlansCache = nextValue;
      return nextValue;
    });
  };

  return { pricingPlans, loading, setPricingPlans };
}
