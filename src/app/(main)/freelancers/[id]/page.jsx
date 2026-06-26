import { getAllData } from "@/lib/data";
import { FiBriefcase, FiCheckCircle, FiUser, FiFileText, FiLayers, FiDollarSign, FiGlobe } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FreelancerPublicProfile({ params }) {
  const { id } = params;
  const { users, proposals } = await getAllData();

  // ১. আইডি ম্যাচ করে নির্দিষ্ট ফ্রিল্যান্সার খোঁজা
  const freelancer = users?.find(
    (user) => user._id?.toString() === id && user.role?.toLowerCase() === "freelancer"
  );

  if (!freelancer || freelancer.isBlocked) {
    return notFound();
  }

  // ২. প্রপোজাল ক্যালকুলেশন
  const myProposals = proposals?.filter(
    (proposal) => proposal.freelancer_email === freelancer.email
  ) || [];

  const inProgressCount = myProposals.filter((p) => p.status === "in-progress").length;
  const completedCount = myProposals.filter((p) => p.status === "completed").length;
  const fullName = `${freelancer.firstName || ""} ${freelancer.lastName || ""}`.trim() || "Elite Freelancer";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link 
            href="/browse-freelancers" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-slate-900 transition-colors"
          >
            ← Back to All Freelancers
          </Link>
        </div>

        {/* 👤 প্রোফাইল টপ কার্ড */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden mb-8">
          <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-slate-900 to-blue-600" />
          
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left justify-between">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="relative flex-shrink-0">
                {freelancer.image ? (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border border-gray-100 shadow-md relative">
                    <Image src={freelancer.image} alt={fullName} fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 shadow-md">
                    <FiUser className="text-4xl" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5 flex-1">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                  {fullName}
                </h1>
                <p className="text-sm text-gray-500 font-medium">{freelancer.email}</p>
                
                {/* পোর্টফোলিও লিঙ্ক */}
                {freelancer.portfolio && (
                  <a
                    href={freelancer.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline mt-1"
                  >
                    <FiGlobe className="w-3.5 h-3.5" /> Visit Portfolio
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* 📊 কাউন্টার গ্রিড (রিয়েল totalEarnings সহ) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Earnings</p>
              <p className="text-xl font-black text-gray-950">
                ${Number(freelancer.totalEarnings || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600">
              <FiBriefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Running Tasks</p>
              <p className="text-xl font-black text-gray-950">{inProgressCount} Active</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600">
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Completed Jobs</p>
              <p className="text-xl font-black text-gray-950">{completedCount} Tasks</p>
            </div>
          </div>
        </div>

        {/* 📑 বায়ো এবং স্কিলস */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* বায়ো */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
              <FiFileText className="text-gray-400" /> Professional Bio
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light whitespace-pre-line">
              {freelancer.bio ? `"${freelancer.bio}"` : "No bio description provided yet."}
            </p>
          </div>

          {/* রিয়েল স্কিলস লুপ */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3 h-fit">
            <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
               Core Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {freelancer.skills && freelancer.skills.length > 0 ? (
                freelancer.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-bold text-gray-700 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">General Expert</span>
              )}
            </div>
          </div>
        </div>

        {/* প্রপোজাল হিস্ট্রি */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
            <FiLayers className="text-gray-400" /> Platform Job History
          </h3>
          
          {myProposals.length > 0 ? (
            <div className="space-y-3">
              {myProposals.map((proposal) => (
                <div 
                  key={proposal._id?.$oid || proposal._id} 
                  className="p-4 rounded-xl border border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 tracking-tight">
                      {proposal.job_title || "Task Contract"}
                    </h4>
                    <span className="inline-block text-[10px] text-gray-400 font-medium mt-1">
                      📁 {proposal.category || "General"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Budget</p>
                      <p className="text-sm font-black text-gray-950">${proposal.proposed_budget || 0}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                      proposal.status === "completed" ? "bg-emerald-50 border-emerald-100 text-emerald-700" :
                      proposal.status === "in-progress" ? "bg-blue-50 border-blue-100 text-blue-700" :
                      proposal.status === "rejected" ? "bg-rose-50 border-rose-100 text-rose-700" :
                      "bg-amber-50 border-amber-100 text-amber-700"
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No job activity recorded yet on this platform.</p>
          )}
        </div>

      </div>
    </div>
  );
}