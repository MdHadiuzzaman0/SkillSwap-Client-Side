import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTaskById } from "@/lib/data"; 
import { FiClock, FiDollarSign, FiCalendar, FiBookmark, FiSend, FiShield, FiArrowLeft,FiUser,FiMail,FiBriefcase } from "react-icons/fi";
import ProposalSubmitButton from "@/components/ProposalSubmitButton";

// Helper function for dynamic time calculation
const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Just now';
  const elapsed = new Date() - new Date(dateString);
  const mins = 60 * 1000, hrs = mins * 60, days = hrs * 24;
  if (elapsed < mins) return 'Just now';
  if (elapsed < hrs) return Math.round(elapsed / mins) + 'm ago';
  if (elapsed < days) return Math.round(elapsed / hrs) + 'h ago';
  return Math.round(elapsed / days) + 'd ago';
};

const TaskDetailsPage = async ({ params: paramsPromise }) => {
  const params = await paramsPromise;
  const taskId = params.id;
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const currentUserEmail = session?.user?.email;
  const taskData = await getTaskById(taskId);

  if (!task) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream font-[var(--font-body)]">
        <h2 className="font-[var(--font-heading)] text-3xl font-bold text-black mb-2">Task Not Found</h2>
        <p className="text-brown mb-6">The contract workspace you are looking for does not exist.</p>
        <Link href="/browse-tasks" className="px-5 py-2.5 bg-navy text-cream rounded-xl text-xs font-semibold hover:bg-brown transition-colors flex items-center gap-2">
          <FiArrowLeft /> Back to Exploration
        </Link>
      </div>
    );
  }

  const { title, category, description, budget, deadline, status, clientEmail, clientName, clientImage, createdAt } = taskData;

  return (
    <div className="bg-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-[var(--font-body)]">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button Link */}
        <Link href="/browse-tasks" className="inline-flex items-center gap-2 text-sm font-medium text-brown hover:text-navy mb-6 transition-colors group">
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to Tasks
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Core Task Work Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-brown/10 p-6 md:p-8 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-navy transition-all duration-300 group-hover:bg-tan" />

              {/* Breadcrumb & Metadata Meta Row */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-brown mb-5">
                <span className="px-2.5 py-1 bg-tan/20 text-black font-semibold rounded-md uppercase tracking-wider flex items-center gap-1.5">
                  <FiBriefcase className="text-sm" /> {category}
                </span>
                <span>•</span>
                <span className="bg-cream/40 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
                  <FiClock className="text-sm text-navy" /> {formatTimeAgo(createdAt)}
                </span>
                <span>•</span>
                <span className={`px-2.5 py-0.5 font-semibold rounded-full ${status === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {status}
                </span>
              </div>

              {/* Task Title */}
              <h1 className="font-[var(--font-heading)] text-2xl md:text-4xl font-bold text-black mb-6 leading-tight group-hover:text-navy transition-colors duration-300">
                {title}
              </h1>

              {/* Detailed Project Scope Statement */}
              <div className="prose max-w-none text-brown text-sm md:text-base space-y-4 border-t border-brown/10 pt-6">
                <h3 className="text-black font-bold text-lg font-[var(--font-heading)] flex items-center gap-2">
                  Project Requirement & Scope
                </h3>
                <p className="leading-relaxed whitespace-pre-wrap font-light">{description}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Financials & Action Modules */}
          <div className="space-y-6">
            
            {/* Card Module 1: Contract Budget & Lock Mechanism */}
            <div className="bg-white rounded-3xl border border-brown/10 p-6 shadow-sm space-y-5 relative overflow-hidden">
              <div>
                <span className="text-xs text-brown font-semibold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <FiDollarSign className="text-navy" /> Contract Budget
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-navy tracking-tight">${budget}</span>
                  <span className="text-xs text-brown font-medium">USD (Fixed Price)</span>
                </div>
              </div>

              <div className="border-t border-brown/5 pt-4">
                <span className="text-xs text-brown font-semibold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                  <FiCalendar className="text-navy" /> Submission Deadline
                </span>
                <span className="text-sm font-bold text-black block">
                  {new Date(deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              {/* Interactive Application Buttons */}
              <div className="pt-2 space-y-2">
                <ProposalSubmitButton taskData={taskData} currentUserEmail={currentUserEmail}/>
                <button className="w-full py-3 bg-white text-navy border border-navy/20 font-semibold rounded-xl text-xs tracking-wide hover:bg-cream/30 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2">
                  <FiBookmark /> Bookmark Contract
                </button>
              </div>
            </div>

            {/* Card Module 2: Client Profile Meta Module */}
            <div className="bg-white rounded-3xl border border-brown/10 p-6 shadow-sm text-center space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brown text-left border-b border-brown/5 pb-2 flex items-center gap-1.5">
                <FiUser className="text-navy" /> Client Overview
              </h4>
              
              <div className="flex flex-col items-center py-2">
                <div className="relative w-16 h-16 mb-3">
                  <Image 
                    src={clientImage || "https://i.pravatar.cc/150"} 
                    alt={clientName || "Client"} 
                    fill 
                    sizes="64px"
                    className="rounded-full object-cover border-2 border-tan"
                  />
                </div>
                <h3 className="text-base font-bold text-black">{clientName || "Verified Recruiter"}</h3>
                <span className="text-xs text-brown truncate w-full max-w-[200px] flex items-center justify-center gap-1 mt-1" title={clientEmail}>
                  <FiMail className="flex-shrink-0 text-tan" /> {clientEmail}
                </span>
              </div>

              <div className="bg-cream/30 rounded-xl p-3 text-[11px] font-medium text-brown flex items-center justify-center gap-1.5 border border-tan/10">
                <FiShield className="text-emerald-600 text-sm" />
                <span>Secure Payment Escrow Verified</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;