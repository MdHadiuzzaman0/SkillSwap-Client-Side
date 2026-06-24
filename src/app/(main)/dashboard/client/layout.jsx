"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPlusCircle, FiList, FiLayers, FiUser, FiCircle } from "react-icons/fi";

const ClientLayout = ({ children }) => {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard/client/intro",
      icon: <FiCircle className="text-lg" />,
    },
    {
      name: "Post Task",
      path: "/dashboard/client/post-task",
      icon: <FiPlusCircle className="text-lg" />,
    },
    {
      name: "My Tasks",
      path: "/dashboard/client/my-tasks",
      icon: <FiList className="text-lg" />,
    },
    {
      name: "Manage Proposals",
      path: "/dashboard/client/proposals",
      icon: <FiLayers className="text-lg" />,
    },
    {
      name: "Profile",
      path: "/dashboard/client/profile",
      icon: <FiUser className="text-lg" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-cream text-black font-[var(--font-body)]">
      <aside className="w-64 bg-white border-r border-brown/10 flex flex-col fixed h-[500px] z-10">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-brown/10">
          <h2 className="text-lg font-bold font-[var(--font-heading)] text-navy tracking-wide">
            Client Panel
          </h2>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${isActive
                  ? "bg-gray-300 text-black shadow-sm"
                  : "text-brown hover:bg-cream/50 hover:text-black"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ➡️ RIGHT SIDE: Dynamic Content Area */}
      <main className="flex-1 pl-64 min-h-screen">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};

export default ClientLayout;