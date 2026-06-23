import React from "react";
import { FiBriefcase } from "react-icons/fi";
import { getClientProposalsAction } from "@/lib/data"; 
import ProposalTable from "@/components/ProposalTable";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers"

export default async function ManageProposalsPage() {
  const session = await auth.api.getSession({
    headers: await headers() 
}); 
  const clientEmail = session?.user?.email || "";

  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  
    const proposals = await getClientProposalsAction({clientEmail, token});
    //console.log(clientEmail, proposals);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* হেডার সেকশন */}
      <div className="flex items-center gap-3 border-b border-brown/10 pb-4">
        <div className="p-2.5 bg-navy/10 text-navy rounded-xl">
          <FiBriefcase className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-[var(--font-heading)] text-black">Manage Proposals</h1>
          <p className="text-xs text-brown font-light mt-0.5">
            Review submissions from freelancers and hire the best fit for your tasks[cite: 1].
          </p>
        </div>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-white p-12 text-center border border-brown/10 rounded-2xl shadow-sm">
          <p className="text-gray-500 text-sm">No proposals received yet for your tasks.</p>
        </div>
      ) : (
        <ProposalTable initialProposals={proposals} />
      )}
    </div>
  );
}