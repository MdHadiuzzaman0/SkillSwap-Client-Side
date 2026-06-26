import { getAllData } from "@/lib/data";
import { FiBriefcase, FiCheckCircle, FiUser, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const BrowseFreelancersPage = async () => {
  const { users, proposals } = await getAllData();

  // আপনার রিয়েল স্কিমা অনুযায়ী ফিল্টারিং এবং ম্যাপিং
  const freelancers = users
    ?.filter((user) => user.role?.toLowerCase() === "freelancer" && !user.isBlocked)
    ?.map((freelancer) => {
      const myProposals = proposals?.filter(
        (proposal) => proposal.freelancer_email === freelancer.email
      ) || [];

      // প্রপোজালের রানিং ও কমপ্লিটেড স্ট্যাটাস কাউন্ট
      const inProgressCount = myProposals.filter((p) => p.status === "in-progress").length;
      const completedCount = myProposals.filter((p) => p.status === "completed").length;

      // স্কিমা অনুযায়ী firstName এবং lastName জোড়া লাগানো হলো
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
        
        {/* পেজ হেডার */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-black text-gray-950 tracking-tight font-heading">
            Browse Top Talents
          </h1>
          <p className="text-sm text-gray-500 font-light mt-1">
            Hire pre-vetted freelancers with proven track records and active contributions.
          </p>
        </div>

        {/* ফ্রিল্যান্সার গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer) => {
            const freelancerId = freelancer._id?.toString() || freelancer._id;

            return (
              <div
                key={freelancerId}
                className="group relative bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between overflow-hidden"
              >
                {/* কার্ড হোভার ইফেক্ট লাইন */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-slate-900 via-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div>
                  {/* ১. প্রোফাইল ইমেজ ও নাম */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative flex-shrink-0">
                      {freelancer.image ? (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 relative">
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
                    </div>

                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h3 className="font-bold text-gray-950 text-base tracking-tight truncate">
                        {freelancer.displayName}
                      </h3>
                      <p className="text-xs text-gray-400 font-light truncate">
                        {freelancer.email}
                      </p>
                    </div>
                  </div>

                  {/* ২. রিয়েল স্কিলস অ্যারে ট্যাগ লুপ */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {freelancer.skills && freelancer.skills.length > 0 ? (
                      freelancer.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg uppercase tracking-wider"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-gray-400 italic">General Tech Expert</span>
                    )}
                  </div>

                  {/* ৩. প্রপোজাল স্ট্যাটাস কাউন্টার */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-blue-50/40 border border-blue-50 px-3 py-2 rounded-xl">
                      <FiBriefcase className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-xs font-bold text-blue-900">{freelancer.inProgressCount} Running</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50/40 border border-emerald-50 px-3 py-2 rounded-xl">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-900">{freelancer.completedCount} Done</span>
                    </div>
                  </div>
                </div>

                {/* ৪. অ্যাকশন পার্ট: ভিউ প্রোফাইল বাটন */}
                <div className="mt-2 pt-4 border-t border-gray-50">
                  <Link
                    href={`/freelancers/${freelancerId}`}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-slate-900 border border-gray-100 hover:border-transparent text-gray-700 hover:text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all duration-300 group/btn"
                  >
                    <span>View Profile</span>
                    <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BrowseFreelancersPage;