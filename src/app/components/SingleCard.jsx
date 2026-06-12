"use client";

import React from "react";
import Image from "next/image";
import { Star, Briefcase, Building, ArrowRight } from "lucide-react";

export default function SingleCard({ doc, onViewDetails }) {

  if (!doc) return null;

  return (
    <div className="bg-[#0a122c]/80 rounded-2xl border border-white/5 p-5 shadow-xl hover:border-blue-500/30 transition-all flex flex-col justify-between group relative overflow-hidden backdrop-blur-sm">
      <div>
       
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#0d193b] mb-4">
          <Image 
            src={doc.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"} 
            alt={doc.name || "Doctor"} 
            fill 
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
         
          <div className="absolute top-3 right-3 bg-amber-500/90 text-slate-900 font-black text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
            {doc.rating ? Number(doc.rating).toFixed(1) : "4.5"}
          </div>
        </div>

       
        <div className="space-y-2 text-left">
          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-md">
            {doc.specialty || "General Specialist"}
          </span>
          <h3 className="text-lg font-bold text-slate-200 group-hover:text-blue-400 transition-colors pt-1">
            {doc.name}
          </h3>
          
          <div className="space-y-1.5 text-xs text-slate-400 font-medium">
            <p className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {doc.experience || "0+ Years"} Experience
            </p>
            <p className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-400 shrink-0" /> {doc.hospital || "Medical College"}
            </p>
          </div>
        </div>
      </div>

      
      <div className="border-t border-white/5 mt-5 pt-4 flex items-center justify-between">
        <div className="text-left">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Fee</p>
          <p className="text-base font-black text-emerald-400">{doc.fee || "500"} BDT</p>
        </div>
        
        <button
          onClick={() => onViewDetails(doc._id || doc.id)}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all"
        >
          Details
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}