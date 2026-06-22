import { getAllData } from "@/lib/data";
import { FiDollarSign, FiBriefcase, FiCheckCircle, FiStar, FiUser } from "react-icons/fi";
import Image from "next/image";

const BrowseFreelancersPage = async () => {
  const { users, proposals } = await getAllData();

  // 🎯 ২. ফ্রিল্যান্সারদের ফিল্টার করা এবং ইন-প্রগ্রেস ও কমপ্লিটেড কাজের ডাটা আলাদা করা
  const freelancers = users
    ?.filter((user) => user.role === "freelancer" && !user.isBlocked)
    ?.map((freelancer) => {
      // এই ফ্রিল্যান্সারের সব প্রপোজাল আলাদা করে নেওয়া
      const myProposals = proposals?.filter(
        (proposal) => proposal.freelancer_email === freelancer.email
      ) || [];

      // স্ট্যাটাস অনুযায়ী pconst { users, proposals } = await getAllData();আলাদা ফিল্টারিং ও কাউন্টিং
      const inProgressCount = myProposals.filter((p) => p.status === "in-progress").length;
      const completedCount = myProposals.filter((p) => p.status === "completed").length;

      return {
        ...freelancer,
        inProgressCount, // ইন-প্রগ্রেস কাজের সংখ্যা
        completedCount,  // কমপ্লিটেড কাজের সংখ্যা
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
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* প্রোফাইল হেডার (ছবি ও নাম) */}
                <div className="flex items-start gap-4 mb-4">
                  {freelancer.image ? (
                    <Image
                      src={freelancer.image} 
                      alt={freelancer.name} width={56} height={56} className="rounded-xl object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                      <FiUser className="text-xl" />
                    </div>
                  )}
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg leading-tight">
                      {freelancer.name}
                    </h2>
                    <p className="text-xs text-gray-400 font-medium mt-0.5 break-all">
                      {freelancer.email}
                    </p>
                  </div>
                </div>

                {/* বায়ো টেক্সট */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {freelancer.bio || "No bio added yet."}
                </p>

                {/* স্কিলস লিস্ট / ট্যাগস */}
                <div className="flex flex-wrap gap-1.5 mb-6">
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

              {/* কার্ড ফুটার - স্ট্যাটাস কাউন্টার আলাদাভাবে ডিসপ্লে */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 mt-auto">
                
                {/* আলাদা আলাদা প্রজেক্ট স্ট্যাটাস ট্র্যাক */}
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
                  {/* রেটিং (পিডিএফের নিয়ম অনুযায়ী স্টার) */}
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <FiStar className="fill-current" />
                    <span>4.5</span>
                  </div>

                  {/* আওয়ারলি রেট */}
                  <div className="text-right">
                    <span className="text-gray-950 font-black text-base flex items-center justify-end">
                      <FiDollarSign className="text-sm -mr-0.5 text-gray-600" />
                      {freelancer.hourly_rate || 0}/hr
                    </span>
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