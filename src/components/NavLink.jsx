'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";

const NavLink = ({ href, children, className = "" }) => {
    const pathname = usePathname();
    const mainRoutes = ["/", "/browse-tasks", "/browse-freelancers"];
    
    const isMain = mainRoutes.includes(href);
    // 🎯 হোম পেজ '/' এর জন্য নিখুঁত ম্যাচিং এবং বাকিগুলোর জন্য সাব-রুট ম্যাচিং
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href); 

    let activeClassCombo = "";
    
    if (isMain) {
        if (isActive) {
            activeClassCombo = "text-[var(--color-navy)] bg-[var(--color-navy)]/5 border-[var(--color-navy)]/20 font-heading font-black shadow-[0_2px_10px_rgba(0,0,0,0.02)]";
        } else {
            activeClassCombo = "text-gray-500 font-sans font-medium border-transparent hover:text-[var(--color-navy)]";
        }
    } else {
        if (isActive) {
            activeClassCombo = "text-[var(--color-navy)] bg-gray-50 border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-heading font-black";
        } else {
            activeClassCombo = "text-gray-500 font-sans font-semibold border-transparent hover:text-[var(--color-black)] hover:bg-gray-50 hover:border-gray-100";
        }
    }

    return (
        <Link 
            href={href} 
            // 🎯 কমন লেআউট ক্লাসগুলো (px, py, border, rounded) এখানে ফিক্সড রাখা হলো যাতে বাটন লাফানি (Layout Shift) না দেয়
            className={`transition-all duration-300 text-sm tracking-wide px-3 py-1.5 border rounded-full inline-flex items-center justify-center ${activeClassCombo} ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;