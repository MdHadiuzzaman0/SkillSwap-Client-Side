import React from 'react';
// চমৎকার কিছু আইকন ইম্পোর্ট করা হলো
import { FiUsers, FiBriefcase, FiDollarSign, FiActivity } from 'react-icons/fi';
// আপনার ডেটা ফেচিং ফাংশনগুলো
import { getAllData, getAllPayments } from '@/lib/data';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function AdminStatisticsPage() {
  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  const { users, tasks, proposals } = await getAllData(token);
  const payments = await getAllPayments(token);
  // console.log(proposals.length)

  const totalUsersCount = Array.isArray(users) ? users.length : 0;
  const totalTasksCount = Array.isArray(tasks) ? tasks.length : 0;

  const totalRevenue = Array.isArray(payments) 
    ? payments.reduce((sum, pay) => sum + Number(pay.amount || 0), 0) 
    : 0;

  const activeTasksCount = Array.isArray(proposals)
    ? proposals.filter(proposal => proposal.status !== "pending").length
    : 0;

  // কার্ডের ডাটাগুলোকে লুপ ঘোরানোর সুবিধার্থে একটি অ্যারেতে সাজানো হলো
  const statCards = [
    {
      title: "Total Users",
      value: totalUsersCount,
      icon: <FiUsers className="w-6 h-6 text-zinc-700" />,
      iconBg: "bg-zinc-100",
      textColor: "text-zinc-900"
    },
    {
      title: "Total Tasks",
      value: totalTasksCount,
      icon: <FiBriefcase className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Total Revenue (USD)",
      value: `$${totalRevenue}`,
      icon: <FiDollarSign className="w-6 h-6 text-emerald-600" />,
      iconBg: "bg-green-50",
      textColor: "text-emerald-600"
    },
    {
      title: "Active Tasks",
      value: activeTasksCount,
      icon: <FiActivity className="w-6 h-6 text-amber-500" />,
      iconBg: "bg-amber-50",
      textColor: "text-amber-500"
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-black bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-xl font-black font-[var(--font-heading)] text-navy tracking-tight">Overview Statistics</h2>
        <p className="text-xs text-gray-500 mt-1">Real-time platform health and performance indicators</p>
      </div>

      {/* 📊 ইন্টারঅ্যাক্টিভ ৪টি প্রধান স্ট্যাটস কার্ড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <div 
            key={idx} 
            className="p-6 bg-white border border-gray-200/60 rounded-2xl shadow-sm flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300/80 group cursor-pointer"
          >
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
              <h3 className={`text-3xl font-black ${card.textColor} tracking-tight`}>{card.value}</h3>
            </div>
            
            {/* আইকন রেন্ডারিং এবং হালকা জুম অ্যানিমেশন হোভারে */}
            <div className={`p-4 ${card.iconBg} rounded-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}