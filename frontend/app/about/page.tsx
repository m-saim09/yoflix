'use client';

import {
  Users,
  Target,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="w-full bg-[#f7f8f5] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#d9f99d] flex items-center justify-center shadow-sm">
            <Users className="text-[#6dbb1a]" size={24} />
          </div>

          <div>
            <p className="text-[#6dbb1a] font-semibold tracking-wide uppercase text-sm">
              About Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111827]">
              Helping eBay sellers grow smarter
            </h2>
          </div>
        </div>

        {/* Intro */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mt-14">

          {/* Left Side */}
          <div>
            <p className="text-lg leading-8 text-gray-600">
              Yoflix LLC is a professional eCommerce service company
              specializing in Virtual Assistant and digital marketing
              solutions for eBay sellers. We help businesses scale through
              expert store management, product hunting, listing optimization,
              and customer support.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#d9f99d] flex items-center justify-center">
                  <Target className="text-[#6dbb1a]" size={22} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#111827]">
                    Our Mission
                  </h3>

                  <p className="text-gray-600 mt-2 leading-7">
                    Empower eBay sellers with smart and result-driven
                    eCommerce solutions for sustainable business growth.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#d9f99d] flex items-center justify-center">
                  <Rocket className="text-[#6dbb1a]" size={22} />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#111827]">
                    Our Vision
                  </h3>

                  <p className="text-gray-600 mt-2 leading-7">
                    Become a trusted global eCommerce growth partner for
                    online sellers and digital brands.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="relative">

            <div className="absolute -top-8 -right-8 w-52 h-52 bg-[#d9f99d] blur-3xl opacity-30 rounded-full"></div>

            <div className="relative bg-white border border-[#d9f99d] rounded-[32px] p-8 md:p-10 shadow-xl">

              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#d9f99d] flex items-center justify-center">
                  <TrendingUp className="text-[#6dbb1a]" size={28} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111827]">
                    Why Choose Us?
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Built for serious eCommerce growth
                  </p>
                </div>
              </div>

              <div className="space-y-5">

                {[
                  'Experienced eCommerce VA Team',
                  'Specialized support for eBay businesses',
                  'Expert product hunting & listing optimization',
                  'Private Label & Dropshipping expertise',
                  'Reliable customer support',
                  'Growth-focused digital marketing',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1">
                      <CheckCircle2
                        size={20}
                        className="text-[#6dbb1a]"
                      />
                    </div>

                    <p className="text-gray-700 leading-7">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Card */}
              <div className="mt-10 p-6 rounded-2xl bg-[#f7f8f5] border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#2563eb] flex items-center justify-center shadow-lg">
                  <ShieldCheck className="text-white" size={28} />
                </div>

                <div>
                  <h4 className="font-semibold text-[#111827] text-lg">
                    Trusted Growth Partner
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    Professional strategies designed to help your
                    eBay business scale faster.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}