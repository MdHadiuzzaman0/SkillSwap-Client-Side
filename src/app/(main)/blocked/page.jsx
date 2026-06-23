import React from "react";
import Link from "next/link";
import { FiShieldAlert, FiMail, FiLogOut } from "react-icons/fi";

export default function BlockedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-xl text-center space-y-6">
        
        {/* 🚨 সতর্কবার্তা আইকন */}
        <div className="mx-auto w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center border border-red-100 animate-pulse">
          <FiShieldAlert size={32} />
        </div>

        {/* টেক্সট মেসেজ */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-gray-950 tracking-tight">
            Account Suspended
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Your account has been temporarily or permanently blocked by the platform administrator due to a violation of our terms of service or suspicious activities.
          </p>
        </div>

        {/* ইনফো বক্স */}
        <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 text-left">
          <h4 className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1">
            What can you do now?
          </h4>
          <ul className="text-[11px] text-amber-800 list-disc list-inside space-y-1 font-medium">
            <li>You can no longer post tasks or apply for active jobs.</li>
            <li>Your public profile has been hidden from the marketplace.</li>
            <li>If you think this is a mistake, please contact support.</li>
          </ul>
        </div>

        <hr className="border-gray-100" />

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* সাপোর্ট মেইল বাটন */}
          <button
            // href="mailto:support@yourplatform.com"
            className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-all duration-200"
          >
            <FiMail size={14} />
            Contact Support
          </button>

          {/* হোম বা লগআউট বাটন */}
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl shadow-sm shadow-red-100 transition-all duration-200"
          >
            <FiLogOut size={14} />
            Back to Home
          </Link>
        </div>
        
      </div>
      
      {/* ফুটনোট */}
      <p className="text-center text-[10px] text-gray-400 mt-6 font-medium">
        &copy; {new Date().getFullYear()} YourMarketplace. All rights reserved.
      </p>
    </div>
  );
}