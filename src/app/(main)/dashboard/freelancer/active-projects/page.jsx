import { fetchMyProposals } from "@/lib/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FiCalendar, FiAlertCircle, FiBriefcase, FiMail, FiLayers } from "react-icons/fi";
import { SubmitTaskButton } from "@/components/SubmitTaskButton";

const ActiveProjectsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers() 
})
  const freelancerEmail = session?.user?.email;

  if (!freelancerEmail) {
    return <div className="p-6 text-center text-xs text-red-500">Unauthorized. Please log in.</div>;
  }

  // ডাটা ফেচ করা হচ্ছে সরাসরি সার্ভারে
  const data = await fetchMyProposals(freelancerEmail);

  // pending ছাড়া বাকি সব (In Progress, Completed) ফিল্টার করা হলো
  const activeProjects = data.filter(
    (proposal) => proposal.status && proposal.status.toLowerCase() !== "pending"
  );

  return (
    <div className="space-y-6 text-black p-4">
      <div>
        <h1 className="text-2xl font-bold font-[var(--font-heading)]">Active Projects</h1>
        <p className="text-xs text-brown font-light mt-1">
          Track your ongoing contracts and task updates.
        </p>
      </div>

      {activeProjects.length === 0 ? (
        <div className="bg-white border border-brown/10 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto text-brown">
            <FiAlertCircle className="text-xl" />
          </div>
          <h3 className="text-sm font-semibold text-black">No Active Projects</h3>
          <p className="text-xs text-brown font-light">You don't have any in-progress or completed tasks right now.</p>
        </div>
      ) : (
        // টেবিল ছাড়া সিঙ্গেল কম্পোনেন্ট/কার্ড গ্রিড লেআউট
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeProjects.map((project) => (
            <div 
              key={project._id} 
              className="bg-white border border-brown/10 rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* স্ট্যাটাস ব্যাজ */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    project.status === "Completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
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

              {/* আইডি এবং ইমেইল ইনফো (যা মাস্ট রাখতে বলেছেন) */}
              <div className="grid grid-cols-1 gap-2 text-[11px] text-gray-600 bg-cream/30 p-3 rounded-xl border border-brown/5">
                <p className="font-mono truncate">
                  <span className="font-bold text-black">Task ID:</span> {project.task_id}
                </p>
                <p className="truncate flex items-center gap-1">
                  <FiMail className="opacity-70" /> <span className="font-bold text-black">Client:</span> {project.client_email}
                </p>
                <p className="truncate flex items-center gap-1">
                  <FiMail className="opacity-70" /> <span className="font-bold text-black">Freelancer:</span> {project.freelancer_email}
                </p>
              </div>

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

              {/* অ্যাকশন কন্ডিশনাল বাটন / টেক্সট */}
              <div className="pt-2 border-t border-brown/5 text-right">
                {project.status === "in-progress" ? (
                  <SubmitTaskButton proposalId={project._id} />
                ) : (
                  <span className="inline-block text-emerald-600 font-bold italic text-xs py-1.5">
                    ✓ Completed Task
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveProjectsPage;