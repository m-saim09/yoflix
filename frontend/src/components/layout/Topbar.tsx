"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

const FacebookIcon = ({ size = 18, ...props }: { size?: number | string; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18, ...props }: { size?: number | string; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
    <circle cx={12} cy={12} r={3.5} />
    <circle cx={17.5} cy={6.5} r={0.5} />
  </svg>
);

export default function TopBar() {
  return (
    <div className="hidden md:block w-full border-b border-white/10 bg-[#071226]/20 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-[44px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[13px] text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              <Mail size={16} className="text-[#D4AF37]" />
              <span className="truncate">shahidmaqbool380@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://www.facebook.com/profile.php?id=100072278118052"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:shadow-[0_0_0_8px_rgba(212,175,55,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            >
              <FacebookIcon />
              <span className="sr-only">Facebook</span>
            </Link>

            <Link
              href="https://www.instagram.com/shahidmaqboolengineering/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:shadow-[0_0_0_8px_rgba(212,175,55,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/40"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
