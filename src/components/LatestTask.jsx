import { getAllData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { FiDollarSign, FiCalendar, FiUser } from "react-icons/fi";

const LatestTasksMarqueeSection = async () => {
  const { tasks, users } = await getAllData();

  const featuredTasks = tasks
    ?.filter((task) => task.status === "open")
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.slice(0, 10)
    ?.map((task) => {
      const clientInfo = users.find((u) => u.email === task.clientEmail);
      return {
        ...task,
        clientName: clientInfo ? `${clientInfo.firstName || ""} ${clientInfo.lastName || ""}`.trim() : "Client",
        clientImage: clientInfo?.image || task.clientImage || null, 
        clientEmail: task.clientEmail,
      };
    }) || [];

  //console.log(featuredTasks.length, tasks.length)

  if (featuredTasks.length === 0) return null;

  return (
    <section className="py-14 bg-gray-50/50 overflow-hidden">
      {/* সেকশন হেডার */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight sm:text-3xl">
            Latest Featured Tasks
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Fast micro-tasks posted by verified clients.
          </p>
        </div>
        <Link
          href="/browse-tasks"
          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
        >
          View All Tasks &rarr;
        </Link>
      </div>

      {/* 🎪 Marquee স্লাইডার */}
      <div className="border-y border-gray-100 bg-white py-6">
        <Marquee
          speed={40}
          pauseOnHover={true}
          gradient={true}
          gradientColor="white"
          gradientWidth={70}
        >
          {featuredTasks.map((task) => (
            <div
              key={task._id}
              className="mx-3 w-[290px] bg-gray-50 border border-gray-100 rounded-xl p-4 shadow-sm hover:border-amber-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* 🎯 প্রোফাইল হেডার (ক্লায়েন্টের ছবি, নাম এবং ইমেইল) */}
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-200/50">
                  {task.clientImage ? (
                    <Image
                      src={task.clientImage}
                      alt={task.clientName} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shrink-0 border border-gray-300">
                      <FiUser size={14} />
                    </div>
                  )}
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-gray-900 truncate leading-tight">
                      {task.clientName}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium truncate" title={task.clientEmail}>
                      {task.clientEmail}
                    </p>
                  </div>
                </div>

                {/* ক্যাটাগরি ট্যাগ */}
                <div className="mb-2">
                  <span className="text-[9px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-100 truncate inline-block max-w-[150px]">
                    {task.category}
                  </span>
                </div>

                {/* টাস্ক টাইটেল */}
                <h3 className="font-bold text-gray-900 text-sm truncate mb-3" title={task.title}>
                  {task.title}
                </h3>
              </div>

              {/* বাজেট ও ডেডলাইন */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 mt-auto">
                {/* বাজেট */}
                <div className="flex items-center font-black text-sm text-gray-950">
                  <FiDollarSign className="text-xs text-gray-500 -mr-0.5" />
                  {task.budget}
                </div>
                {/* ডেডলাইন */}
                <div className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                  <FiCalendar size={11} className="text-gray-400" />
                  {task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default LatestTasksMarqueeSection;