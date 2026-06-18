import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAllTasks } from "@/lib/data";
import TaskCard from "@/components/TaskCard";

const ExploreTasksPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const email = session?.user?.email;
    const tasks = await getAllTasks() || [];

    return (
        <div className="bg-cream min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 font-[var(--font-body)]">
            <div className="max-w-7xl mx-auto">

                {/* 1. Heading and Sub-heading Section */}
                <div className="mb-8 text-left">
                    <h1 className="font-[var(--font-heading)] text-3xl md:text-5xl font-bold text-black mb-2">
                        Explore Tasks
                    </h1>
                    <p className="text-brown text-sm md:text-base">
                        Find and apply for micro-tasks that match your expertise.
                    </p>
                </div>

                {/* 2. Static Search and Filter Bar (Not Functional) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Static Search Input */}
                    <div className="md:col-span-2">
                        <input
                            type="text"
                            placeholder="Search tasks by title or keywords..."
                            className="w-full px-4 py-3 bg-white border border-brown/20 rounded-xl text-black focus:outline-none focus:border-navy text-sm shadow-sm"
                            disabled
                        />
                    </div>

                    {/* Static Filter Dropdown */}
                    <div>
                        <select
                            className="w-full px-4 py-3 bg-white border border-brown/20 rounded-xl text-brown focus:outline-none text-sm shadow-sm cursor-not-allowed"
                            defaultValue=""
                            disabled
                        >
                            <option value="" disabled>Filter by Category</option>
                            <option value="web">Web Development</option>
                            <option value="design">Graphics Design</option>
                        </select>
                    </div>
                </div>

                {/* 3. 3-Column Dynamic Task Grid Section */}
                {tasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </div>
                ) : (
                    /* No Data Found State */
                    <div className="text-center py-12 bg-white rounded-xl border border-brown/20 max-w-md mx-auto p-6 shadow-sm">
                        <p className="text-brown text-xl">No tasks found.</p>
                        <p className="font-[var(--font-body)] text-brown text-md max-w-xs text-center leading-relaxed mb-6 transition-opacity duration-300 group-hover:opacity-90">
                            It looks like there are currently no active micro-tasks matched with this profile email.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ExploreTasksPage;