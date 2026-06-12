"use client";

import React, { useState } from "react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Eye, EyeOff, Mail, Lock, Image, ShieldCheck, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";


export default function SignUpPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google authentication failed:", err);
      alert("Google registration session failed to initialize.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const { name, email, password, photoUrl } = Object.fromEntries(formData);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoUrl 
      });

      if (error) {
        alert(error.message || "Registration failed!"); 
      } else {
        alert("Account created successfully! Proceeding to Sign In.");
        router.push("/login"); 
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950 py-12 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/10 p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center pb-6 pt-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            User Registration
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 tracking-wide">Create your clinical dashboard registry profile</p>
        </div>

        {/* Form Section */}
        <div className="py-2">
          <form onSubmit={onSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide pl-1">Full Name</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full h-12 pl-11 pr-4 bg-slate-950/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 hover:border-white/20 transition-colors"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide pl-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="example@domain.com"
                  className="w-full h-12 pl-11 pr-4 bg-slate-950/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 hover:border-white/20 transition-colors"
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide pl-1">Photo URL</label>
              <div className="relative flex items-center">
                <Image className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  name="photoUrl"
                  type="url"
                  required
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full h-12 pl-11 pr-4 bg-slate-950/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 hover:border-white/20 transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide pl-1">Secure Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
                <input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-12 bg-slate-950/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 hover:border-white/20 transition-colors"
                />
                <button 
                  type="button" 
                  onClick={toggleVisibility} 
                  className="absolute right-4 focus:outline-none text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-bold h-12 text-sm uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-xl shadow-blue-600/10 hover:opacity-90 active:scale-[0.99] transition-all mt-4 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Registering Profile...
                </span>
              ) : (
                "Register Now"
              )}
            </button>
          </form>

          {/* Divider Layer */}
          <div className="relative flex py-4 items-center justify-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
              Or Register Via
            </span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Google Button */}
          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            className="w-full h-11 flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-xl text-xs font-bold text-slate-200 active:scale-[0.98]"
          >
            <FcGoogle className="w-5 h-5" /> Login with Google
          </button>

          {/* Footer Link */}
          <div className="text-center mt-6 border-t border-white/5 pt-4">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}