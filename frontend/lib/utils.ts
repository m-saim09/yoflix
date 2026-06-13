import type { AdminProfile, InquiryFormData } from "./types";

// ==================== CLASS UTILITIES ====================
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// ==================== FORMAT UTILITIES ====================
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDatetime = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ==================== VALIDATION UTILITIES ====================
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateInquiry = (
  data: Partial<InquiryFormData>
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.fullName?.trim()) errors.fullName = 'Full name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  else if (!validateEmail(data.email)) errors.email = 'Invalid email address';

  if (!data.phone?.trim()) errors.phone = 'Phone number is required';
  else if (!validatePhone(data.phone)) errors.phone = 'Invalid phone number';

  if (!data.companyName?.trim()) errors.companyName = 'Company name is required';
  if (!data.selectedPlan) errors.selectedPlan = 'Please select a plan';
  if (!data.projectType) errors.projectType = 'Please select a project type';
  if (!data.budget) errors.budget = 'Please select a budget range';
  if (!data.timeline) errors.timeline = 'Please select a timeline';

  if (!data.message?.trim()) errors.message = 'Project description is required';
  else if (data.message.trim().length < 20)
    errors.message = 'Description must be at least 20 characters';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// ==================== STORAGE UTILITIES ====================
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  }
};

export const getAdmin = (): AdminProfile | null => {
  if (typeof window === 'undefined') return null;
  const admin = localStorage.getItem('admin');
  return admin ? (JSON.parse(admin) as AdminProfile) : null;
};

export const setAdmin = (admin: AdminProfile): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin', JSON.stringify(admin));
  }
};

// ==================== STRING UTILITIES ====================
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

export const truncateWords = (str: string, words: number): string => {
  const normalized = str.trim().split(/\s+/).filter(Boolean);
  if (normalized.length <= words) return str;
  return `${normalized.slice(0, words).join(' ')}...`;
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// ==================== ARRAY UTILITIES ====================
export const chunk = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// ==================== ANIMATION UTILITIES ====================
export const staggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

export const getRandomDelay = (min: number = 0, max: number = 0.5): number => {
  return Math.random() * (max - min) + min;
};
