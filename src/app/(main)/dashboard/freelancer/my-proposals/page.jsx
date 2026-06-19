"use client";
import React, { useState, useEffect } from "react";
import { fetchMyProposals } from "@/lib/data";
import { FiCalendar, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const MyProposalsPage = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession(); 
  const freelancerEmail = session?.user?.email;

  useEffect(() => {
    if (!freelancerEmail) return;
    const getData = async () => {
      setLoading(true);
      const data = await fetchMyProposals(freelancerEmail);
      const pendingProposals = data.filter(
        (proposal) => !proposal.status || proposal.status.toLowerCase() === "pending"
      );
      
      setProposals(pendingProposals);
      setLoading(false);
    };
    getData();
  }, [freelancerEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-sm font-semibold text-brown">Loading Proposals...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black font-[var(--font-heading)]">My Proposals</h1>
        <p className="text-xs text-brown font-light mt-1">
          Track and manage all your submitted applications and bid statuses.
        </p>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-white border border-brown/10 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto text-brown">
            <FiAlertCircle className="text-xl" />
          </div>
          <h3 className="text-sm font-semibold text-black">No Proposals</h3>
          <p className="text-xs text-brown font-light">You don't have any active proposals right now.</p>
        </div>
      ) : (
        <div className="bg-white border border-brown/10 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream/40 border-b border-brown/10 text-xs font-semibold text-brown uppercase tracking-wider">
                  <th className="p-4 pl-6">Task Title</th>
                  <th className="p-4">Budget Bid</th>
                  <th className="p-4">Date Sent</th>
                  <th className="p-4 pr-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown/5 text-xs text-black">
                {proposals.map((proposal) => (
                  <tr key={proposal._id} className="hover:bg-cream/20 transition-colors">
                    {/* ১. Task Title */}
                    <td className="p-4 pl-6 font-medium max-w-xs truncate">{proposal.job_title}</td>
                    
                    {/* ২. Budget Bid */}
                    <td className="p-4 font-semibold text-navy">${proposal.proposed_budget}</td>
                    
                    {/* ৩. Date Sent */}
                    <td className="p-4 text-brown font-light">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="opacity-70" />
                        {proposal.submitted_at ? new Date(proposal.submitted_at).toLocaleDateString() : "N/A"}
                      </div>
                    </td>
                    
                    {/* ৪. Status Text - শুধুই pending দেখাবে */}
                    <td className="p-4 pr-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                        {proposal.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProposalsPage;