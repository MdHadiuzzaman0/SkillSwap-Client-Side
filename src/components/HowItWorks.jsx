import { FiUserPlus, FiFileText, FiCreditCard } from "react-icons/fi";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 font-body">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-[var(--color-black)]">
          How It Works
        </h2>
        <p className="text-[var(--color-brown)] text-base sm:text-lg">
          Get your small projects completed in three simple, secure steps.
        </p>
      </div>

      {/* 3-Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        
        {/* Step 1: Post a Task */}
        <div className="equal-height-card p-8 rounded-2xl border border-[var(--color-tan)]/40 bg-white/50 backdrop-blur-sm text-center relative group hover:shadow-md transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[var(--color-navy)] text-[var(--color-cream)] text-2xl group-hover:bg-[var(--color-tan)] group-hover:text-[var(--color-black)] transition-colors duration-300">
            <FiFileText />
          </div>
          <h3 className="text-xl font-bold font-heading mb-3 text-[var(--color-black)]">1. Post a Task</h3>
          <p className="text-[var(--color-brown)] text-sm leading-relaxed">
            Clients describe the micro-task, choose a specific category, set a fixed USD budget, and pick a realistic deadline date.
          </p>
        </div>

        {/* Step 2: Get Proposals */}
        <div className="equal-height-card p-8 rounded-2xl border border-[var(--color-tan)]/40 bg-white/50 backdrop-blur-sm text-center relative group hover:shadow-md transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[var(--color-navy)] text-[var(--color-cream)] text-2xl group-hover:bg-[var(--color-tan)] group-hover:text-[var(--color-black)] transition-colors duration-300">
            <FiUserPlus />
          </div>
          <h3 className="text-xl font-bold font-heading mb-3 text-[var(--color-black)]">2. Get Proposals</h3>
          <p className="text-[var(--color-brown)] text-sm leading-relaxed">
            Skilled freelancers browse through the open tasks marketplace and submit tailored proposals with bids and delivery times.
          </p>
        </div>

        {/* Step 3: Hire and Pay */}
        <div className="equal-height-card p-8 rounded-2xl border border-[var(--color-tan)]/40 bg-white/50 backdrop-blur-sm text-center relative group hover:shadow-md transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[var(--color-navy)] text-[var(--color-cream)] text-2xl group-hover:bg-[var(--color-tan)] group-hover:text-[var(--color-black)] transition-colors duration-300">
            <FiCreditCard />
          </div>
          <h3 className="text-xl font-bold font-heading mb-3 text-[var(--color-black)]">3. Hire and Pay</h3>
          <p className="text-[var(--color-brown)] text-sm leading-relaxed">
            The client reviews applications, accepts the best fit, pays securely via Stripe Checkout, and the freelancer starts working immediately.
          </p>
        </div>

      </div>
    </section>
  );
}