"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FiAlertTriangle, FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black">
      <div className="max-w-md w-full bg-white border border-gray-200/80 rounded-2xl p-8 text-center shadow-sm space-y-6 transition-all duration-300 hover:shadow-md">
        
        {/* ⚠️ গ্লিচ এবং পালস ইফেক্ট সহ আইকন */}
        <div className="relative mx-auto w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 group">
          <FiAlertTriangle className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>

        {/* 📝 বড় এবং বোল্ড টাইপোগ্রাফি */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black font-[var(--font-heading)] text-navy tracking-tighter">
            404
          </h1>
          <h2 className="text-lg font-bold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* 🛠️ দুইটা কাজের ইন্টারেক্টিভ অ্যাকশন বাটন */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* এক ধাপ পেছনে যাওয়ার বাটন */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl shadow-sm hover:bg-gray-200 transition-all duration-200"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {/* সরাসরি হোম পেজে যাওয়ার বাটন */}
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-navy text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-90 transition-all duration-200"
          >
            <FiHome className="w-4 h-4" />
            Take Me Home
          </button>
        </div>

      </div>
    </div>
  );
}