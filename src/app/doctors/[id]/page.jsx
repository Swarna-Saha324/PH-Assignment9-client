"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, DollarSign, Clock, Briefcase, Building, CheckCircle2, User, Phone, Shield } from "lucide-react";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
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
    // Dynamic single doctor profile endpoint parameters map lookup
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
          router.push("/"); // Direct fallback redirect after complete booking flow
        }, 2000);
      }
    } catch (err) {
      console.error("Booking verification failed:", err);
      alert("Something went wrong. Please check your network backend connection.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-600">No doctor tracking profile matching found.</p>
        <button onClick={() => router.push("/all-appointments")} className="mt-4 text-blue-600 font-bold hover:underline">
          Back to list grid
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Navigation Action Pointer */}
        <button 
          onClick={() => router.push("/all-appointments")} 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Appointments
        </button>

        {/* Profile Card Summary Context Element Layout */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Visual Profile Cover Slot */}
            <div className="relative w-full aspect-square md:h-64 rounded-2xl overflow-hidden border-2 border-gray-100 bg-gray-50">
              <Image 
                src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"} 
                alt={doctor.name} 
                fill 
                unoptimized 
                className="object-cover"
              />
            </div>

            {/* Profile Meta Content Matrix Box */}
            <div className="md:col-span-2 space-y-5">
              <div>
                <span className="bg-blue-600/10 text-blue-600 font-bold tracking-wide uppercase text-xs px-3 py-1 rounded-full">
                  {doctor.specialty}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{doctor.name}</h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-blue-500" /> {doctor.experience} Experience</span>
                  <span className="flex items-center gap-1"><Building className="w-4 h-4 text-blue-500" /> {doctor.hospital}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-base font-bold text-gray-800">Biography / Overview</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{doctor.description}</p>
              </div>

              {/* Consultation Details Box Structure Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Chamber Location</p>
                    <p className="text-sm font-semibold text-gray-800">{doctor.location || "Dhanmondi, Dhaka"}</p>
                  </div>
                </div>
                <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Consultation Fee</p>
                    <p className="text-sm font-bold text-emerald-600">{doctor.fee} BDT</p>
                  </div>
                </div>
              </div>

              {/* Modal Core Call Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-sm uppercase tracking-wider"
                >
                  Book Appointment
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* 🛠️ APPOINTMENT BOOKING DIALOG WINDOW / MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-transform p-6 space-y-6">
              
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h2 className="text-lg font-bold text-gray-900">Appointment Booking</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-600 font-semibold p-1"
                >
                  ✕
                </button>
              </div>

              {bookingSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Booking Confirmed!</h3>
                  <p className="text-sm text-gray-500">Syncing database and returning...</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  {/* Name Fields Entry */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Patient Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter full name" 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Phone Fields Entry */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        type="tel" 
                        required
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="Enter mobile number" 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Time Slots Radio Matrix selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Select Time Slot</label>
                    <div className="grid grid-cols-1 gap-2">
                      {doctor.availability?.map((slot, index) => (
                        <label 
                          key={index} 
                          className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedSlot === slot 
                              ? "border-blue-600 bg-blue-50/40 text-blue-700 font-bold" 
                              : "border-gray-100 bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-xs flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
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
                          {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Overview Protection Guard */}
                  <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center text-xs text-gray-500 border border-gray-100">
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-500" /> Total Fee (Pay at Chamber):</span>
                    <span className="font-bold text-emerald-600 text-sm">{doctor.fee} BDT</span>
                  </div>

                  {/* Trigger Call Action Button */}
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wide disabled:opacity-50"
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