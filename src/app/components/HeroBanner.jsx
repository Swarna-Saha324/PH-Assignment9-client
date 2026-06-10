"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; 
import Link from "next/link"; // 
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
      <div className="w-full min-h-[550px] md:min-h-[620px] bg-[#0d193b] flex items-center justify-center">
        <div className="animate-pulse flex space-x-4 w-full max-w-7xl px-8">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-slate-800 rounded w-1/4"></div>
            <div className="h-10 bg-slate-800 rounded w-3/4"></div>
            <div className="h-4 bg-slate-800 rounded w-1/2"></div>
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
      bgClass: "from-[#0d193b] via-[#0f2354] to-[#0a122c]",
      btnGradient: "from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20",
      accentText: "from-blue-400 to-teal-400",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "24/7 Virtual Care & Instant Consultations",
      subtitle: "Expert advice anytime, anywhere",
      description: "No more long queues in waiting rooms. Get active digital prescriptions, direct expert emergency guides, and synchronized care analytics tracking system-wide.",
      bgClass: "from-[#0a1931] via-[#112a47] to-[#061020]", 
      btnGradient: "from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-emerald-500/20",
      accentText: "from-teal-400 to-emerald-400",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <div className="w-full bg-[#0d193b] select-none text-white overflow-hidden">
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
        className="mySwiper hero-swiper"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`w-full min-h-[550px] md:min-h-[620px] bg-gradient-to-br ${slide.bgClass} flex items-center py-12 md:py-0 border-b border-white/5`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  
                
                  <div className="space-y-6 text-left order-2 md:order-1">
                   
                    <div className="inline-flex items-center gap-1.5 bg-white/5 text-blue-400 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase backdrop-blur-md">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      {slide.subtitle}
                    </div>
                    
                   
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight tracking-tight">
                      {slide.title}
                    </h1>
                    
                    <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                   
                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link
                        href="/all-appointments"
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${slide.btnGradient} text-white font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all text-xs group transform hover:-translate-y-0.5`}
                      >
                        Book Appointment
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Side: Image Box with Glowing Background Blur */}
                  <div className="order-1 md:order-2 flex justify-center relative">
                    <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] z-10">
               
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl -z-10 transform scale-110 animate-pulse"></div>
                      
                  
                      {slide.image ? (
                        <Image
                          src={slide.image}
                          alt="Doctor Consultation"
                          fill
                          priority={slide.id === 1} 
                          unoptimized 
                          className="object-cover rounded-3xl shadow-2xl border border-white/10"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-900/50 rounded-3xl border border-white/5 flex items-center justify-center text-slate-500 text-xs">
                          Loading Image...
                        </div>
                      )}

                     
                      <div className="absolute -bottom-4 -left-6 bg-[#0a122c]/80 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 hidden sm:flex">
                        <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-400 border border-emerald-500/20">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Patients</p>
                          <p className="text-sm font-black text-white">25,000+</p>
                        </div>
                      </div>

                     
                      <div className="absolute top-8 -right-6 bg-[#0a122c]/80 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 hidden sm:flex">
                        <div className="bg-blue-500/10 p-2 rounded-xl text-blue-400 border border-blue-500/20">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top Specialists</p>
                          <p className="text-sm font-black text-white">450+ Experts</p>
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