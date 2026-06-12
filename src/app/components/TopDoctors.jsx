"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import SingleCard from "./SingleCard"; 

export default function TopDoctors() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [topDoctors, setTopDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/doctors`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return res.json();
      })
      .then((data) => {
       
        const doctorsArray = Array.isArray(data) ? data : data.doctors || [];
        
      
        const sorted = [...doctorsArray]
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3);

        setTopDoctors(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top doctors:", err);
       
        setLoading(false); 
      });
  }, []);

  const handleViewDetails = (id) => {
    if (!session) {
      toast.warning("Please login first to view doctor details!");
      router.push(`/login?callbackUrl=${encodeURIComponent(`/doctors/${id}`)}`);
    } else {
      router.push(`/doctors/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400 bg-[#0d193b]">
       
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm font-medium tracking-wide">Loading top rated specialists...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#0d193b] text-white">
      <div className="max-w-6xl mx-auto px-4">
        
       
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Highly Reviewed
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Our Top Rated Specialists
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Book appointments with our most trusted and highly reviewed medical experts.
          </p>
        </div>

       
        {topDoctors.length === 0 ? (
          <p className="text-center text-slate-500 py-6">No premium doctor profiles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topDoctors.map((doc) => (
              <SingleCard 
                key={doc._id || doc.id} 
                doc={doc} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}