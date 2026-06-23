
import { getTopFreelancers } from "@/lib/data";
import Image from "next/image";
import { FiDollarSign, FiAward, FiUser } from "react-icons/fi";

const TopFreelancersSection = async () => {
  const freelancers = await getTopFreelancers();

  // যদি কোনো ফ্রিল্যান্সার ডাটা না থাকে, তাহলে সেকশনটি হাইড থাকবে
  if (!freelancers || freelancers.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🎯 সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <FiAward className="text-amber-600 animate-pulse" /> Elite Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Top Earners & Freelancers
          </h2>
          <p className="text-gray-500 mt-3 text-base sm:text-lg">
            Meet the most successful professionals on our platform, ranked directly by their cumulative verified earnings.
          </p>
        </div>

        {/* 🏆 টপ ৩ ফ্রিল্যান্সার কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {freelancers.slice(0, 3).map((freelancer, index) => {
            // র‍্যাংক অনুযায়ী আলাদা ব্যাজ কালার থিম
            const rankStyles = [
              { border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-600", lightBg: "bg-amber-50/60" }, // Rank 1 (Gold)
              { border: "border-slate-400", bg: "bg-slate-500", text: "text-slate-600", lightBg: "bg-slate-50/60" }, // Rank 2 (Silver)
              { border: "border-orange-400", bg: "bg-orange-500", text: "text-orange-600", lightBg: "bg-orange-50/60" }, // Rank 3 (Bronze)
            ][index] || { border: "border-gray-200", bg: "bg-gray-500", text: "text-gray-600", lightBg: "bg-gray-50" };

            return (
              <div 
                key={freelancer._id || index} 
                className={`relative bg-white border-2 ${rankStyles.border} p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
              >
                {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${rankStyles.bg} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`}></div>

                <div>
                  {/* 👑 র‍্যাংক ও মেডেল ব্যাজ */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`flex items-center gap-1 ${rankStyles.bg} text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-sm`}>
                      <FiAward className="text-sm" /> Rank #{index + 1}
                    </span>
                  </div>

                  {/* 👤 প্রোফাইল ইনফো */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      {freelancer.image ? (
                        <Image
                          src={freelancer.image} 
                          alt={freelancer.name || "Freelancer Profile"} 
                          width={64} height={64} className={`rounded-2xl object-cover border-2 ${rankStyles.border} p-0.5`}
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-2xl ${rankStyles.lightBg} ${rankStyles.text} flex items-center justify-center border-2 ${rankStyles.border}`}>
                          <FiUser className="text-2xl" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-amber-600 transition-colors">
                        {freelancer.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mt-1 break-all">
                        {freelancer.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 💰 লাইভ আর্নিং ডিসপ্লে বক্স */}
                <div className={`mt-6 ${rankStyles.lightBg} border border-dashed ${rankStyles.border} p-4 rounded-xl flex items-center justify-between`}>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Earnings</span>
                  <div className="flex items-center font-black text-xl text-gray-950">
                    <FiDollarSign className={`${rankStyles.text} text-lg -mr-0.5`} />
                    <span>{(freelancer.totalEarnings || 0).toLocaleString()}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TopFreelancersSection;