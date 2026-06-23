import React from "react";
import { getAllTasks, getClientProposalsAction } from "@/lib/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"

export default async function ClientDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const clientEmail = session?.user?.email || "";

  let totalTasksCount = 0;
  let openTasksCount = 0;
  let inProgressTasksCount = 0;
  let totalSpent = 0;

  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  //console.log(session?.session?.token, token);

  if (clientEmail) {
    const allTasks = await getAllTasks(token);
    if (Array.isArray(allTasks)) {
      const clientTasks = allTasks.filter((task) => (task.clientEmail === clientEmail || task.client_email === clientEmail));
      totalTasksCount = clientTasks.length;

      const openTasks = clientTasks.filter((task) => task.status === "open");
      openTasksCount = openTasks.length;
    }

    // ৩. ক্লায়েন্টের সব প্রপোজাল ফেচ করে 'in-progress' স্ট্যাটাস দিয়ে ফিল্টার করা
    const proposals = await getClientProposalsAction({ clientEmail, token });
    if (Array.isArray(proposals)) {
      // যে প্রপোজালগুলোর স্ট্যাটাস সরাসরি 'in-progress'
      const inProgressProposals = proposals.filter((proposal) => proposal.status === "in-progress");
      inProgressTasksCount = inProgressProposals.length;

      // ৪. ইন-প্রোগ্রেস প্রপোজালগুলোর বাজেট যোগ করে 'Total Spent' বের করা
      totalSpent = inProgressProposals.reduce((sum, proposal) => {
        return sum + Number(proposal.proposed_budget || 0);
      }, 0);
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto text-black">
      <h2 className="text-lg font-bold mb-4">Dashboard Main Statistics</h2>

      {/* 📊 স্ট্যাটিস্টিকস কার্ড গ্রিড লেআউট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">

        {/* কার্ড ১: Total Tasks */}
        <div className="p-5 border-b sm:border-b-0 sm:border-r border-gray-200 text-center sm:text-left">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Tasks</p>
          <h3 className="text-2xl font-black mt-2 text-zinc-900">{totalTasksCount}</h3>
        </div>

        {/* কার্ড ২: Open Tasks */}
        <div className="p-5 border-b lg:border-b-0 lg:border-r border-gray-200 text-center sm:text-left">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Open Tasks</p>
          <h3 className="text-2xl font-black mt-2 text-amber-600">{openTasksCount}</h3>
        </div>

        {/* কার্ড ৩: Tasks In Progress */}
        <div className="p-5 border-b sm:border-b-0 sm:border-r border-gray-200 text-center sm:text-left">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tasks In Progress</p>
          <h3 className="text-2xl font-black mt-2 text-blue-600">{inProgressTasksCount}</h3>
        </div>

        {/* কার্ড ৪: Total Spent (USD) */}
        <div className="p-5 text-center sm:text-left">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent (USD)</p>
          <h3 className="text-2xl font-black mt-2 text-emerald-600">${totalSpent}</h3>
        </div>

      </div>

    </div>
  );
}