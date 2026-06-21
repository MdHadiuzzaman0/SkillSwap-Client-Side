import React from 'react';
import { FiEye, FiTrash2, FiBriefcase, FiAlertCircle } from 'react-icons/fi';
import { getAllTasks, getAllProposalsForAdmin } from '@/lib/data';
import Link from 'next/link';
import {DeleteButton} from '@/components/DeleteButton'; 

export default async function AdminTasksPage() {
  const tasks = await getAllTasks();
  const proposals = await getAllProposalsForAdmin();
  const combinedTasks = Array.isArray(tasks) ? tasks.map(task => {
    const matchedProposal = Array.isArray(proposals) 
      ? proposals.find(p => p.task_id === task._id?.toString())
      : null;

    let finalStatus = task.status || "open";
    if (matchedProposal && (matchedProposal.status === "in-progress" || matchedProposal.status === "completed")) {
      finalStatus = matchedProposal.status;
    }

    return {
      ...task,
      displayStatus: finalStatus
    };
  }) : [];

  const getStatusBadge = (status) => {
    const base = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border";
    switch (status?.toLowerCase()) {
      case 'in-progress':
        return `${base} bg-amber-50 text-amber-700 border-amber-200`;
      case 'completed':
        return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
      case 'closed':
        return `${base} bg-zinc-100 text-zinc-600 border-zinc-300`;
      default: 
        return `${base} bg-blue-50 text-blue-700 border-blue-200`;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-black bg-gray-50 min-h-screen">
      
      {/* 📝 পেজ হেডার ও ইন্ট্রো */}
      <div className="mb-6">
        <h2 className="text-xl font-black font-[var(--font-heading)] text-navy tracking-tight">Manage Tasks</h2>
        <p className="text-xs text-gray-500 mt-1">Review live projects and eliminate dangerous or violating job cards</p>
      </div>

      {/* 📊 টাস্ক লিস্ট টেবিল কন্টেইনার */}
      <div className="bg-white border border-gray-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          
          {combinedTasks.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                <FiBriefcase className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-gray-700">No Tasks Posted Yet</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200/80 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Task Title</th>
                  <th className="py-4 px-6">Client Email</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Budget</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100">
                {combinedTasks.map((task, idx) => (
                  <tr 
                    key={task._id || idx} 
                    className="text-xs transition-colors duration-200 hover:bg-gray-50/50 group"
                  >
                    {/* ১. টাস্ক টাইটেল */}
                    <td className="py-4 px-6 font-semibold text-gray-800 max-w-[200px] truncate">
                      {task.title || 'Untitled Task'}
                    </td>

                    {/* ২. ক্লায়েন্ট ইমেইল */}
                    <td className="py-4 px-6 text-gray-500 font-medium truncate max-w-[150px]">
                      {task.clientEmail || 'N/A'}
                    </td>

                    {/* ৩. ক্যাটাগরি */}
                    <td className="py-4 px-6 text-gray-600 font-medium">
                      <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
                        {task.category || 'Other'}
                      </span>
                    </td>

                    {/* ৪. বাজেট */}
                    <td className="py-4 px-6 font-bold text-zinc-900">
                      ${task.budget || 0}
                    </td>

                    {/* ৫. কম্বাইন করা লাইভ স্ট্যাটাস লেবেল */}
                    <td className="py-4 px-6">
                      <span className={getStatusBadge(task.displayStatus)}>
                        <span className={`w-1 h-1 rounded-full ${task.displayStatus === 'completed' ? 'bg-emerald-500' : task.displayStatus === 'in- बैठे' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                        {task.displayStatus}
                      </span>
                    </td>

                    {/* 🛠️ ৬. অ্যাকশন বাটন কলাম (View এবং Delete পাশাপাশি gap-3 দিয়ে) */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                                <Link
                                    href={`/browse-tasks/${task._id}`}
                                    className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                    title="View Details"
                                >
                                    <FiEye className="w-4 h-4" />
                                </Link>

                                <DeleteButton task={task} />

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}