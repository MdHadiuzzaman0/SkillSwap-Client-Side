"use client";
import Link from "next/link";

export default function HomePage() {
 const { data: session } = authClient.useSession();
 const user = session?.user;

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center rounded-2xl overflow-hidden my-4 shadow-xl">
      
      {/* Background Image Layer with Dark Overlay for Better Contrast */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{ 
          backgroundImage: `url('/home.jpg')`, // Reference to your uploaded home.jpg in the public folder
        }}
      />
      <div className="absolute inset-0 bg-[#0A0908]/65 mix-blend-multiply" />

      {/* Main Hero Content Area */}
      <div className="relative z-10 text-center max-w-5xl px-6 py-12 sm:py-20 text-[#EAE0D5]">
        
        {/* Dynamic Label */}
        <span className="text-[var(--color-tan)] uppercase tracking-widest text-xs sm:text-sm font-bold bg-[var(--color-navy)]/60 px-4 py-1.5 rounded-full inline-block mb-6 backdrop-blur-sm">
          Welcome to SkillSwap Marketplace
        </span>

        {/* Heading using Epunda Slab styling */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight font-heading drop-shadow-md">
          Get your tasks <br />
          with <span className="text-[var(--color-tan)]">skilled freelancers</span>
        </h1>

        {/* Subtext using Epunda Sans styling */}
        <p className="text-base sm:text-lg md:text-xl text-[#EAE0D5]/90 mb-10 max-w-2xl mx-auto font-body font-normal leading-relaxed">
          Post small, simple tasks like making a logo, writing articles, or fixing code bugs. 
          Connect directly with premium workers for fast, one-time jobs.
        </p>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-body">
          
          {/* Button 1: Browse Jobs (Visible to Everyone) */}
          <Link href="/browse-tasks" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl text-[var(--color-black)] bg-[var(--color-tan)] hover:bg-[#EAE0D5] hover:text-[var(--color-navy)] shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
              Browse Jobs
            </button>
          </Link>

          {/* Button 2: Post a Job (CRITICAL LOGIC: Hidden if logged-in user is a Freelancer) */}
          {(user && (user.role === "client" || !user.role) && (
            <Link href="/dashboard/client" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 font-semibold rounded-xl text-[var(--color-cream)] bg-[var(--color-navy)] hover:bg-[var(--color-tan)] hover:text-[var(--color-black)] border border-[var(--color-brown)]/40 shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                Post a Job
              </button>
            </Link>
          )}

          {/* Button 3: Learn More (Visible to Everyone) */}
          <Link href="#how-it-works" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 font-medium rounded-xl text-[#EAE0D5] bg-transparent hover:bg-white/10 border border-[#EAE0D5]/30 transition-all duration-300 backdrop-blur-sm">
              Learn More
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}