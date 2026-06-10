"use client";

import React, { useState } from "react";
import { Stethoscope, Menu, X, LogOut } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { useRouter, usePathname } from "next/navigation"; // 🛠️ usePathname ইম্পোর্ট করা হয়েছে
import Link from "next/link"; 
import Image from "next/image"; 

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 🛠️ বর্তমান পেজের পাথ ট্র্যাক করার জন্য হুক

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      alert("Logged out successfully.");
      router.push("/signIn");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All Appointment", href: "/all-appointments" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="w-full border-b border-white/5 bg-[#0d193b]/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-black text-white tracking-wide">
              <Stethoscope className="w-6 h-6 stroke-[2.5] text-blue-500" />
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                DocAppoint
              </span>
            </Link>
          </div>

          {/* 2. Desktop Links (ডাইনামিক অ্যাক্টিভ স্টাইল সহ) */}
          <div className="hidden sm:flex space-x-8">
            {menuItems.map((item) => {
              // 🛠️ চেক করা হচ্ছে এই লিংকটিই বর্তমান পেজ কি না
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  // isActive সত্য হলে টেক্সট উজ্জ্বল নীল (text-blue-400) হবে, না হলে নরমাল ধূসর (text-slate-400) থাকবে
                  className={`font-semibold transition-colors text-sm tracking-wide py-1 relative ${
                    isActive 
                      ? "text-blue-400 font-bold" 
                      : "text-slate-400 hover:text-blue-400"
                  }`}
                >
                  {item.label}
                  {/* 🛠️ কাস্টম টাচ: অ্যাক্টিভ পেজের নিচে একটি সুন্দর ছোট নীল ডট বা বার দেখাবে */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 3. Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded-xl bg-slate-950/40">
                  {user.image ? (
                    <Image 
                      src={user.image} 
                      alt={user.name || "User Avatar"} 
                      width={24} 
                      height={24}
                      className="rounded-full object-cover border border-blue-500/50" 
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-300">{user.name || "User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold uppercase tracking-wider bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className={`text-sm font-bold transition-colors ${pathname === "/signIn" ? "text-blue-400" : "text-slate-300 hover:text-white"}`}>
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-md transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 hover:text-white p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile Drawer Links (মোবাইলেও অ্যাক্টিভ পাথ হাইলাইট) */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-white/5 bg-[#0d193b] px-4 pt-2 pb-6 space-y-2 shadow-2xl">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive 
                    ? "bg-blue-600/10 text-blue-400 border-l-4 border-blue-500" 
                    : "text-slate-300 hover:bg-white/5 hover:text-blue-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.image && (
                    <Image 
                      src={user.image} 
                      alt={user.name || "User Avatar"} 
                      width={32} 
                      height={32} 
                      className="rounded-full object-cover border border-blue-500" 
                    />
                  )}
                  <span className="text-sm font-semibold text-white">Hello, {user.name || user.email}!</span>
                </div>
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-bold rounded-xl">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 px-2">
                <Link href="/signIn" onClick={() => setIsMenuOpen(false)} className={`w-full text-center py-2.5 text-sm font-bold rounded-xl border border-white/10 ${pathname === "/signIn" ? "bg-blue-600/10 text-blue-400 border-blue-500" : "text-slate-300 hover:bg-white/5"}`}>
                  Login
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-2.5 text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}