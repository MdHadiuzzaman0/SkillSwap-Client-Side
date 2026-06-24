import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Helper function to calculate time ago dynamically
const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Just now';

  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = now - past;

  // If the server time and client time discrepancy results in negative
  if (elapsed < 0) return 'Just now';

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + 's ago';
  }
  else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + 'm ago';
  }
  else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + 'h ago';
  }
  else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + 'd ago';
  }
  else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + 'mo ago';
  }
  else {
    return Math.round(elapsed / msPerYear) + 'y ago';
  }
};

const TaskCard = ({ task, session }) => {
  const { _id, title, category, description, budget, deadline, status, clientEmail, clientName, clientImage, createdAt } = task;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-brown/20 p-6 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300 max-w-xl mx-auto w-full font-[var(--font-body)]">

      {/* Top Section: Category Badge & Status / Time Ago */}
      <div className="flex items-center justify-between mb-4">
        {/* Category & Dynamic Time-ago together */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-black bg-tan/40 rounded-lg">
            {category}
          </span>
          {/* 🎯 dynamic time ago indicator */}
          <span className="text-[11px] text-brown font-medium bg-cream/50 px-2 py-1 rounded-md">
            {formatTimeAgo(createdAt)}
          </span>
        </div>

        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${status === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
          {status}
        </span>
      </div>

      {/* Middle Section: Title & Description */}
      <div className="mb-5 flex-grow">
        <h3 className="text-xl font-bold text-black mb-2 line-clamp-1 hover:text-navy transition-colors font-[var(--font-heading)]">
          {title}
        </h3>
        <p className="text-brown text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Info Section: Budget & Deadline */}
      <div className="grid grid-cols-2 gap-4 bg-cream/40 border border-brown/10 rounded-xl p-4 mb-5 text-sm">
        <div>
          <p className="text-brown/70 text-xs uppercase font-semibold tracking-wider mb-0.5">Budget</p>
          <p className="text-xl font-bold text-navy">${budget}</p>
        </div>
        <div>
          <p className="text-brown/70 text-xs uppercase font-semibold tracking-wider mb-0.5">Deadline</p>
          <p className="text-black font-medium">
            {new Date(deadline).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Bottom Section: Client Info & View Details Button */}
      <div className="flex items-center justify-between gap-3 border-t border-brown/10 pt-4 mt-auto">
        <div className="flex items-center gap-2.5 max-w-[60%]">
          {/* Fixed Next.js Image Component Wrapper */}
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image
              src={clientImage || "https://i.pravatar.cc/150"}
              alt={clientName || "Client"}
              fill
              sizes="36px"
              className="rounded-full object-cover border border-tan"
            />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-bold text-black truncate">{clientName || "Client"}</span>
          </div>
        </div>

        {session ? (
          <Link
            href={`/browse-tasks/${_id}`}
            className="px-4 py-2.5 bg-gray-300 text-black text-xs font-semibold rounded-xl hover:bg-brown transition-colors duration-200 text-center shadow-sm"
          >
            View Details
          </Link>
        ) : (
          <Link
            href="/login" 
            className="px-4 py-2.5 bg-amber-300 text-white text-xs font-semibold rounded-xl hover:bg-amber-700 transition-colors duration-200 text-center shadow-sm flex items-center justify-center gap-1"
          >
            Login to View
          </Link>
        )}
      </div>

    </div>
  );
};

export default TaskCard;