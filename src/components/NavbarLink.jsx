'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";

const NavLink = ({ href, children, className }) => {
    const pathname = usePathname();
    const mainRoutes = ["/", "/browse-tasks", "/browse-freelancers"];
    
    let isMain = false;
    let isActive = false;

    if (mainRoutes.includes(href)) {
        isMain = true;
        isActive = pathname === href; 
    } else {
        isMain = false;
        isActive = pathname.startsWith(href); 
    }

    let activeClassCombo = "";
    
    if (isMain) {
        if (isActive) {
            activeClassCombo = "text-[var(--color-navy)] bg-[var(--color-navy)]/5 border border-[var(--color-navy)]/20 rounded-full px-3 py-1 font-heading font-black shadow-[0_2px_10px_rgba(0,0,0,0.02)]";
        } else {
            activeClassCombo = "text-gray-500 font-sans font-medium border border-transparent hover:text-[var(--color-navy)]";
        }
    } else {
        if (isActive) {
            activeClassCombo = "text-[var(--color-navy)] bg-gray-50 border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-heading font-black";
        } else {
            activeClassCombo = "text-gray-500 font-sans font-semibold border border-transparent hover:text-[var(--color-black)] hover:bg-gray-50 hover:border-gray-100";
        }
    }

    return (
        <Link 
            href={href} 
            className={`transition-all duration-300 text-sm tracking-wide ${activeClassCombo} ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLink;