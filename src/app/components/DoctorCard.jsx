"use client";

import React from "react";
import Image from "next/image";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";

export default function DoctorCard({ doctor, onViewDetails }) {
  return (
    <div className="bg-[#0a122c]/90 rounded-2xl shadow-xl border border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group backdrop-blur-md relative">
      
      {/* 🎨 টপ গ্লোয়িং ব্যাকগ্রাউন্ড ইফেক্ট */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none transition-all group-hover:bg-blue-500/20"></div>

      {/* Card Thumbnail Box */}
      <div className="relative w-full h-48 bg-[#0d193b] overflow-hidden border-b border-white/5">
        <Image
          src={doctor.image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"}
          alt={doctor.name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* 🎨 স্পেশাল্টি ব্যাজ কালার */}
        <span className="absolute top-4 right-4 bg-blue-600/90 text-white text-[10px] px-3 py-1.5 rounded-full font-bold tracking-wider uppercase border border-white/10 backdrop-blur-sm">
          {doctor.specialty}
        </span>
      </div>

      {/* Card Meta Content */}
      <div className="p-6 flex-grow space-y-4">
        <div>
          {/* 🎨 মেইন টেক্সট সিলভার গ্রেডিয়েন্ট */}
          <h3 className="text-lg font-black text-slate-100 group-hover:text-blue-400 transition-colors truncate">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
            <Briefcase className="w-4 h-4 shrink-0 text-blue-400" />
            <span>{doctor.experience} Experience</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {doctor.description}
        </p>

        <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="truncate text-slate-400">{doctor.hospital}</span>
          </div>
          <div className="flex items-center justify-between font-bold pt-1">
            {/* 🎨 ফি টেক্সট কালার */}
            <div className="flex items-center gap-0.5 text-emerald-400 font-black text-sm">
              <DollarSign className="w-4 h-4 shrink-0" />
              <span>{doctor.fee} BDT</span>
            </div>
            
            {/* Conditional Availability Slot Protection */}
            {doctor.availability && doctor.availability.length > 0 && (
              <div className="flex items-center gap-1 text-amber-400 text-[10px] bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{doctor.availability[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button Layer (হিরো ও ডিটেইলস পেজের সাথে ম্যাচিং গ্রেডিয়েন্ট বাটন) */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onViewDetails(doctor.id || doctor._id)}
          className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/10 transition-all duration-200 text-xs uppercase tracking-wider transform active:scale-[0.98]"
        >
          View Details
        </button>
      </div>

    </div>
  );
}