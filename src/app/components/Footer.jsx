"use client";

import React from "react";
import { Stethoscope, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-t border-white/10 text-slate-400 font-sans relative overflow-hidden">
      {/* Soft background glow decoration */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* 1. Logo, Name & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-black text-white tracking-wide">
              <div className="p-2 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-xl text-white shadow-lg shadow-blue-500/10">
                <Stethoscope className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                DocAppoint
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner in healthcare. Book appointments with top doctors instantly and manage your health seamlessly.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-white/10 hover:border-blue-500/30 transition-all" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all" aria-label="X (Twitter)">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-white/10 hover:border-blue-400/30 transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/all-appointments" className="hover:text-blue-400 transition-colors">All Appointments</a></li>
              <li><a href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</a></li>
            </ul>
          </div>

          {/* 3. Specialities */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Specialities</h3>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cardiology</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Neurology</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pediatrics</a></li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Contact Us</h3>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-normal">House 12, Road 5, Dhanmondi, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="text-slate-400">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="text-slate-400">support@docappoint.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-medium">
          <p>&copy; {currentYear} DocAppoint. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}