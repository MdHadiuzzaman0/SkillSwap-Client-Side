"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiShield, FiHome } from "react-icons/fi";

export default function AdminPrivacyRedirectPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15); // ৪ সেকেন্ডের কাউন্টডাউন

  useEffect(() => {
    // 🎯 প্রতি সেকেন্ডে কাউন্টডাউন কমবে
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 🎯 ৪ সেকেন্ড পর অটোমেটিক হোম পেজে পাঠিয়ে দেবে
    const timeout = setTimeout(() => {
      router.push("/");
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black">
      <div className="max-w-md w-full bg-white border border-gray-200/80 rounded-2xl p-8 text-center shadow-sm space-y-6">
        
        {/* 🔒 সুন্দর অ্যানিমেটেড আইকন সেকশন */}
        <div className="relative mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group">
          <FiLock className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </div>

        {/* 📝 সফট অ্যান্ড রেস্পেক্টফুল মেসেজ */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-[11px] font-bold uppercase tracking-wider">
            <FiShield className="w-3 h-3 text-amber-500" /> Admin Protection
          </div>
          <h2 className="text-xl font-black text-navy tracking-tight mt-2">
            Hello, Respected Admin!
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
            You are trying to access a user's private dashboard. <br/>
            As an Admin, we should kindly respect everyone's privacy.
          </p>
        </div>

        {/* ⏳ কাউন্টডাউন ও রিডাইরেক্ট নোটিশ */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs text-gray-500 font-medium">
          Redirecting you to the <span className="font-bold text-blue-600">Home Page</span> in
          <span className="inline-flex items-center justify-center w-5 h-5 bg-navy text-white font-bold rounded-md text-[11px] mx-1 animate-pulse">
            {countdown}
          </span>
          seconds...
        </div>

        {/* 🏠 ইনস্ট্যান্ট হোম পেজে যাওয়ার বাটন (যদি সে নিজে ক্লিক করতে চায়) */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-navy text-white text-xs font-bold rounded-xl shadow-sm hover:bg-navy/90 transition-all duration-200 group"
        >
          <FiHome className="w-4 h-4" />
          Go to Home Now
        </button>

      </div>
    </div>
  );
}