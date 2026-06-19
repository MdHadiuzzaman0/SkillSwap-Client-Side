"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { fetchMyEarnings, fetchMyProposals } from "@/lib/data"; // 🎯 আপনার তৈরি ডাটা ফেচিং ফাংশন
import { FiBriefcase, FiClock, FiCheckCircle, FiDollarSign, FiArrowRight, FiActivity } from "react-icons/fi";
import Link from "next/link";

const FreelancerDashboardOverview = () => {
  const { data: session, isPending } = useSession();
  const freelancerEmail = session?.user?.email;

  const [stats, setStats] = useState({
    totalProposals: 0,
    pendingProposals: 0,
    inProgressProposals: 0,
    completedProposals: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!freelancerEmail) return;

    const loadDashboardStats = async () => {
      setLoading(true);
      try {
        // প্রপোজাল এবং আর্নিং ডাটা একসাথে লোড করা হচ্ছে
        const [proposals, earnings] = await Promise.all([
          fetchMyProposals(freelancerEmail),
          fetchMyEarnings(freelancerEmail),
        ]);

        if (proposals && Array.isArray(proposals)) {
          const total = proposals.length;

          const pending = proposals.filter((p) => p.status?.toLowerCase() === "pending").length;
          const inProgress = proposals.filter((p) => p.status?.toLowerCase() === "in progress").length;
          const completed = proposals.filter((p) => p.status?.toLowerCase() === "completed").length;

          // 🎯 আর্নিং ক্যালকুলেশন (শুধুমাত্র কমপ্লিট হওয়া প্রজেক্টের বাজেট যোগ হবে)
          const totalEarn = earnings && Array.isArray(earnings)
            ? earnings.reduce((sum, item) => sum + Number(item.proposed_budget || 0), 0)
            : 0;

          setStats({
            totalProposals: total,
            pendingProposals: pending,
            inProgressProposals: inProgress,
            completedProposals: completed,
            totalEarnings: totalEarn,
          });
        }
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardStats();
  }, [freelancerEmail]);

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalProposals,
      icon: <FiBriefcase />,
      bg: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Pending Jobs",
      value: stats.pendingProposals,
      icon: <FiClock />,
      bg: "bg-amber-50/60",
      textColor: "text-amber-700",
    },
    {
      title: "In-Progress Jobs",
      value: stats.inProgressProposals,
      icon: <FiActivity />,
      bg: "bg-blue-50/60",
      textColor: "text-blue-700",
    },
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings}`,
      icon: <FiDollarSign />,
      bg: "bg-cream/40",
      textColor: "text-navy",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      <div className="bg-navy text-cream p-6 rounded-2xl shadow-sm border border-brown/10">
        <h1 className="text-2xl font-bold font-[var(--font-heading)]">
          Welcome back, {session?.user?.name || "Freelancer"}!
        </h1>
        <p className="text-xs font-light text-cream/80 mt-1">
          You have <span className="font-semibold text-white">{stats.inProgressProposals} active jobs</span> in progress and <span className="font-semibold text-white">{stats.completedProposals} completed</span> milestones.
        </p>
      </div>

      {/* ২. ৪টি স্ট্যাটস কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.bg} border border-brown/10 p-5 rounded-xl shadow-sm flex items-center justify-between transition-transform hover:scale-[1.01]`}
          >
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-brown/70">
                {card.title}
              </p>
              <p className={`text-2xl font-extrabold mt-1 ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`text-xl p-3 bg-gray-50 rounded-lg ${card.textColor} border border-brown/5`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ৩. কুইক নেভিগেশন লিংকস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <Link href="/dashboard/freelancer/my-proposals" className="group bg-white p-4 rounded-xl border border-brown/10 hover:border-navy/30 transition-all flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-black">My Proposals</h3>
            <p className="text-[10px] text-brown mt-0.5">Check pending applications ({stats.pendingProposals})</p>
          </div>
          <FiArrowRight className="text-brown group-hover:text-navy group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link href="/dashboard/freelancer/active-projects" className="group bg-white p-4 rounded-xl border border-brown/10 hover:border-navy/30 transition-all flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-black">Active Projects</h3>
            <p className="text-[10px] text-brown mt-0.5">Manage in-progress tasks ({stats.inProgressProposals})</p>
          </div>
          <FiArrowRight className="text-brown group-hover:text-navy group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link href="/dashboard/freelancer/earnings" className="group bg-white p-4 rounded-xl border border-brown/10 hover:border-navy/30 transition-all flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-black">My Earnings</h3>
            <p className="text-[10px] text-brown mt-0.5">View statements of completed jobs ({stats.completedProposals})</p>
          </div>
          <FiArrowRight className="text-brown group-hover:text-navy group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
};

export default FreelancerDashboardOverview;