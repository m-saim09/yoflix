"use client";

import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  style?: CSSProperties;
};

const styles = {
  primary:
    "bg-[linear-gradient(135deg,#e2f3ff_0%,#7dd3fc_0%,#2563eb_100%)] text-white shadow-[0_16px_48px_rgba(37,99,235,0.35)]",
  secondary:
    "border border-white/12 bg-white/6 text-white backdrop-blur-xl hover:bg-white/10",
  ghost: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
};

export function Button({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  style,
}: ButtonProps) {
  const content = (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200",
        styles[variant],
        className
      )}
      style={style}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
}
