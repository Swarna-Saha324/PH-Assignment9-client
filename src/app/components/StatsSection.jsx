import React from "react";

export default function StatsSection() {
  const stats = [
    { value: "99.2%", label: "Satisfaction Rate" },
    { value: "24k+", label: "Appointments Set" },
    { value: "150+", label: "Top Specialists" },
    { value: " Dhaka", label: "Chamber Coverage" }
  ];

  return (
    <section className="py-12 bg-[#0d193b] text-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#0a122c]/50 rounded-2xl border border-white/5 backdrop-blur-sm grid grid-cols-2 md:grid-cols-4 gap-6 p-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 border-r last:border-0 border-white/5">
              <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {stat.value}
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}