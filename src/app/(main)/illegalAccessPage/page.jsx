
import Link from "next/link";
import { FiAlertOctagon, FiLogIn, FiShield, FiTerminal } from "react-icons/fi";

export default function IllegalAccessPage() {

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center justify-center p-4 selection:bg-red-500 selection:text-black">
      
      {/* 🔴 মেইন ওয়ার্নিং বক্স */}
      <div className="w-full max-w-2xl bg-zinc-950 border-2 border-red-600 rounded-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden">
        
        {/* গ্লিচ বা রাডার ইফেক্ট লাইট */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>

        {/* 🚨 আইকন ও হেডার */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-red-950/50 border border-red-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(220,38,38,0.3)] animate-bounce">
            <FiShield className="text-4xl text-red-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase">
            SECURITY BREACH DETECTED
          </h1>
          <div className="mt-2 text-xs font-bold bg-red-950 border border-red-800 text-red-400 px-3 py-1 rounded-md uppercase tracking-wider">
            Unauthorized Route Access Attempt
          </div>
        </div>

        {/* 📝 থ্রেট মেসেজ (Threat Message) */}
        <div className="space-y-4 text-center sm:text-left bg-black/50 border border-zinc-800 p-5 rounded-xl">
          <p className="text-red-400 font-bold text-sm sm:text-base flex items-center gap-2 justify-center sm:justify-start">
            <FiAlertOctagon className="text-red-500 flex-shrink-0" />
            Why are you trying to perform such illegal actions?
          </p>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            You just attempted to bypass role-based security barriers to access an illegal route. 
            Be advised that your account is now under <span className="text-white font-bold underline decoration-red-500">our full, active observation</span>.
          </p>
          <div className="border-t border-zinc-900 my-3"></div>
          <p className="text-zinc-500 text-xs leading-relaxed italic">
            Your system logs, IP metadata, and account state have been automatically packaged and transferred to our <span className="text-red-400 font-bold not-italic">Cyber Security & IT Unit</span> for further investigation. Persistent attempts will result in a permanent ban.
          </p>
        </div>

        {/* 💻 ফেক টার্মিনাল ডাটা (ভয় বাড়ানোর জন্য) */}
        <div className="mt-6 bg-zinc-900/40 border border-zinc-800 rounded-lg p-3 text-[11px] text-zinc-500 flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-zinc-400"><FiTerminal /> system_log_report:</span>
          <span>&gt; ACCESS_VIOLATION: True</span>
          <span>&gt; ACTION: Logging user session details... Done.</span>
          <span className="text-red-600 animate-pulse">&gt; STATUS: SENT_TO_IT UNIT_PENDING_REVIEW</span>
        </div>

        {/* 🎯 লগইন বাটন (Login Button) */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center border-t border-zinc-900">
          <Link href="/login"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-red-600/20 active:scale-[0.98] cursor-pointer"
          >
            <FiLogIn className="text-base" /> Go Back To Login
          </Link>
        </div>

      </div>
    </div>
  );
}