"use client"; // Required since react-fast-marquee uses browser window APIs for rendering

import Marquee from "react-fast-marquee";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function Reviews() {
  // Verified community reviews containing 3 freelancers and 2 clients
  const reviews = [
    {
      id: 1,
      name: "Anisur Rahman",
      title: "Senior UI/UX Designer",
      role: "freelancer",
      image: "https://i.pravatar.cc/150?img=11",
      comment: "SkillSwap has completely changed how I find quick UI gigs. The platform is incredibly smooth, payments via Stripe are fully secure, and I don't have to deal with complex long-term contract management.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      title: "Content Strategist",
      role: "client",
      image: "https://i.pravatar.cc/150?img=32",
      comment: "Finding a quick proofreader for my articles used to take days on bigger platforms. Here, I posted a task and hired a talented writer within two hours. The fixed-budget flow works perfectly for small tasks.",
      rating: 5
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      title: "Full-Stack Developer",
      role: "freelancer",
      image: "https://i.pravatar.cc/150?img=13",
      comment: "I love fixing small CSS and backend bugs during my free hours. This platform gives me direct access to clients who need quick code fixes. The dashboard tracking system makes deliverable submission extremely easy.",
      rating: 4
    },
    {
      id: 4,
      name: "David Miller",
      title: "Tech Startup Founder",
      role: "client",
      image: "https://i.pravatar.cc/150?img=60",
      comment: "We needed a quick SVG logo vectorization for our landing page launch. The freelancer we selected delivered high-quality work in less than 12 hours. Exceptional experience with the layout flow.",
      rating: 5
    },
    {
      id: 5,
      name: "Farhana Yasmin",
      title: "SEO & Keyword Specialist",
      role: "freelancer",
      image: "https://i.pravatar.cc/150?img=5",
      comment: "The best part about this micro-task platform is the instant feedback loop. I complete an SEO audit task, submit the spreadsheet link, and get paid immediately once the client approves it. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-[var(--color-navy)] text-[var(--color-cream)] rounded-3xl overflow-hidden relative shadow-xl font-body">
      
      {/* Decorative Background Icon */}
      <div className="absolute top-6 left-6 text-white/5 text-9xl pointer-events-none">
        <FaQuoteLeft />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-[var(--color-cream)]">
          What Our Community Says
        </h2>
        <p className="text-[var(--color-tan)] text-base">
          Read professional feedback directly from our registered platform users.
        </p>
      </div>

      {/* Marquee Container with Left/Right Soft Blur Fade Out */}
      <div className="relative w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-[var(--color-navy)] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-[var(--color-navy)] after:to-transparent">
        
        {/* React Fast Marquee Integration */}
        <Marquee 
          gradient={false} 
          speed={45} 
          pauseOnHover={true} 
          className="flex gap-6 py-4"
        >
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="w-[320px] sm:w-[360px] mx-3 flex flex-col justify-between bg-[#0A0908]/40 border border-[var(--color-brown)]/40 p-6 rounded-2xl backdrop-blur-md hover:border-[var(--color-tan)]/60 transition-all duration-300 select-none"
            >
              <div>
                {/* Rating and Custom Badge Display Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-sm ${i < review.rating ? 'text-amber-400' : 'text-neutral-600'}`} 
                      />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    review.role === "client" 
                      ? "bg-[var(--color-tan)] text-[var(--black)]" 
                      : "bg-white/10 text-[var(--color-cream)]"
                  }`}>
                    {review.role}
                  </span>
                </div>

                {/* Verified Comment Area (2-3 Lines) */}
                <p className="text-[#EAE0D5]/90 text-sm italic leading-relaxed mb-6 font-light">
                  "{review.comment}"
                </p>
              </div>

              {/* Profile Identity Info Row */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-11 h-11 rounded-full object-cover border border-[var(--color-tan)]/40"
                />
                <div>
                  <h4 className="text-sm font-bold font-heading text-white">{review.name}</h4>
                  <p className="text-xs text-[var(--color-tan)] font-normal">{review.title}</p>
                </div>
              </div>

            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
}