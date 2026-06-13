import axios from "axios";
import toast from "react-hot-toast";
import type {
  AdminProfile,
  ApiResponse,
  AuthResponse,
  Contact,
  ContactFormData,
  ContactListResponse,
  DashboardStats,
  Inquiry,
  InquiryFilters,
  InquiryFormData,
  InquiryListResponse,
  LeadStatus,
  ManagedPricingPlan,
  PricingPlanListResponse,
  WebsiteSettings,
  WebsiteSettingsResponse,
} from "./types";
import { defaultManagedPricingPlans, defaultWebsiteSettings } from "./site-defaults";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAxiosNetworkError = axios.isAxiosError(error) && !error.response;
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    }

    if (
      typeof window !== "undefined" &&
      !isAxiosNetworkError &&
      error.response?.status !== 404
    ) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

const withParams = (filters?: InquiryFilters) => {
  const params = new URLSearchParams();

  if (!filters) return params.toString();

  if (filters.status) params.append("status", filters.status);
  if (filters.plan) params.append("plan", filters.plan);
  if (filters.search) params.append("search", filters.search);
  if (filters.page) params.append("page", String(filters.page));
  if (filters.limit) params.append("limit", String(filters.limit));

  return params.toString();
};

const isOfflineOrNotFound = (error: unknown) =>
  axios.isAxiosError(error) && (!error.response || error.response.status === 404);

const normalizeInquiryList = (response: InquiryListResponse): InquiryListResponse => {
  const leads = response.data.leads || response.data.inquiries || [];

  return {
    ...response,
    data: {
      ...response.data,
      leads,
      inquiries: response.data.inquiries || leads,
    },
  };
};

const normalizeStats = (
  response:
    | ApiResponse<DashboardStats>
    | ApiResponse<{
        total: number;
        byStatus: Record<LeadStatus, number>;
        byPlan: Array<{ _id: string; count: number }>;
        recentCount: number;
      }>
): ApiResponse<DashboardStats> => {
  const data = response.data as DashboardStats & {
    total?: number;
    byStatus?: Record<LeadStatus, number>;
    byPlan?: Array<{ _id: string; count: number }>;
    recentCount?: number;
  };

  if ("totals" in data && data.totals) {
    return response as ApiResponse<DashboardStats>;
  }

  return {
    ...response,
    data: {
      totals: {
        leads: data.total || 0,
        contacts: 0,
        newInquiries: data.byStatus?.New || 0,
        activeProjects:
          (data.byStatus?.Contacted || 0) + (data.byStatus?.["In Progress"] || 0),
        monthlyInquiries: data.recentCount || 0,
      },
      leadsByStatus: data.byStatus || {
        New: 0,
        Contacted: 0,
        "In Progress": 0,
        Closed: 0,
      },
      leadsByPlan: data.byPlan || [],
      monthlyInquiries: [],
      recentLeads: [],
    },
  };
};

