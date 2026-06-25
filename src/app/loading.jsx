"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4 max-w-xs text-center">
        
        {/* 🎯 গ্লোয়িং এবং অরবিট স্টাইল কাস্টম লোডার */}
        <div className="relative w-16 h-16">
          {/* বাইরের ঘূর্ণায়মান রিং */}
          <div className="absolute inset-0 border-4 border-navy/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-navy border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          
          {/* ভেতরের গ্লোয়িং কোর ডট */}
          <div className="absolute inset-4 bg-amber-500/10 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* 📝 টেক্সট অ্যানিমেশন */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-navy tracking-wide uppercase">
            Loading Assets
          </h3>
          <p className="text-xs text-gray-400 font-medium animate-pulse">
            Please wait while we fetch the freshest data...
          </p>
        </div>

      </div>
    </div>
  );
}