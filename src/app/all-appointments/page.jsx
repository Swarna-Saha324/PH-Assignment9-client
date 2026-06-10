"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DoctorCard from "../components/DoctorCard"; // 👈 New Component Imported Here

export default function AllAppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock Authentication Variable Logic State
  const isAuthenticated = true; 

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading docs:", err));
  }, []);

  const handleViewDetails = (targetId) => {
    if (isAuthenticated) {
      router.push(`/doctors/${targetId}`);
    } else {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Available Medical Appointments
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Book certified expert doctors instantly across multiple medical specialties.
          </p>
        </div>

        {/* 🚀 Super Clean Doctor Grid Layout with Mapping Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard 
              key={doctor._id || doctor.id} 
              doctor={doctor} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </div>

      </div>
    </div>
  );
}