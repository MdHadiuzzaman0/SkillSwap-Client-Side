import { fetchMyProposals } from "@/lib/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FiCalendar, FiAlertCircle, FiBriefcase, FiMail, FiLayers, FiCheckCircle, FiInfo } from "react-icons/fi";
import { SubmitTaskButton } from "@/components/SubmitTaskButton";

const ActiveProjectsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers() 
  });
  const freelancerEmail = session?.user?.email;

  if (!freelancerEmail) {
    return <div className="p-6 text-center text-xs text-red-500">Unauthorized. Please log in.</div>;
  }

  const { token } = await auth.api.getToken({
    headers: await headers()
  });

  const data = await fetchMyProposals({freelancerEmail, token});

  const inProgressProjects = data.filter(
    (proposal) => proposal.status && proposal.status.toLowerCase() === "in-progress"
  );

  const completedProjects = data.filter(
    (proposal) => proposal.status && proposal.status.toLowerCase() === "completed"
  );

  return (
    <div className="space-y-10 text-black p-4">
      {/* হেডার সেকশন */}
      <div>
        <h1 className="text-2xl font-bold font-[var(--font-heading)]">Active Projects</h1>
        <p className="text-xs text-brown font-light mt-1">
          Track your ongoing contracts and task updates.
        </p>
      </div>

      {/* 🎯 টপ নোট: একটিভ প্রজেক্ট বলতে কী বোঝায় */}
      <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-4 flex gap-3 text-xs text-blue-900 max-w-3xl mx-auto">
        <FiInfo className="text-blue-600 text-lg shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-light text-blue-800/90 leading-relaxed">
            Active Projects include tasks that are currently <span className="font-semibold text-blue-900">In-Progress</span> (client approved & awaiting your submission) or <span className="font-semibold text-emerald-800">Completed</span> (successfully submit the link)
          </p>
        </div>
      </div>

      {/* যদি দুটি সেকশনই খালি থাকে */}
      {inProgressProjects.length === 0 && completedProjects.length === 0 ? (
        <div className="bg-white border border-brown/10 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto text-brown">
            <FiAlertCircle className="text-xl" />
          </div>
          <h3 className="text-sm font-semibold text-black">No Active Projects</h3>
          <p className="text-xs text-brown font-light">You don't have any in-progress or completed tasks right now.</p>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* ================= সেকশন ১: ইন-প্রগ্রেস প্রজেক্টস ================= */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-black font-[var(--font-heading)] flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span> In-Progress Tasks
            </h2>
            
            {inProgressProjects.length === 0 ? (
              <p className="text-xs text-brown italic pl-2">No tasks are currently in-progress.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inProgressProjects.map((project) => (
                  <div 
                    key={project._id} 
                    className="bg-white border border-brown/10 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* স্ট্যাটাস ব্যাজ */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                        {project.status}
                      </span>
                    </div>

                    {/* জব টাইটেল এবং ক্যাটাগরি */}
                    <div className="space-y-1 max-w-[75%]">
                      <h3 className="text-base font-bold text-black truncate flex items-center gap-1.5">
                        <FiBriefcase className="text-navy flex-shrink-0" /> {project.job_title}
                      </h3>
                      <p className="text-[11px] text-brown font-medium flex items-center gap-1 opacity-80">
                        <FiLayers /> {project.category}
                      </p>
                    </div>

                    <hr className="border-brown/5" />

                    {/* বাজেট, দিন এবং ডেট */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-brown font-light uppercase tracking-wider">Budget & Timeline</p>
                        <p className="text-sm font-bold text-navy">
                          ${project.proposed_budget} <span className="text-xs text-brown font-normal">/ {project.estimated_days} Days</span>
                        </p>
                      </div>
                      
                      <div className="text-right text-[11px] text-brown font-light flex items-center gap-1">
                        <FiCalendar className="opacity-70" />
                        {project.submitted_at ? new Date(project.submitted_at).toLocaleDateString() : "N/A"}
                      </div>
                    </div>

                    {/* অ্যাকশন সাবমিট বাটন */}
                    <div className="pt-2 border-t border-brown/5 text-right">
                      <SubmitTaskButton proposalId={project._id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= সেকশন ২: কমপ্লিটেড প্রজেক্টস (নিচে আলাদা) ================= */}
          {completedProjects.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-brown/10">
              <h2 className="text-lg font-bold text-gray-900 font-[var(--font-heading)] flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600" /> Completed Tasks
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedProjects.map((project) => (
                  <div 
                    key={project._id} 
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* স্ট্যাটাস ব্যাজ */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {project.status}
                      </span>
                    </div>

                    {/* জব টাইটেল এবং ক্যাটাগরি */}
                    <div className="space-y-1 max-w-[75%]">
                      <h3 className="text-base font-bold text-gray-500 truncate flex items-center gap-1.5 line-through">
                        <FiBriefcase className="text-gray-400 flex-shrink-0" /> {project.job_title}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1 opacity-80">
                        <FiLayers /> {project.category}
                      </p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* বাজেট, দিন এবং ডেট */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-gray-400 font-light uppercase tracking-wider">Finalized Budget</p>
                        <p className="text-sm font-bold text-gray-600">
                          ${project.proposed_budget} <span className="text-xs text-gray-400 font-normal">/ {project.estimated_days} Days</span>
                        </p>
                      </div>
                      
                      <div className="text-right text-[11px] text-gray-400 font-light flex items-center gap-1">
                        <FiCalendar className="opacity-70" />
                        {project.submitted_at ? new Date(project.submitted_at).toLocaleDateString() : "N/A"}
                      </div>
                    </div>

                    {/* কমপ্লিটেড স্ট্যাটাস টেক্সট */}
                    <div className="pt-2 border-t border-gray-100 text-right">
                      <span className="inline-block text-emerald-600 font-bold italic text-xs py-1.5">
                        ✓ Completed Task
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ActiveProjectsPage;