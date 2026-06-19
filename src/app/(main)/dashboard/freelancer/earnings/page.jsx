"use client";
import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { fetchMyEarnings } from "@/lib/data"; 
import { FiDollarSign, FiInfo, FiCalendar, FiUser, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

const MyEarningsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const freelancerEmail = session?.user?.email;

  const [loading, setLoading] = useState(true);
  const [completedEarnings, setCompletedEarnings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

useEffect(() => {
  if (!freelancerEmail) return;

  const loadEarningsData = async () => {
    setLoading(true);
    const data = await fetchMyEarnings(freelancerEmail);
    
    if (data && Array.isArray(data)) {
      setCompletedEarnings(data);
      const total = data.reduce(
        (sum, item) => sum + Number(item.proposed_budget || 0), 
        0
      );
      setTotalEarnings(total);
    }
    
    setLoading(false);
  };

  loadEarningsData();
}, [freelancerEmail]);

  // লোডিং স্টেট লেআউট
  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-sm font-semibold text-brown">Calculating Earnings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-black p-4">
      
      {/* হেডার এবং আর্নিং স্ট্যাটস কার্ড */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-brown/10 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-[var(--font-heading)] text-black">My Earnings</h1>
          <p className="text-xs text-brown font-light mt-1">
            Review your successfully completed tasks and payments received.
          </p>
        </div>
        
        {/* টোটাল আর্নিং কাউন্টার কার্ড */}
        <div className="bg-cream p-4 rounded-xl flex items-center gap-4 border border-brown/5 min-w-[200px]">
          <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center text-xl shadow-inner">
            <FiTrendingUp />
          </div>
          <div>
            <p className="text-[10px] text-brown uppercase font-bold tracking-wider">Total Payout</p>
            <p className="text-2xl font-extrabold text-black">${totalEarnings}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-amber-900 text-xs font-medium flex items-start gap-2">
        <FiInfo className="mt-0.5 flex-shrink-0 text-amber-600" />
        <div>
          <span className="font-bold">Note:</span> Currently counting earnings from completed tasks only[cite: 1]. In-progress tasks will be automatically added here once their deliverables are submitted and marked as completed[cite: 1].
        </div>
      </div>
      
      {/* পেমেন্ট ব্রেকডাউন টেবিল */}
      <div className="bg-white border border-brown/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-cream text-brown font-bold border-b border-brown/10">
                <th className="p-4">Task Title</th>
                <th className="p-4">Client Name</th>
                <th className="p-4">Amount Made</th>
                <th className="p-4">Completion Date</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brown/5">
              {completedEarnings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-brown font-medium text-sm">
                    No earnings history found. Complete your active projects to unlock payouts!
                  </td>
                </tr>
              ) : (
                completedEarnings.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition-colors text-black font-medium">
                    {/* কলাম ১: টাস্ক টাইটেল */}
                    <td className="p-4 font-bold text-gray-800 max-w-[260px] truncate">
                      {item.job_title || "Freelance Task"}
                    </td>
                    
                    {/* কলাম ২: ক্লায়েন্টের নাম/ইমেইল */}
                    <td className="p-4 text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <FiUser className="text-brown/60 text-sm" /> 
                        {item.client_email ? item.client_email.split("@")[0] : "Client"}
                      </span>
                    </td>
                    
                    {/* কলাম ৩: আয়ের পরিমাণ (Proposed Budget) */}
                    <td className="p-4 font-extrabold text-navy text-sm">
                      ${item.proposed_budget}
                    </td>
                    
                    {/* কলাম ৪: সম্পন্ন হওয়ার তারিখ */}
                    <td className="p-4 text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar className="text-brown/60" />
                        {item.updated_at?.$date 
                          ? new Date(item.updated_at.$date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })
                          : new Date().toLocaleDateString()
                        }
                      </span>
                    </td>
                    
                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <FiCheckCircle /> Success
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEarningsPage;