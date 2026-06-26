import Link from "next/link";
import { FiShield, FiLogIn, FiTerminal } from "react-icons/fi";

export default function IllegalAccessPage() {

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center justify-center p-4 selection:bg-red-500 selection:text-black">

      {/* 🔴 মেইন ওয়ার্নিং বক্স */}
      <div className="w-full max-w-2xl bg-zinc-950 border-2 border-red-600 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden text-center">

        {/* 🚨 নিয়ন রেড অ্যালার্ট ডট */}
        <div className="flex justify-center mb-6">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-500/5 border border-red-500/20">
            <FiShield className="text-xl text-red-500" />
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-10 animate-ping"></span>
          </div>
        </div>

        {/* 📝 শর্ট ও টু-দ্য-পয়েন্ট টেক্সট */}
        <h1 className="text-white font-black text-lg tracking-tight uppercase mb-2">
          SECURITY BREACH DETECTED
        </h1>

        <p className="text-red-500/90 text-xs font-semibold tracking-wider uppercase mb-4 bg-red-500/5 border border-red-500/10 py-1 px-3 rounded-full inline-block">
          Unauthorized Route Access Attempt
        </p>

        <div className="space-y-3 my-6 px-2 text-sm text-zinc-400/90 leading-relaxed font-medium">
          <p>
            This account is now under <span className="text-white font-bold underline decoration-red-500/50">full observation</span> due to illegal navigation attempt.
          </p>
          <p className="text-xs text-zinc-500 text-justify border-t border-zinc-900/80 pt-3 italic">
            Your system logs, IP metadata and account state have been automatically packaged and transferred to our <span className="text-red-400 font-bold not-italic">Cyber Security & IT Unit</span> for further investigation.
          </p>
        </div>

        <div className="mt-6 bg-zinc-900/40 border border-zinc-800 rounded-lg p-3 text-[11px] text-zinc-500 flex flex-col gap-1 text-left">
          <span className="flex items-center gap-1.5 text-zinc-400"><FiTerminal /> system_log_report:</span>
          <span>&gt; ACCESS_VIOLATION: True</span>
          <span>&gt; ACTION: Logging user session details...</span>
          <span className="text-red-600 animate-pulse">&gt; STATUS: PENDING_REVIEW</span>
        </div>

        {/* 🎯 ক্লাসি মিনিমাল বাটন */}
        <Link href="/login"
          className="w-full mt-4 bg-zinc-900 hover:bg-zinc-850 text-white font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl border border-zinc-800 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer shadow-sm hover:border-zinc-700"
        >
          <FiLogIn className="text-sm text-zinc-400" /> Return to Login
        </Link>

      </div>
      
    </div>
  );
}