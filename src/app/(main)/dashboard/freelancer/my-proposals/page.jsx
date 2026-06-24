"use client";
import React, { useState, useEffect } from "react";
import { fetchMyProposals } from "@/lib/data";
import { FiCalendar, FiAlertCircle, FiXCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const MyProposalsPage = () => {
  const [pendingProposals, setPendingProposals] = useState([]);
  const [rejectedProposals, setRejectedProposals] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const freelancerEmail = session?.user?.email;

  useEffect(() => {
    if (!freelancerEmail) return;
    const getData = async () => {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token; 
      const data = await fetchMyProposals({freelancerEmail, token});

      const pending = data.filter(
        (proposal) => !proposal.status || proposal.status.toLowerCase() === "pending"
      );

      const rejected = data.filter(
        (proposal) => proposal.status && proposal.status.toLowerCase() === "rejected"
      );

      setPendingProposals(pending);
      setRejectedProposals(rejected);
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
    <div className="space-y-12"> 
      
      {/* Active panel */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-black font-[var(--font-heading)]">My Active Proposals</h1>
          <p className="text-xs text-brown font-light mt-1">
            Track and manage your submitted applications currently awaiting client review.
          </p>
        </div>

        {pendingProposals.length === 0 ? (
          <div className="bg-white border border-brown/10 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto text-brown">
              <FiAlertCircle className="text-xl" />
            </div>
            <h3 className="text-sm font-semibold text-black">No Active Proposals</h3>
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
                  {pendingProposals.map((proposal) => (
                    <tr key={proposal._id} className="hover:bg-cream/20 transition-colors">
                      <td className="p-4 pl-6 font-medium max-w-xs truncate">{proposal.job_title}</td>
                      <td className="p-4 font-semibold text-navy">${proposal.proposed_budget}</td>
                      <td className="p-4 text-brown font-light">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar className="opacity-70" />
                          {proposal.submitted_at ? new Date(proposal.submitted_at).toLocaleDateString() : "N/A"}
                        </div>
                      </td>
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

      {/* Rejected panel */}
      {rejectedProposals.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-brown/10">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-[var(--font-heading)] flex items-center gap-2">
              <FiXCircle className="text-rose-500" /> Declined Proposals
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1">
              Applications that were declined or rejected by the clients.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="p-4 pl-6">Task Title</th>
                    <th className="p-4">Your Bid</th>
                    <th className="p-4">Date Sent</th>
                    <th className="p-4 pr-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {rejectedProposals.map((proposal) => (
                    <tr key={proposal._id} className="hover:bg-rose-50/10 transition-colors">
                      <td className="p-4 pl-6 font-medium max-w-xs truncate text-gray-500 line-through">{proposal.job_title}</td>
                      <td className="p-4 font-semibold text-gray-500">${proposal.proposed_budget}</td>
                      <td className="p-4 text-gray-400 font-light">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar className="opacity-70" />
                          {proposal.submitted_at ? new Date(proposal.submitted_at).toLocaleDateString() : "N/A"}
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800">
                          Rejected
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyProposalsPage;