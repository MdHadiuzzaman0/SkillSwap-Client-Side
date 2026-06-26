import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-[var(--color-cream)] border-t border-[var(--color-brown)]/30 font-body mt-20">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Platform Overview */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-heading tracking-wide text-white">
              Skill<span className="text-[var(--color-tan)]">Swap</span>
            </h3>
            <p className="text-sm text-[#EAE0D5]/80 leading-relaxed">
              A premium freelance micro-task platform connecting skilled professionals with direct clients for fast, secure, and single-contract operations.
            </p>
          </div>

          {/* Column 2: Quick Links for Everyone */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-tan)] font-heading">
              Marketplace
            </h4>
            <ul className="space-y-2 text-sm text-[#EAE0D5]/80">
              <li>
                <Link href="/browse-tasks" className="hover:text-[var(--color-tan)] transition-colors">
                  Browse Micro-Jobs
                </Link>
              </li>
              <li>
                <Link href="/freelancers" className="hover:text-[var(--color-tan)] transition-colors">
                  Explore Freelancers
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-[var(--color-tan)] transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dashboards Access (PDF Rule Compliance) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-tan)] font-heading">
              Internal Portals
            </h4>
            <ul className="space-y-2 text-sm text-[#EAE0D5]/80">
              <li>
                <Link href="/" className="hover:text-[var(--color-tan)] transition-colors">
                  Client Workspace
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[var(--color-tan)] transition-colors">
                  Freelancer Hub
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[var(--color-tan)] transition-colors">
                  Admin Terminal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social Handles */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-tan)] font-heading">
              Connect With Us
            </h4>
            <p className="text-sm text-[#EAE0D5]/80">
              Support Desk: <span className="text-white font-medium">support@skillswap.com</span>
            </p>
            {/* Social Icons with Interactive Hover Color Transitions */}
            <div className="flex items-center gap-4 text-xl">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-tan)] text-[#EAE0D5]/90 transition-colors">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-tan)] text-[#EAE0D5]/90 transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-tan)] text-[#EAE0D5]/90 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-tan)] text-[#EAE0D5]/90 transition-colors">
                <FaFacebook />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Divider Rule */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAE0D5]/60">
          <p>© {new Date().getFullYear()} SkillSwap Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-[var(--color-tan)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[var(--color-tan)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}