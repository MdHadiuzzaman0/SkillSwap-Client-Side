"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPieChart, FiUsers, FiCheckSquare, FiDollarSign } from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard/admin",
      icon: <FiPieChart className="text-lg" />,
    },
    {
      name: "Manage Users",
      path: "/dashboard/admin/users",
      icon: <FiUsers className="text-lg" />,
    },
    {
      name: "Manage Tasks",
      path: "/dashboard/admin/tasks",
      icon: <FiCheckSquare className="text-lg" />,
    },
    {
      name: "Transactions",
      path: "/dashboard/admin/transactions",
      icon: <FiDollarSign className="text-lg" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-cream text-black font-[var(--font-body)]">
      {/* 🛠️ বাম পাশের সাইডবার */}
      <aside className="w-64 bg-white border-r border-brown/10 flex flex-col fixed h-screen z-10">
        
        {/* সাইডবার হেডার */}
        <div className="p-6 border-b border-brown/10">
          <h2 className="text-lg font-bold font-[var(--font-heading)] text-red-600 tracking-wide uppercase">
            Admin Panel
          </h2>
          <p className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5 tracking-wider">
            Platform Control
          </p>
        </div>

        {/* নেভিগেশন মেনু */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            // নিখুঁতভাবে অ্যাক্টিভ রুট ম্যাচ করার লজিক
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm" // অ্যাডমিনের জন্য একটু ডার্ক/প্রফেশনাল অ্যাকসেন্ট
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

      {/* ➡️ ডান পাশের ডাইনামিক কনটেন্ট এরিয়া */}
      <main className="flex-1 pl-64 min-h-screen">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;