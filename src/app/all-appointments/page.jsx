"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DoctorCard from "../components/DoctorCard";
import { Search } from "lucide-react"; // 👈 সার্চ আইকনের জন্য লিম্পোর্ট করা হয়েছে

export default function AllAppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 👈 সার্চ কুয়েরি স্টেট
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading docs:", err);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (targetId) => {
    router.push(`/doctors/${targetId}`);
  };

  // 🔍 ডক্টরের নাম ধরে ফিল্টার করার লজিক (Case-insensitive)
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d193b]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0d193b] min-h-screen py-12 font-sans text-white overflow-hidden relative">
      {/* 🎨 ব্যাকগ্রাউন্ড গ্লোয়িং অ্যাম্বিয়েন্ট লাইট ইফেক্টস */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight sm:text-4xl leading-tight">
            Available Medical Appointments
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Book certified expert doctors instantly across multiple medical specialties with real-time tracking dashboard.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mt-4 shadow-lg shadow-blue-500/50"></div>
        </div>

        {/* 🔍 💻 প্রিমিয়াম ডার্ক মেটালিক সার্চ বার সেকশন */}
        <div className="max-w-md mx-auto mb-14">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search expert doctors by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a122c]/90 text-sm text-slate-100 placeholder-slate-500 pl-11 pr-4 py-3.5 rounded-2xl border border-white/5 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all shadow-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold uppercase text-slate-500 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 🚀 Super Clean Doctor Grid Layout with Real-time Filtering */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20 bg-[#0a122c]/50 rounded-3xl border border-white/5">
            <p className="text-slate-400 font-medium">
              {doctors.length === 0 
                ? "No doctors are available at the moment." 
                : `No expert matching "${searchQuery}" found.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard 
                key={doctor._id || doctor.id} 
                doctor={doctor} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}