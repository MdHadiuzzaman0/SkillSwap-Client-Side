"use client";

import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import { FiCheckCircle, FiXCircle, FiClock, FiDollarSign, FiUser, FiFileText } from "react-icons/fi";

export default function ProposalTable({ initialProposals }) {
  // সার্ভার থেকে আসা র ডাটা স্টেটে রাখা হলো
  const [proposals, setProposals] = useState(initialProposals);
  const activeProposals = proposals.filter((p) => p.status !== "Rejected");
  const groupedProposals = activeProposals.reduce((groups, proposal) => {
    const title = proposal.job_title || "Unknown Task";
    if (!groups[title]) {
      groups[title] = [];
    }
    groups[title].push(proposal);
    return groups;
  }, {});
  
  if (Object.keys(groupedProposals).length === 0) {
    return (
      <div className="bg-white p-12 text-center border border-brown/10 rounded-2xl shadow-sm">
        <p className="text-gray-500 text-sm">No active proposals available to manage.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* 🎯 ৩. লুপ চালিয়ে প্রতিটা Task ID এর জন্য আলাদা আলাদা অ্যারেঞ্জমেন্ট/টেবিল তৈরি */}
      {Object.entries(groupedProposals).map(([jobTitle, taskProposals]) => (
        <div key={jobTitle} className="space-y-3">
          
          {/* টাস্কের জন্য একটা মিনি হেডার/টাইটেল কার্ড */}
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <FiFileText className="text-navy w-4 h-4" />
            <h3 className="text-xs font-bold text-gray-700 font-mono">
              Task: {jobTitle} ({taskProposals.length} Proposals)
            </h3>
          </div>

          {/* ওই নির্দিষ্ট টাস্কের নিজস্ব প্রপোজাল টেবিল */}
          <Table className="w-full text-left bg-white border border-brown/10 rounded-2xl shadow-sm overflow-hidden">
            <Table.ScrollContainer>
              <Table.Content aria-label={`Proposals for task ${taskId}`} className="text-black">
                
                <Table.Header className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <Table.Column className="p-4 pl-6">Freelancer</Table.Column>
                  <Table.Column className="p-4">Bid Amount</Table.Column>
                  <Table.Column className="p-4">Duration</Table.Column>
                  <Table.Column className="p-4">Cover Note</Table.Column>
                  <Table.Column className="p-4 text-center">Status</Table.Column>
                  <Table.Column className="p-4 pr-6 text-right">Actions</Table.Column>
                </Table.Header>

                <Table.Body className="text-sm divide-y divide-gray-50">
                  {taskProposals.map((proposal) => (
                    <Table.Row key={proposal._id} className="hover:bg-gray-50/40 transition-colors">
                      
                      {/* ফ্রিল্যান্সার ইমেইল */}
                      <Table.Cell className="p-4 pl-6">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gray-100 rounded-full text-gray-600">
                            <FiUser className="w-4 h-4" />
                          </div>
                          <p className="font-semibold text-xs text-black">{proposal.freelancer_email}</p>
                        </div>
                      </Table.Cell>

                      {/* বাজেট বিড */}
                      <Table.Cell className="p-4 font-medium text-navy">
                        <span className="flex items-center gap-0.5">
                          <FiDollarSign className="w-3.5 h-3.5 text-gray-400" />
                          {proposal.proposed_budget}
                        </span>
                      </Table.Cell>

                      {/* ডিউরেশন */}
                      <Table.Cell className="p-4 text-gray-600">
                        <span className="flex items-center gap-1.5 text-xs">
                          <FiClock className="w-3.5 h-3.5 text-gray-400" />
                          {proposal.estimated_days} Days
                        </span>
                      </Table.Cell>

                      {/* কভার নোট */}
                      <Table.Cell className="p-4 max-w-xs">
                        <p className="text-xs text-gray-500 truncate" title={proposal.cover_note}>
                          {proposal.cover_note}
                        </p>
                      </Table.Cell>

                      {/* স্ট্যাটাস */}
                      <Table.Cell className="p-4 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          proposal.status === "Accepted" 
                            ? "bg-green-50 text-green-600" 
                            : "bg-amber-50 text-amber-600"
                        }`}>
                          {proposal.status || "Pending"}
                        </span>
                      </Table.Cell>

                      {/* অ্যাকশন বাটনসমূহ */}
                      <Table.Cell className="p-4 pr-6 text-right">
                        <div className="flex justify-end gap-2">
                          <IgnoreButton proposalId={proposal._id} setProposals={setProposals} />

                          <Button
                            size="sm"
                            className="bg-navy text-white hover:opacity-90 font-medium rounded-xl px-3 py-1.5 text-xs cursor-pointer flex items-center gap-1"
                          >
                            <FiCheckCircle className="w-3.5 h-3.5" /> Accept
                          </Button>
                        </div>
                      </Table.Cell>

                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      ))}
    </div>
  );
}