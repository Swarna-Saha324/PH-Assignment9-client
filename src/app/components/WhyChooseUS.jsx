import React from "react";
import { ShieldCheck, CalendarDays, Award } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-[#0a122c] border-y border-white/5 text-white">
          <h2 className="text-3xl md:text-4xl text-center font-black text-white py-3">
           Why Choose Us?
          </h2>
      <div className="max-w-6xl mx-auto px-4 py-2.5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.01] transition-colors group">
            <div className="p-3 bg-[#0d193b] rounded-xl border border-white/5 group-hover:border-blue-500/30 h-fit transition-all shadow-md">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-200">Certified Experts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">All doctors undergo rigorous verification and credential mapping before listing.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.01] transition-colors group">
            <div className="p-3 bg-[#0d193b] rounded-xl border border-white/5 group-hover:border-blue-500/30 h-fit transition-all shadow-md">
              <CalendarDays className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-200">Instant Slots Matrix</h3>
              <p className="text-xs text-slate-400 leading-relaxed">View real-time slot availability maps and secure your schedule in under a minute.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/[0.01] transition-colors group">
            <div className="p-3 bg-[#0d193b] rounded-xl border border-white/5 group-hover:border-blue-500/30 h-fit transition-all shadow-md">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-200">Secure Privacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Your personal medical logs, session cookies, and credentials are locked safely.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}