import React from 'react';
// চমৎকার কিছু আইকন ইম্পোর্ট করা হলো
import { FiDollarSign, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
// আপনার ডেটা ফেচিং ফাংশন (যা অলরেডি payments কালেকশনের ডাটা আনে)
import { getAllPayments } from '@/lib/data';

export default async function AdminTransactionsPage() {
  // ১. ডাটাবেজ থেকে সব পেমেন্ট রেকর্ডস তুলে আনা
  const payments = await getAllPayments();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-black bg-gray-50 min-h-screen">
      
      {/* 📝 পেজ হেডার ও ইন্ট্রো */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black font-[var(--font-heading)] text-navy tracking-tight">Transactions History</h2>
          <p className="text-xs text-gray-500 mt-1">Monitor and audit all successful client-to-freelancer escrow payments</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Ledger Sync
        </div>
      </div>

      {/* 📊 ট্রানজেকশন হিস্ট্রি টেবিল কন্টেইনার */}
      <div className="bg-white border border-gray-200/70 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto">
          
          {/* যদি ডাটাবেজে কোনো ট্রানজেকশন না থাকে (Empty State Handling) */}
          {!payments || payments.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                <FiDollarSign className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-gray-700">No Transactions Found</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">Escrow payments will automatically populate here once clients process invoice checkouts through Stripe.</p>
            </div>
          ) : (
            
            /* আসল ডেটা টেবিল */
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200/80 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Client Email</th>
                  <th className="py-4 px-6 text-center">
                    <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md font-mono font-normal">Escrow Route</span>
                  </th>
                  <th className="py-4 px-6">Freelancer Email</th>
                  <th className="py-4 px-6">Payout Size</th>
                  <th className="py-4 px-6">Payment Date</th>
                  <th className="py-4 px-6 text-right">Status</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100">
                {payments.map((pay, idx) => {
                  // পেমেন্টের ডেট ফরম্যাটিং
                  const paymentDate = pay.paid_at 
                    ? new Date(pay.paid_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                    : 'N/A';

                  return (
                    <tr 
                      key={pay._id || idx} 
                      className="text-xs transition-colors duration-200 hover:bg-gray-50/50 group cursor-pointer"
                    >
                      {/* ১. Client Email */}
                      <td className="py-4 px-6 font-medium text-gray-800">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-gray-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{pay.client_email || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Escrow Visual Indicator */}
                      <td className="py-4 px-6 text-center text-gray-300">
                        <FiArrowRight className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:text-emerald-500" />
                      </td>

                      {/* ২. Freelancer Email */}
                      <td className="py-4 px-6 text-gray-600 font-medium">
                        <div className="flex items-center gap-2">
                          <FiUser className="text-gray-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{pay.freelancer_email || 'N/A'}</span>
                        </div>
                      </td>

                      {/* ৩. Payout Size */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-black bg-zinc-50 border border-zinc-200/60 px-2.5 py-1 rounded-lg">
                          ${pay.amount || 0}
                        </span>
                      </td>

                      {/* ৪. Payment Date */}
                      <td className="py-4 px-6 text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar className="text-gray-400" />
                          {paymentDate}
                        </div>
                      </td>

                      {/* ৫. Payment Status Label */}
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm">
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                          {pay.payment_status || 'Paid'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}