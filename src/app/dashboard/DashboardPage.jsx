"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createAuthClient } from "better-auth/react";
import { 
  Calendar, Clock, User, Phone, DollarSign, Trash2, 
  Edit3, ShieldAlert, CheckCircle2, Mail, Camera, 
  Image as ImageIcon, LayoutDashboard, Briefcase, FileText 
} from "lucide-react";

const authClient = createAuthClient();

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending: authLoading } = authClient.useSession();
  
  // Tab State ("bookings" or "profile")
  const [activeTab, setActiveTab] = useState("bookings");
  
  // Global States
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Booking Update Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingUpdateLoading, setBookingUpdateLoading] = useState(false);

  // Profile Update Modal States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);

  // Route Protection & Appointments Loading
  useEffect(() => {
    if (!authLoading && !session) {
      router.push("/register");
      return;
    }

    if (session?.user?.email) {
      
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setBookingsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading appointments:", err);
          setBookingsLoading(false);
        });
    }
  }, [session, authLoading, router]);

  // Toast Helper
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ==========================================
  // 🔥 BOOKING CRUD OPERATIONS
  // ==========================================
  const openBookingUpdateModal = (booking) => {
    setCurrentBooking(booking);
    setPatientName(booking.patientName || "");
    setPatientPhone(booking.patientPhone || "");
    setSelectedSlot(booking.selectedSlot || "");
    setIsBookingModalOpen(true);
  };

  const handleBookingUpdateSave = async (e) => {
    e.preventDefault();
    setBookingUpdateLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/appointments/${currentBooking._id || currentBooking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientName, patientPhone, selectedSlot }),
      });

      if (response.ok) {
       
        setBookings(bookings.map(b => (b._id === currentBooking._id || b.id === currentBooking.id)
          ? { ...b, patientName, patientPhone, selectedSlot } : b
        ));
        triggerToast("Appointment updated successfully!");
        setIsBookingModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to update booking:", err);
    } finally {
      setBookingUpdateLoading(false);
    }
  };

  const handleBookingDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`http://localhost:5000/appointments/${id}`, { method: "DELETE" });
      if (response.ok) {
        // সঙ্গে সঙ্গে ইন্টারফেস থেকে রিমুভ (No Reload)
        setBookings(bookings.filter(b => b._id !== id && b.id !== id));
        triggerToast("Appointment deleted successfully!");
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  // ==========================================
  // 👤 PROFILE UPDATE OPERATIONS
  // ==========================================
  const openProfileModal = () => {
    setProfileName(session?.user?.name || "");
    setProfileImage(session?.user?.image || "");
    setIsProfileModalOpen(true);
  };

  const handleProfileUpdateSubmit = async (e) => {
    e.preventDefault();
    setProfileUpdateLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: profileName,
        image: profileImage,
      });

      if (!error) {
        triggerToast("Profile updated successfully!");
        setIsProfileModalOpen(false);
        router.refresh(); // Better-Auth সেশন ক্লায়েন্টে সিঙ্ক করার জন্য
      } else {
        alert(error.message);
      }
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setProfileUpdateLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d193b]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0d193b] min-h-screen py-10 text-white font-sans relative overflow-hidden">
      
      {/* 🔔 Glowing Global Toast Notifications */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#0a122c] border border-emerald-500/30 text-emerald-400 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in-down">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">{toast}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-blue-500" /> Dashboard
            </h1>
            <p className="text-slate-400 text-xs mt-1">Manage your centralized health schedules and user settings profile.</p>
          </div>

          {/* 🔘 Tab Toggles (স্ক্রিনশটের মতো ক্লিন ডিজাইন) */}
          <div className="flex bg-[#0a122c] p-1.5 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "bookings" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "profile" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              My Profile
            </button>
          </div>
        </div>

        {/* ==========================================
            TAB CONTENT: MY BOOKINGS
           ========================================== */}
        {activeTab === "bookings" && (
          <div>
            {bookingsLoading ? (
              <div className="py-20 text-center text-slate-400 text-sm">Loading your bookings portfolio...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 bg-[#0a122c]/40 rounded-2xl border border-white/5">
                <p className="text-slate-400 text-sm">No appointment tracks matching your profile found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                  <div key={booking._id || booking.id} className="bg-[#0a122c]/90 rounded-2xl border border-white/5 p-5 flex flex-col justify-between shadow-xl relative group hover:border-blue-500/20 transition-all">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-md font-extrabold text-slate-200">{booking.doctorName}</h3>
                          <p className="text-[11px] text-blue-400 font-bold uppercase tracking-wider mt-0.5">{booking.specialty}</p>
                        </div>
                        <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          {booking.status || "pending"}
                        </span>
                      </div>

                      <div className="border-t border-white/5 pt-3 space-y-2 text-xs text-slate-400">
                        <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-blue-400" /> {booking.selectedSlot}</p>
                        <p className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-blue-400" /> Patient: <span className="text-slate-200">{booking.patientName}</span></p>
                        <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-400" /> Contact: <span className="text-slate-200">{booking.patientPhone}</span></p>
                        {booking.reason && <p className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-blue-400" /> Reason: <span className="text-slate-300 italic">"{booking.reason}"</span></p>}
                        <p className="text-emerald-400 font-bold flex items-center gap-0.5 text-sm pt-1"><DollarSign className="w-4 h-4" /> {booking.fee} BDT</p>
                      </div>
                    </div>

                    {/* Action Panel Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-5 pt-3 border-t border-white/5">
                      <button 
                        onClick={() => openBookingUpdateModal(booking)}
                        className="inline-flex items-center justify-center gap-1 bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 text-blue-400 hover:text-white font-bold py-2 rounded-xl text-[11px] uppercase tracking-wider transition-all"
                      >
                        <Edit3 className="w-3 h-3" /> Update
                      </button>
                      <button 
                        onClick={() => handleBookingDelete(booking._id || booking.id)}
                        className="inline-flex items-center justify-center gap-1 bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 text-rose-400 hover:text-white font-bold py-2 rounded-xl text-[11px] uppercase tracking-wider transition-all"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB CONTENT: MY PROFILE
           ========================================== */}
        {activeTab === "profile" && (
          <div className="max-w-md mx-auto">
            <div className="bg-[#0a122c]/90 rounded-2xl border border-white/5 p-8 shadow-2xl text-center relative backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10"></div>
              
              <div className="flex flex-col items-center space-y-5">
                {/* Avatar Display */}
             <div className="relative w-24 h-24 rounded-full overflow-hidden">
  <div className="relative w-24 h-24 rounded-full border border-blue-500/30 p-1 bg-[#0d193b] overflow-hidden flex items-center justify-center mx-auto">
  <Image 
    src={session?.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
    alt="Profile Avatar"
    width={96}
    height={96}
    unoptimized // 👈 এটি গুগলের সার্ভার থেকে ইমেজটি কোনো বাধা ছাড়াই সরাসরি লোড করতে সাহায্য করবে
    className="object-cover rounded-full w-full h-full aspect-square"
  />
</div>
</div>
                </div>

                {/* Identity Cards */}
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-100 tracking-tight">{session?.user?.name}</h2>
                  <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-blue-400" /> {session?.user?.email}
                  </p>
                </div>

                <div className="w-full h-px bg-white/5 my-2"></div>

                <button
                  onClick={openProfileModal}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl shadow-md text-xs uppercase tracking-wider transition-all"
                >
                  Update Profile
                </button>
              </div>
            </div>
          
          
        )}
        

      </div>

      {/* ==========================================
          MODAL WINDOW: UPDATE APPOINTMENT
         ========================================== */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a122c] w-full max-w-md rounded-2xl border border-white/10 p-6 space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-xs font-black tracking-wider uppercase text-slate-300">Edit Booking Data</h2>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleBookingUpdateSave} className="space-y-4">
              {/* LOCK FIELD: Doctor Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-blue-500" /> Doctor Info (Read-Only)</label>
                <input type="text" readOnly value={currentBooking?.doctorName} className="w-full bg-[#0d193b]/50 px-4 py-2.5 rounded-xl border border-white/5 text-xs text-slate-500 cursor-not-allowed focus:outline-none" />
              </div>

              {/* LOCK FIELD: User Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-blue-500" /> Email Token (Read-Only)</label>
                <input type="text" readOnly value={session?.user?.email} className="w-full bg-[#0d193b]/50 px-4 py-2.5 rounded-xl border border-white/5 text-xs text-slate-500 cursor-not-allowed focus:outline-none" />
              </div>

              {/* EDIT FIELD: Patient Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Name</label>
                <input type="text" required value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full bg-[#0d193b] px-4 py-2.5 rounded-xl border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500" />
              </div>

              {/* EDIT FIELD: Patient Phone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Contact</label>
                <input type="tel" required value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} className="w-full bg-[#0d193b] px-4 py-2.5 rounded-xl border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500" />
              </div>

              {/* EDIT FIELD: Selected Slot */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Slot</label>
                <input type="text" required value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} className="w-full bg-[#0d193b] px-4 py-2.5 rounded-xl border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500" />
              </div>

              <button type="submit" disabled={bookingUpdateLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider disabled:opacity-50">
                {bookingUpdateLoading ? "Saving Updates..." : "Confirm Modifications"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL WINDOW: UPDATE USER PROFILE
         ========================================== */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a122c] w-full max-w-md rounded-2xl border border-white/10 p-6 space-y-4 text-white">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-xs font-black tracking-wider uppercase text-slate-300">Modify Profile Meta</h2>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleProfileUpdateSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Display Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    required 
                    value={profileName} 
                    onChange={(e) => setProfileName(e.target.value)} 
                    className="w-full bg-[#0d193b] pl-10 pr-4 py-2.5 rounded-xl border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              {/* Photo Image String URL */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avatar URL String</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="url" 
                    required 
                    value={profileImage} 
                    onChange={(e) => setProfileImage(e.target.value)} 
                    className="w-full bg-[#0d193b] pl-10 pr-4 py-2.5 rounded-xl border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500" 
                  />
                </div>
              </div>

              <button type="submit" disabled={profileUpdateLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider disabled:opacity-50">
                {profileUpdateLoading ? "Syncing Identity..." : "Save Identity Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}