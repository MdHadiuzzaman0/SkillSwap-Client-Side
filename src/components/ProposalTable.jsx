"use client";
import React, { useState } from "react";
import { Table } from "@heroui/react";
import { FiClock, FiDollarSign, FiUser, FiFileText } from "react-icons/fi";
import IgnoreButton from "@/components/IgnoreButton";

export default function ProposalTable({ initialProposals, payments = [], session }) {
  const [proposals, setProposals] = useState(initialProposals);
  const activeProposals = proposals.filter((p) => p.status !== "rejected");
  
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
      {Object.entries(groupedProposals).map(([jobTitle, taskProposals]) => (
        <div key={jobTitle} className="space-y-3">

          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <FiFileText className="text-navy w-4 h-4" />
            <h3 className="text-xs font-bold text-gray-700 font-mono">
              Task: {jobTitle} ({taskProposals.length} Proposals)
            </h3>
          </div>

          <Table className="w-full text-left bg-white border border-brown/10 rounded-2xl shadow-sm overflow-hidden">
            <Table.ScrollContainer>
              <Table.Content aria-label={`Proposals for task ${jobTitle}`} className="text-black">

                <Table.Header className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <Table.Column isRowHeader className="p-4 pl-6">Freelancer</Table.Column>
                  <Table.Column className="p-4">Bid Amount</Table.Column>
                  <Table.Column className="p-4">Duration</Table.Column>
                  <Table.Column className="p-4">Cover Note</Table.Column>
                  <Table.Column className="p-4 text-center">Status</Table.Column>
                  <Table.Column className="p-4 pr-6 text-right">Actions</Table.Column>
                </Table.Header>

                <Table.Body className="text-sm divide-y divide-gray-50">
                  {taskProposals.map((proposal) => {
                    
                    // 🎯 ১. পেমেন্ট কালেকশনে এই নির্দিষ্ট টাস্ক ও ফ্রিল্যান্সারের ডাটা আছে কি না চেক
                    const isPaid = payments.some(
                      (p) => p.task_id === proposal.task_id && p.freelancer_email === proposal.freelancer_email
                    );

                    return (
                      <Table.Row key={proposal._id} className="hover:bg-gray-50/40 transition-colors">

                        <Table.Cell className="p-4 pl-6">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-100 rounded-full text-gray-600">
                              <FiUser className="w-4 h-4" />
                            </div>
                            <p className="font-semibold text-xs text-black">{proposal.freelancer_email}</p>
                          </div>
                        </Table.Cell>

                        <Table.Cell className="p-4 font-medium text-navy">
                          <span className="flex items-center gap-0.5">
                            <FiDollarSign className="w-3.5 h-3.5 text-gray-400" />
                            {proposal.proposed_budget}
                          </span>
                        </Table.Cell>

                        <Table.Cell className="p-4 text-gray-600">
                          <span className="flex items-center gap-1.5 text-xs">
                            <FiClock className="w-3.5 h-3.5 text-gray-400" />
                            {proposal.estimated_days} Days
                          </span>
                        </Table.Cell>

                        <Table.Cell className="p-4 max-w-xs">
                          <p className="text-xs text-gray-500 truncate" title={proposal.cover_note}>
                            {proposal.cover_note}
                          </p>
                        </Table.Cell>

                        {/* 🎯 ২. ডাটাবেজের রিয়েল স্ট্যাটাস শো করা */}
                        <Table.Cell className="p-4 text-center">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            proposal.status === "completed" || proposal.status === "in-progress"
                              ? "bg-green-50 text-green-600"
                              : "bg-amber-50 text-amber-600"
                          }`}>
                            {proposal.status || "n/a"}
                          </span>
                        </Table.Cell>

                        {/* 🎯 ৩. বাটন হাইড ও পেইড স্টেট হ্যান্ডলিং */}
                        <Table.Cell className="p-4 pr-6 text-right">
                          <div className="flex justify-end gap-2 items-center">
                            
                            {isPaid ? (
                              // পেমেন্ট থাকলে শুধু এই 'Paid' টেক্সটটা দেখাবে, বাটন দুটি হাইড থাকবে
                              <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                                Paid
                              </span>
                            ) : (
                              // পেমেন্ট না থাকলে আগের মতো নরমাল বাটনগুলো থাকবে
                              <>
                                <IgnoreButton proposalId={proposal._id} setProposals={setProposals} />
                                
                                <form action={`/api/checkout_sessions?proposalId=${proposal._id}`} method="POST" className="inline-block">
                                  <button type="submit" className="bg-navy hover:bg-opacity-95 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-sm">
                                    Accept & Pay
                                  </button>
                                </form>
                              </>
                            )}

                          </div>
                        </Table.Cell>

                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      ))}
    </div>
  );
};