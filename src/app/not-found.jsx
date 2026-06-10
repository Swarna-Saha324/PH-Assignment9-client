"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full bg-[#0d193b] min-h-screen flex items-center justify-center text-white font-sans relative overflow-hidden px-4">
      
     
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute -top-10 animate-bounce duration-1000">
            <Compass className="w-20 h-20 text-blue-500 stroke-[1.5] opacity-80 animate-spin [animation-duration:10s]" />
          </div>
          <h1 className="text-[120px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-400 to-slate-700 leading-none select-none">
            404
          </h1>
        </div>

       
        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-wide uppercase text-slate-200">
            Route Matrix Misaligned
          </h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            The medical coordinates or page you are looking for does not exist or has been relocated into another index partition.
          </p>
        </div>

        
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-blue-500/50"></div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          
          
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 bg-[#0a122c] hover:bg-[#0f1b44] border border-white/10 text-slate-300 font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" /> Go Back
          </button>

         
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10 transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          
        </div>

      </div>
    </div>
  );
}