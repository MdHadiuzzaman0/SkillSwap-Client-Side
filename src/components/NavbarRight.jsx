"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const NavbarRight = ({ session, userInfo }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    //console.log(session, userInfo)

    const sessionUser = session?.user;
    let displayName = "Guest";
    let displayImage = null;
    let displayRole = "";

    const adminEmail = "admin1@taskhive.com ";
    const userEmail = sessionUser?.email ? sessionUser.email.toLowerCase() : "";

    if (userInfo) {
        displayName = `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim();
        displayImage = userInfo.image;
        displayRole = userInfo.role.toLowerCase();
    } else {
        displayName = sessionUser?.name;
        displayImage = sessionUser?.image;
        displayRole = userEmail === adminEmail.toLowerCase() ? "admin" : "client";
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function logout() {
        await authClient.signOut();
        router.push("/login");
        router.refresh();
    }

    // ── SKILLSWAP MENU CONFIGURATIONS ──
    const defaultItems = [
        { id: "home", label: "Home", href: "/" },
        { id: "browse_tasks", label: "Browse Tasks", href: "/browse-tasks" },
    ];

    const freelancerItems = [
        { id: "dashboard", label: "Dashboard", href: "/dashboard/freelancer/intro" },
        { id: "my_bids", label: "My proposals", href: "/dashboard/freelancer/my-proposals" },
        { id: "profile", label: "Profile", href: "/dashboard/freelancer/profile" },
    ];

    const clientItems = [
        { id: "dashboard", label: "Client Dashboard", href: "/dashboard/client/intro" },
        { id: "post_task", label: "Post a Task", href: "/dashboard/client/post-task" },
        { id: "my_tasks", label: "My Tasks", href: "/dashboard/client/my-tasks" },
    ];

    const adminItems = [
        { id: "dashboard", label: "Admin Dashboard", href: "/dashboard/admin/intro" },
        { id: "tasks", label: "Manage Tasks", href: "/dashboard/admin/tasks" },
        { id: "transactions", label: "Manage Transactions", href: "/dashboard/admin/transactions" },
    ];

    const menuItems = displayName === "Guest" ? defaultItems : userEmail === adminEmail ? adminItems : displayRole === "freelancer" ? freelancerItems : clientItems;

    return (
        <div className="flex items-center gap-4">

            {/* ── GUEST STATE ── */}
            {!session && (
                <div className="flex items-center gap-4 font-heading text-sm uppercase tracking-wide">
                    <Link
                        href="/login"
                        className="text-[var(--color-black)] font-bold hover:text-[var(--color-navy)] transition-colors duration-200 px-2"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        className="bg-[var(--color-navy)] hover:bg-[var(--color-tan)] hover:text-[var(--color-black)] text-white font-bold rounded-full py-2 shadow-md transition-all duration-300 hover:shadow-lg active:scale-95"
                        style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }}
                    >
                        Sign Up
                    </Link>
                </div>
            )}

            {/* ── LOGGED IN STATE ── */}
            {(session || userInfo) && (
                <div className="relative" ref={dropdownRef}>

                    {/* Trigger Pill */}
                    <div
                        onClick={() => setIsOpen((prev) => !prev)}
                        className={`flex items-center gap-3 border px-4 py-2 rounded-full shadow-sm cursor-pointer select-none transition-all duration-300
                            ${isOpen
                                ? "bg-white border-[var(--color-navy)]"
                                : "bg-gray-50 border-gray-200 hover:border-[var(--color-navy)]/40 hover:bg-white"
                            }`}
                    >
                        <div>
                            <Avatar
                                size="sm"
                                className={`w-8 h-8 rounded-full ring-2 transition-all duration-300
                                ${isOpen ? "ring-[var(--color-navy)]/30" : "ring-transparent"}`}
                            >
                                <Avatar.Image
                                    alt={displayName}
                                    src={displayImage}
                                    className="rounded-full object-cover"
                                />
                                <Avatar.Fallback className="rounded-full bg-[var(--color-navy)] text-white font-heading font-bold text-xs">
                                    {displayName.charAt(0)}
                                </Avatar.Fallback>
                            </Avatar>
                        </div>

                        <div className="flex flex-col text-left">
                            <span className="text-xs font-body text-[var(--color-black)] font-bold tracking-wide leading-tight">
                                {displayName}
                            </span>
                            {displayRole && (
                                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--color-tan)] font-bold leading-tight">
                                    {displayRole}
                                </span>
                            )}
                        </div>

                        <FiChevronDown
                            className={`w-4 h-4 text-gray-400 transition-all duration-300
                                ${isOpen ? "rotate-180 text-[var(--color-navy)]" : "hover:text-[var(--color-navy)]"}`}
                        />
                    </div>

                    {/* Dropdown Panel */}
                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl z-50 overflow-hidden py-2 text-center" style={{ width: "240px" }}>

                            <div className="px-4 pt-1 pb-2 border-b border-gray-100">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                                    Dashboard Actions
                                </span>
                            </div>

                            {/* Menu Items Mapping */}
                            <div className="px-2 pt-2 flex flex-col gap-0.5">
                                {menuItems.map((item) => (
                                    <Button
                                        key={item.id} variant="light" disableAnimation
                                        onClick={() => { router.push(item.href); setIsOpen(false); }}
                                        className="w-full bg-transparent min-w-0 h-auto font-heading text-xs uppercase tracking-wide text-[var(--color-black)] hover:bg-[var(--color-navy)]/10 hover:text-[var(--color-navy)] rounded-xl px-3 py-2.5 transition-all cursor-pointer block text-center"
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>

                            {/* Logout Option */}
                            <div className="px-2 pt-2 mt-1 border-t border-gray-100">
                                <Button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="w-full bg-transparent min-w-0 h-auto font-heading text-xs uppercase tracking-wide text-rose-500 hover:bg-rose-50 rounded-xl px-3 py-2.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NavbarRight;