import React from 'react';
// আপনার তৈরি করা এবং আগের রেডিমেড ফাংশনগুলো ইম্পোর্ট করুন
import { getAllUsers, getAllPayments, getAllProposalsForAdmin, getAllTasks } from '@/lib/data';

export default async function AdminStatisticsPage() {
  // ১. জাস্ট সবগুলো ফাংশন কল করে ডাটা তুলে আনা
  const users = await getAllUsers();
  const tasks = await getAllTasks();
  const payments = await getAllPayments();
  const proposals = await getAllProposalsForAdmin();

  // ২. রিকোয়ারমেন্ট অনুযায়ী ক্যালকুলেশন ও ফিল্টারিং করা
  const totalUsersCount = Array.isArray(users) ? users.length : 0;
  const totalTasksCount = Array.isArray(tasks) ? tasks.length : 0;

  // পেমেন্টের amount গুলো যোগ করে Total Revenue বের করা
  const totalRevenue = Array.isArray(payments) 
    ? payments.reduce((sum, pay) => sum + Number(pay.amount || 0), 0) 
    : 0;

  // প্রপোজাল কালেকশন থেকে শুধু 'in-progress' গুলো ফিল্টার করে Active Tasks বের করা
  const activeTasksCount = Array.isArray(proposals)
    ? proposals.filter(proposal => proposal.status === "in-progress").length
    : 0;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-black bg-gray-50 min-h-screen">
      <h2 className="text-xl font-black mb-6">Overview Statistics</h2>

      {/* 📊 ৪টি প্রধান স্ট্যাটস কার্ড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* কার্ড ১: Total Users */}
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Users</p>
          <h3 className="text-3xl font-black mt-2 text-zinc-900">{totalUsersCount}</h3>
        </div>

        {/* কার্ড ২: Total Tasks */}
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Tasks</p>
          <h3 className="text-3xl font-black mt-2 text-blue-600">{totalTasksCount}</h3>
        </div>

        {/* কার্ড ৩: Total Revenue (USD) */}
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue (USD)</p>
          <h3 className="text-3xl font-black mt-2 text-emerald-600">${totalRevenue}</h3>
        </div>

        {/* কার্ড ৪: Active Tasks */}
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-xs font-bold text-gray-400 tracking-wider">Active Tasks</p>
          <h3 className="text-3xl font-black mt-2 text-amber-500">{activeTasksCount}</h3>
        </div>

      </div>
    </div>
  );
}