import { getAllData } from "@/lib/data";
import { FiDollarSign, FiBriefcase, FiCheckCircle, FiUser } from "react-icons/fi";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

      // 🎯 ডাটাবেজ থেকে firstName এবং lastName জোড়া লাগিয়ে ফুল নেম জেনারেট করা হলো
      const fullName = `${freelancer.firstName || ""} ${freelancer.lastName || ""}`.trim();

      return {
        ...freelancer,
        displayName: fullName || "Freelancer",
        inProgressCount,
        completedCount,
      };
    }) || [];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* পেজ হেডিং */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-950 tracking-tight">
            Browse Expert Freelancers
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Find and connect with top-rated professionals for your custom tasks.
          </p>
        </div>

        {/* 🏆 ৩-কলাম রেসপনসিভ গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <div 
              key={freelancer._id} 
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[340px]"
            >
              <div>
                {/* 🎯 প্রোফাইল হেডার (ছবি, নাম এবং অ্যাক্টিভ স্ট্যাটাস) */}
                <div className="flex items-center gap-4 mb-4">
                  {freelancer.image ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 relative">
                      <Image
                        src={freelancer.image} 
                        alt={freelancer.displayName} 
                        width={56} 
                        height={56} 
                        className="w-14 h-14 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 flex-shrink-0">
                      <FiUser className="text-xl" />
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1 min-w-0">
                    <h2 className="font-bold text-gray-900 text-base leading-tight truncate">
                      {freelancer.displayName}
                    </h2>
                    {/* 🟢 Active ব্যাজ (যেহেতু ফিল্টারে !isBlocked দেওয়া আছে, তাই এরা সবাই একটিভ) */}
                    <div>
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* বায়ো টেক্সট */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
                  {freelancer.bio || "No bio added yet."}
                </p>

                {/* স্কিলস লিস্ট / ট্যাগস */}
                <div className="flex flex-wrap gap-1.5 mb-6 overflow-hidden">
                  {freelancer.skills && freelancer.skills.length > 0 ? (
                    freelancer.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No skills listed</span>
                  )}
                </div>
              </div>

              {/* কার্ড ফুটার - স্ট্যাটাস কাউন্টার ও আওয়ারলি রেট */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 mt-auto">
                
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
                  {/* ১. ইন-প্রগ্রেস কাউন্ট */}
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                    <FiBriefcase className="text-blue-500" />
                    <span>In-Progress: {freelancer.inProgressCount}</span>
                  </div>
                  
                  {/* ২. কমপ্লিটেড কাউন্ট */}
                  <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md">
                    <FiCheckCircle className="text-green-500" />
                    <span>Completed: {freelancer.completedCount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {/* 💡 রেটিং আপাতত হাইড/বাদ রাখা হলো আপনার চাহিদা অনুযায়ী */}
                  <div className="text-sm font-bold text-gray-400">
                    {/* Rating Hidden */}
                  </div>

                  {/* আওয়ারলি রেট */}
                  <div className="text-right">
                    {/* <span className="text-gray-950 font-black text-base flex items-center justify-end">
                      <FiDollarSign className="text-sm -mr-0.5 text-gray-600" />
                      {freelancer.hourly_rate || 0}/hr
                    </span> */}
                  </div>
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