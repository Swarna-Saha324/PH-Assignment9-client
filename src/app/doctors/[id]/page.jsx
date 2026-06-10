"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { createAuthClient } from "better-auth/react"; 
import { ArrowLeft, MapPin, DollarSign, Clock, Briefcase, Building, CheckCircle2, User, Phone, Shield } from "lucide-react";

const authClient = createAuthClient();

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // Auth State
  const { data: session, isPending: authLoading } = authClient.useSession();
  
  // State Initialization
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form Field States
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/doctors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Doctor profiles indexing error");
        return res.json();
      })
      .then((data) => {
        setDoctor(data);
        if (data.availability && data.availability.length > 0) {
          setSelectedSlot(data.availability[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading profile matrix data:", err);
        setLoading(false);
      });
  }, [id]);

  // 🛠️ বুকিং বাটন ক্লিক হ্যান্ডলার (লগইন চেক)
  const handleOpenBookingModal = () => {
    if (!session) {
      // ইউজার লগইন না থাকলে সাইন-ইন পেজে পাঠিয়ে দেওয়া হবে
      router.push("/register");
      return;
    }
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !patientName || !patientPhone) {
      alert("Please enter patient documentation fields and choose a time slot.");
      return;
    }

    setBookingLoading(true);

    const appointmentPayload = {
      doctorId: doctor.id || doctor._id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      selectedSlot: selectedSlot,
      fee: doctor.fee,
      patientName: patientName,
      patientPhone: patientPhone,
      userEmail: session?.user?.email, // ট্র্যাকিংয়ের জন্য ইউজারের ইমেইল অ্যাড করা হলো
      status: "pending"
    };

    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentPayload),
      });
      const data = await response.json();

      if (data.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setBookingSuccess(false);
          router.push("/"); 
        }, 2000);
      }
    } catch (err) {
      console.error("Booking verification failed:", err);
      alert("Something went wrong. Please check your network backend connection.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d193b]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d193b] text-white">
        <p className="text-xl font-semibold text-slate-400">No doctor tracking profile matching found.</p>
        <button onClick={() => router.push("/all-appointments")} className="mt-4 text-blue-400 font-bold hover:underline">
          Back to list grid
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0d193b] min-h-screen py-10 font-sans text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Navigation Action Pointer */}
        <button 
          onClick={() => router.push("/all-appointments")} 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-blue-400 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Appointments
        </button>

        {/* Profile Card Box (ডার্ক লাক্সারি স্টাইল) */}
        <div className="bg-[#0a122c]/90 rounded-3xl border border-white/5 shadow-2xl overflow-hidden p-6 sm:p-10 backdrop-blur-md relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Visual Profile Cover Slot */}
            <div className="relative w-full aspect-square md:h-64 rounded-2xl overflow-hidden border border-white/10 bg-[#0d193b]">
              <Image 
                src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"} 
                alt={doctor.name} 
                fill 
                unoptimized 
                className="object-cover"
              />
            </div>

            {/* Profile Meta Content */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold tracking-wide uppercase text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {doctor.specialty}
                </span>
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mt-2 leading-tight">
                  {doctor.name}
                </h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-blue-400" /> {doctor.experience} Experience</span>
                  <span className="flex items-center gap-1"><Building className="w-4 h-4 text-blue-400" /> {doctor.hospital}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <h3 className="text-base font-bold text-slate-200">Biography / Overview</h3>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{doctor.description}</p>
              </div>

              {/* Consultation Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#0d193b]/60 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Chamber Location</p>
                    <p className="text-sm font-semibold text-slate-200">{doctor.location || "Dhanmondi, Dhaka"}</p>
                  </div>
                </div>
                <div className="bg-[#0d193b]/60 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Consultation Fee</p>
                    <p className="text-sm font-black text-emerald-400">{doctor.fee} BDT</p>
                  </div>
                </div>
              </div>

              {/* Book Appointment Trigger Button (কালার ও রিডাইরেক্ট ফিচার আপগ্রেড করা হয়েছে) */}
              <div className="pt-4">
                <button
                  onClick={handleOpenBookingModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-xs uppercase tracking-wider transform hover:-translate-y-0.5"
                >
                  Book Appointment
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* 🛠️ APPOINTMENT BOOKING DIALOG WINDOW / MODAL (ডার্ক প্রিমিয়াম ডিজাইন) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
            <div className="bg-[#0a122c] w-full max-w-md rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform transition-transform p-6 space-y-6 relative text-white">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10"></div>

              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h2 className="text-lg font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Appointment Booking</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-slate-400 hover:text-white font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              {bookingSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
                  <p className="text-sm text-slate-400">Syncing database and returning...</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter full name" 
                        className="w-full bg-[#0d193b]/80 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 text-sm text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input 
                        type="tel" 
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="Enter mobile number" 
                        className="w-full bg-[#0d193b]/80 pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500 text-sm text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* Time Slots Radio Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Time Slot</label>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                      {doctor.availability?.map((slot, index) => (
                        <label 
                          key={index} 
                          className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedSlot === slot 
                              ? "border-blue-500 bg-blue-500/10 text-white font-bold" 
                              : "border-white/5 bg-[#0d193b]/40 text-slate-400 hover:bg-[#0d193b]/80"
                          }`}
                        >
                          <span className="text-xs flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {slot}
                          </span>
                          <input
                            type="radio"
                            name="timeSlot"
                            value={slot}
                            checked={selectedSlot === slot}
                            onChange={() => setSelectedSlot(slot)}
                            className="hidden"
                          />
                          {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Total Pricing Box */}
                  <div className="bg-[#0d193b]/60 p-4 rounded-xl flex justify-between items-center text-xs text-slate-400 border border-white/5">
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-400" /> Total Fee (Pay at Chamber):</span>
                    <span className="font-black text-emerald-400 text-sm">{doctor.fee} BDT</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-xs uppercase tracking-wider disabled:opacity-50"
                  >
                    {bookingLoading ? "Processing Booking..." : "Confirm Appointment"}
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}