"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // 👈 1. Next.js Image component import kora holo
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Calendar, ShieldCheck, Users, ArrowRight } from "lucide-react";

// Swiper standard CSS styles import
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-[550px] md:min-h-[620px] bg-gradient-to-r from-blue-50 to-indigo-100/50 flex items-center justify-center">
        <div className="animate-pulse flex space-x-4 w-full max-w-7xl px-8">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-10 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const slidesData = [
    {
      id: 1,
      title: "Your Health Is Our Top Priority",
      subtitle: "Find Best Doctors near you",
      description: "Connect with certified medical specialists instantly. Book hassle-free appointments and get top-tier healthcare facilities directly from your home dashboard.",
      bgClass: "from-blue-50 to-indigo-100/50",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "24/7 Virtual Care & Instant Consultations",
      subtitle: "Expert advice anytime, anywhere",
      description: "No more long queues in waiting rooms. Get active digital prescriptions, direct expert emergency guides, and synchronized care analytics tracking system-wide.",
      bgClass: "from-teal-50 to-emerald-100/40",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <div className="w-full bg-white select-none">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`w-full min-h-[550px] md:min-h-[620px] bg-gradient-to-r ${slide.bgClass} flex items-center py-12 md:py-0`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Side: Copywriting */}
                  <div className="space-y-6 text-left order-2 md:order-1">
                    <div className="inline-flex items-center gap-1.5 bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      {slide.subtitle}
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                      {slide.title}
                    </h1>
                    
                    <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <a
                        href="/all-appointments"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm group"
                      >
                        Book Appointment
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Image Box with next/image optimization */}
                  <div className="order-1 md:order-2 flex justify-center relative">
                    {/* 🚨 Container box must have explicit relative layout mapping for fill strategy */}
                    <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] z-10">
                      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl -z-10 transform scale-105"></div>
                      
                      {/* 🛠️ Sothik Next.js Image component implementation */}
                      <Image
                        src={slide.image}
                        alt="Doctor Consultation"
                        fill
                        priority={slide.id === 1} // 👈 First slide-er image ta direct prioritize load hobe
                        unoptimized // 👈 External domain bypass config-er joruri simple workaround
                        className="object-cover rounded-3xl shadow-2xl border-4 border-white/80"
                      />

                      {/* Float Badge: Total Patients */}
                      <div className="absolute -bottom-4 -left-6 bg-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 hidden sm:flex">
                        <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-medium">Active Patients</p>
                          <p className="text-sm font-bold text-gray-800">25,000+</p>
                        </div>
                      </div>

                      {/* Float Badge: Top Specialists */}
                      <div className="absolute top-8 -right-6 bg-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 hidden sm:flex">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-medium">Top Specialists</p>
                          <p className="text-sm font-bold text-gray-800">450+ Experts</p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}