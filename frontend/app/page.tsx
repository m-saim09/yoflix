'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Sparkles, Zap, Shield, Rocket,
  Star, ChevronRight, CheckCircle, Globe, Users, Target,
  TrendingUp, Award, Heart, Mail, Phone, MapPin, Link,
  Share2, Camera, Code, Play, ShoppingCart
} from 'lucide-react';
import Hero from '@/components/sections/Hero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import PricingPreview from '@/components/sections/PricingPreview';

export default function Home() {
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden">

      {/* PURE WHITE BACKGROUND */}
      <div className="fixed inset-0 bg-white -z-10" />

      {/* HERO SECTION */}
     <Hero />
      {/* FEATURES */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-black mb-4">
              Everything You Need to{' '}
              <span className="text-[#FF9900]">Succeed</span>
            </h2>

            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Powerful features designed to help you build and scale your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              { icon: Zap, title: 'Lightning Performance' },
              { icon: Shield, title: 'Enterprise Security' },
              { icon: Globe, title: 'Global CDN' },
              { icon: Users, title: 'Team Collaboration' },
              { icon: Target, title: 'Advanced Analytics' },
              { icon: TrendingUp, title: 'SEO Optimized' },
            ].map((feature, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-xl"
              >

                <div className="w-14 h-14 rounded-2xl bg-[#FF9900]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#FF9900]" />
                </div>

                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500">
                  Premium feature experience with modern design.
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>

      <PricingPreview />
      <InquiryForm />

      {/* FOOTER */}
     

    </main>
  );
}