export const inquiryAPI = {
  submit: async (payload: InquiryFormData) => {
    const response = await api.post<ApiResponse<{ inquiry: Inquiry }>>(
      "/inquiries",
      payload
    );

    return response.data;
  },

  getAll: async (filters?: InquiryFilters) => {
    const query = withParams(filters);
    const nextPath = `/leads${query ? `?${query}` : ""}`;
    const legacyPath = `/inquiries${query ? `?${query}` : ""}`;

    try {
      const response = await api.get<InquiryListResponse>(nextPath);
      return normalizeInquiryList(response.data);
    } catch (error) {
      if (!shouldFallback(error)) {
        throw error;
      }

      const response = await api.get<InquiryListResponse>(legacyPath);
      return normalizeInquiryList(response.data);
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get<ApiResponse<{ lead: Inquiry }>>(`/leads/${id}`);
      return response.data;
    } catch (error) {
      if (!shouldFallback(error)) {
        throw error;
      }

      const response = await api.get<ApiResponse<{ inquiry: Inquiry }>>(`/inquiries/${id}`);
      return {
        ...response.data,
        data: {
          lead: response.data.data.inquiry,
        },
      };
    }
  },

  getStats: async () => {
    try {
      const response = await api.get<ApiResponse<DashboardStats>>("/analytics");
      return normalizeStats(response.data);
    } catch (error) {
      if (!shouldFallback(error)) {
        throw error;
      }

      const response = await api.get<
        ApiResponse<{
          total: number;
          byStatus: Record<LeadStatus, number>;
          byPlan: Array<{ _id: string; count: number }>;
          recentCount: number;
        }>
      >("/inquiries/stats");
      return normalizeStats(response.data);
    }
  },

  update: async (
    id: string,
    payload: Partial<
      Pick<
        Inquiry,
        | "fullName"
        | "email"
        | "phone"
        | "companyName"
        | "selectedPlan"
        | "projectType"
        | "budget"
        | "timeline"
        | "message"
        | "requirements"
        | "status"
        | "source"
      >
    >
  ) => {
    try {
      const response = await api.patch<ApiResponse<{ lead: Inquiry }>>(
        `/leads/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      if (!shouldFallback(error)) {
        throw error;
      }

      const response = await api.patch<ApiResponse<{ inquiry: Inquiry }>>(
        `/inquiries/${id}`,
        payload
      );
      return {
        ...response.data,
        data: {
          lead: response.data.data.inquiry,
        },
      };
    }
  },

  delete: async (id: string) => {
    try {
      const response = await api.delete<ApiResponse<null>>(`/leads/${id}`);
      return response.data;
    } catch (error) {
      if (!shouldFallback(error)) {
        throw error;
      }

      const response = await api.delete<ApiResponse<null>>(`/inquiries/${id}`);
      return response.data;
    }
  },
};

export const contactAPI = {
  submit: async (payload: ContactFormData) => {
    const response = await api.post<ApiResponse<{ contact: Contact }>>("/contacts", payload);
    return response.data;
  },

  getAll: async () => {
    try {
      const response = await api.get<ContactListResponse>("/contacts");
      return response.data;
    } catch (error) {
      if (!shouldFallback(error)) {
        throw error;
      }

      return {
        success: true,
        message: "Contacts unavailable on current backend instance",
        data: {
          contacts: [],
          total: 0,
        },
      };
    }
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/contacts/${id}`);
    return response.data;
  },
};

export const pricingAPI = {
  getPublic: async () => {
    try {
      const response = await api.get<PricingPlanListResponse>("/pricing");
      return response.data;
    } catch (error) {
      if (!isOfflineOrNotFound(error)) {
        throw error;
      }

      return {
        success: true,
        message: "Using default pricing plans",
        data: {
          pricingPlans: defaultManagedPricingPlans,
        },
      };
    }
  },

  getAdmin: async () => {
    try {
      const response = await api.get<PricingPlanListResponse>("/pricing/admin");
      return response.data;
    } catch (error) {
      if (!shouldFallback(error)) {
        throw error;
      }

      return {
        success: true,
        message: "Using default pricing plans",
        data: {
          pricingPlans: defaultManagedPricingPlans,
        },
      };
    }
  },

  create: async (payload: Omit<ManagedPricingPlan, "_id" | "createdAt" | "updatedAt">) => {
    const response = await api.post<ApiResponse<{ pricingPlan: ManagedPricingPlan }>>(
      "/pricing",
      payload
    );
    return response.data;
  },

  update: async (
    id: string,
    payload: Partial<Omit<ManagedPricingPlan, "_id" | "createdAt" | "updatedAt">>
  ) => {
    const response = await api.patch<ApiResponse<{ pricingPlan: ManagedPricingPlan }>>(
      `/pricing/${id}`,
      payload
    );
    return response.data;
  },

  toggle: async (id: string) => {
    const response = await api.patch<ApiResponse<{ pricingPlan: ManagedPricingPlan }>>(
      `/pricing/${id}/toggle`
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/pricing/${id}`);
    return response.data;
  },
};

export const websiteSettingsAPI = {
  getPublic: async () => {
    try {
      const response = await api.get<WebsiteSettingsResponse>("/settings");
      return response.data;
    } catch (error) {
      if (!isOfflineOrNotFound(error)) {
        throw error;
      }

      return {
        success: true,
        message: "Using default website settings",
        data: {
          settings: defaultWebsiteSettings,
        },
      };
    }
  },

  update: async (payload: WebsiteSettings) => {
    const response = await api.put<ApiResponse<{ settings: WebsiteSettings }>>(
      "/settings",
      payload
    );
    return response.data;
  },
};

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/admin/login", {
      email,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get<ApiResponse<{ admin: AdminProfile }>>(
      "/admin/profile"
    );
    return response.data;
  },

  logout: async () => {
    const response = await api.post<ApiResponse<null>>("/admin/logout");
    return response.data;
  },
};

export type { DashboardStats };
