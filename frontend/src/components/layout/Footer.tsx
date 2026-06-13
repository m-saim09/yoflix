"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Linkedin,
  Facebook,
  Instagram,
  ShieldCheck,
  Building2,
  Wrench,
  HardHat,
} from "lucide-react";

import { NAVIGATION_LINKS, SITE_NAME } from "@/lib/constants";
import { useWebsiteSettings } from "@/hooks/useWebsiteContent";

export default function Footer() {
  const { settings } = useWebsiteSettings();

  const websiteName =
    settings.businessInfo.websiteName || SITE_NAME;

  return (
    <footer className="bg-[#F8F6F1] border-t border-[#D4AF37]/20">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr]">
          
          {/* COMPANY INFO */}
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt={websiteName}
                width={65}
                height={65}
                className="object-contain"
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Engineering Excellence
                </p>

                <h2 className="text-3xl font-bold text-[#08101D]">
                  {settings.businessInfo.companyName}
                </h2>
              </div>
            </div>

            <p className="mt-6 max-w-md text-[16px] leading-8 text-neutral-600">
              {settings.businessInfo.footerDescription}
            </p>

            {/* TRUST BADGES */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-neutral-700">
                <Building2 size={18} className="text-[#D4AF37]" />
                Industrial Projects
              </div>

              <div className="flex items-center gap-2 text-neutral-700">
                <Wrench size={18} className="text-[#D4AF37]" />
                EPC Solutions
              </div>

              <div className="flex items-center gap-2 text-neutral-700">
                <HardHat size={18} className="text-[#D4AF37]" />
                Expert Engineers
              </div>

              <div className="flex items-center gap-2 text-neutral-700">
                <ShieldCheck size={18} className="text-[#D4AF37]" />
                Quality Assured
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/inquiry"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#08101D] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C59E28] hover:shadow-lg"
            >
              Get Free Consultation
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* SOCIALS */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#08101D] transition hover:bg-[#D4AF37] hover:text-white"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#08101D] transition hover:bg-[#D4AF37] hover:text-white"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#08101D] transition hover:bg-[#D4AF37] hover:text-white"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-bold text-[#08101D]">
              Quick Links
            </h3>

            <div className="mt-7 space-y-4">
              {NAVIGATION_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-[15px] text-neutral-600 transition hover:translate-x-1 hover:text-[#D4AF37]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-bold text-[#08101D]">
              Contact Information
            </h3>

            <div className="mt-7 space-y-6">
              <a
                href={`mailto:${settings.contactInfo.businessEmail}`}
                className="flex items-start gap-3 text-neutral-700 transition hover:text-[#D4AF37]"
              >
                <Mail
                  className="mt-1 h-5 w-5 text-[#D4AF37]"
                />
                <span>{settings.contactInfo.businessEmail}</span>
              </a>

              <a
                href={`tel:${settings.contactInfo.phoneNumber}`}
                className="flex items-start gap-3 text-neutral-700 transition hover:text-[#D4AF37]"
              >
                <Phone
                  className="mt-1 h-5 w-5 text-[#D4AF37]"
                />
                <span>{settings.contactInfo.phoneNumber}</span>
              </a>

              <a
                href="#"
                className="flex items-start gap-3 text-neutral-700 transition hover:text-[#D4AF37]"
              >
                <MapPin
                  className="mt-1 h-5 w-5 text-[#D4AF37]"
                />
                <span>
                  {settings.contactInfo.officeAddress}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-y border-[#D4AF37]/20 py-10 md:grid-cols-4">
          <div>
            <h4 className="text-3xl font-bold text-[#08101D]">
              200+
            </h4>
            <p className="text-sm text-neutral-500">
              Projects Delivered
            </p>
          </div>

          <div>
            <h4 className="text-3xl font-bold text-[#08101D]">
              15+
            </h4>
            <p className="text-sm text-neutral-500">
              Years Experience
            </p>
          </div>

          <div>
            <h4 className="text-3xl font-bold text-[#08101D]">
              50+
            </h4>
            <p className="text-sm text-neutral-500">
              Engineers
            </p>
          </div>

          <div>
            <h4 className="text-3xl font-bold text-[#08101D]">
              100%
            </h4>
            <p className="text-sm text-neutral-500">
              Client Satisfaction
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col gap-4 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {websiteName}. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>
          </div>

          <p>{settings.businessInfo.tagline}</p>
        </div>
      </div>
    </footer>
  );
}