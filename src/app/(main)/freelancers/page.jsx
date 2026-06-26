import { getAllData } from "@/lib/data";
import { FiDollarSign, FiBriefcase, FiCheckCircle, FiUser, FiGlobe } from "react-icons/fi";
import Image from "next/image";

const BrowseFreelancersPage = async () => {
  const { users, proposals } = await getAllData();

  const freelancers = users
    ?.filter((user) => user.role === "freelancer" && !user.isBlocked)
    ?.map((freelancer) => {
      const myProposals = proposals?.filter(
        (proposal) => proposal.freelancer_email === freelancer.email
      ) || [];

      const inProgressCount = myProposals.filter((p) => p.status === "in-progress").length;
      const completedCount = myProposals.filter((p) => p.status === "completed").length;

      const fullName = `${freelancer.firstName || ""} ${freelancer.lastName || ""}`.trim();

      return {
        ...freelancer,
        displayName: fullName || "Elite Freelancer",
        inProgressCount,
        completedCount,
      };
    }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🎯 পেজ হেডার */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-black text-gray-950 tracking-tight font-heading">
            Browse Top Talents
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1">
            Hire pre-vetted freelancers with proven track records and active contributions.
          </p>
        </div>

        {/* 🎯 ফ্রিল্যান্সার গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer) => (
            <div
              key={freelancer._id?.$oid || freelancer._id}
              className="group relative bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between overflow-hidden"
            >
              {/* কার্ড হোভার ইফেক্ট লাইন */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-navy via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div>
                {/* ১. টপ সেকশন: প্রোফাইল পিকচার ও নাম */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-4 max-w-[80%]">
                    <div className="relative flex-shrink-0">
                      {freelancer.image ? (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 shadow-inner relative">
                          <Image
                            src={freelancer.image}
                            alt={freelancer.displayName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
                          <FiUser className="text-2xl" />
                        </div>
                      )}
                      {/* একটিভ গ্লোয়িং ডট */}
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                    </div>

                    <div className="space-y-0.5 truncate">
                      <h3 className="font-bold text-gray-950 text-base tracking-tight group-hover:text-navy transition-colors duration-300 truncate">
                        {freelancer.displayName}
                      </h3>
                      <p className="text-xs text-gray-400 font-light line-clamp-1 italic">
                        {freelancer.bio ? `"${freelancer.bio}"` : "Professional Expert"}
                      </p>
                    </div>
                  </div>

                  {/* 🌐 পোর্টফোলিও মিনিমাল আইকন বাটন */}
                  {freelancer.portfolio && (
                    <a
                      href={freelancer.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Portfolio"
                      className="p-2 rounded-xl bg-gray-50 border border-gray-100 text-gray-500 hover:text-navy hover:bg-navy/5 hover:border-navy/20 transition-all duration-300 flex-shrink-0 shadow-sm group/icon"
                    >
                      <FiGlobe className="w-4 h-4 group-hover/icon:rotate-12 transition-transform" />
                    </a>
                  )}
                </div>

                {/* ২. স্কিল সেকশন (মিনি ক্যাপসুল ট্যাগ) */}
                <div className="mt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {freelancer.skills && freelancer.skills.length > 0 ? (
                      freelancer.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg uppercase tracking-wider group-hover:bg-blue-50/40 group-hover:border-blue-100 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-gray-400 italic">General Tech Expert</span>
                    )}
                  </div>
                </div>

                {/* ৩. কাজের স্ট্যাটাস কাউন্টার (In-Progress & Completed) */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {/* ইন-প্রোগ্রেস কাউন্ট */}
                  <div className="flex items-center gap-2 bg-blue-50/40 border border-blue-50 px-3 py-2.5 rounded-xl transition-all duration-300 group-hover:border-blue-100">
                    <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-600">
                      <FiBriefcase className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Running</p>
                      <p className="text-sm font-black text-blue-900">{freelancer.inProgressCount} Tasks</p>
                    </div>
                  </div>
                  
                  {/* কমপ্লিটেড কাউন্ট */}
                  <div className="flex items-center gap-2 bg-emerald-50/40 border border-emerald-50 px-3 py-2.5 rounded-xl transition-all duration-300 group-hover:border-emerald-100">
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-600">
                      <FiCheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Completed</p>
                      <p className="text-sm font-black text-emerald-900">{freelancer.completedCount} Done</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ৪. বাটম পার্ট: টোটাল আর্নিং */}
              <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Earnings</p>
                  <p className="text-xl font-black text-gray-950 flex items-center mt-0.5">
                    <FiDollarSign className="text-base text-gray-400 -mr-0.5" />
                    {Number(freelancer.totalEarnings || 0).toLocaleString()}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BrowseFreelancersPage;