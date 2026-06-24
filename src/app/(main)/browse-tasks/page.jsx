import TaskCard from "@/components/TaskCard";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import { getFilteredTasks } from "@/lib/action";
import { FiInfo } from "react-icons/fi";
import Link from "next/link";

const BrowseTasksPage = async ({ searchParams: searchParamsPromise }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const email = session?.user?.email;

    const searchParams = await searchParamsPromise;
    const category = searchParams?.category || "";
    const search = searchParams?.search || "";
    const currentPage = parseInt(searchParams?.page) || 1; 

    const { tasks, count } = await getFilteredTasks({ category, search, page: currentPage});

    console.log(tasks.length, count)

    const limit = 9;
    const totalPages = Math.ceil(count / limit); 

    const getPageLink = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `?${params.toString()}`;
    };

    // 🎯 আপনার দেওয়া নতুন ক্যাтаগরি লিস্ট
    const categoryOptions = [
        "Web Development",
        "UI/UX Design",
        "Content Writing",
        "Mobile Development",
        "Graphic Design",
        "Digital Marketing",
        "Video Editing"
    ];

    const activeFilterName = search || category || "All";

    return (
        <div className="bg-workable-bg min-h-screen pt-12 pb-20 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">

                <div className="mb-7 text-left">
                    <h1 className="font-heading text-3xl md:text-4xl font-black text-workable-text-dark mb-3">
                        Browse Open Tasks
                    </h1>
                    <p className="font-body text-workable-text-muted text-sm md:text-base">
                        Explore micro-tasks posted by clients ({count} tasks found).
                    </p>
                </div>

                {/* সার্চ এবং ফিল্টার গ্রিড */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl text-amber-900 text-xs font-medium flex items-start gap-2 mb-6">
                    <FiInfo className="mt-0.5 flex-shrink-0 text-amber-600 text-sm" />
                    <div>
                        <span className="font-bold">Note:</span> Search functionality strictly queries against the task <span className="font-bold underline">title</span>. The dropdown filters options using the specific task <span className="font-bold underline">category</span> field. 
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Search />
                    <Filter
                        categoryOptions={categoryOptions}
                        typeOptions={[]} // টাইপ না লাগলে খালি থাকবে
                    />
                </div>

                {/* টাস্ক ডিসপ্লে গ্রিড */}
                {tasks && tasks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id || task.id} email={email}
                                task={task} session={session}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-workable-text-muted/10 text-center px-4">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mb-4 font-bold">🔍</div>
                        <h3 className="font-heading text-xl font-bold text-workable-text-dark mb-2">No "{activeFilterName}" Tasks Found</h3>
                        <p className="font-body text-workable-text-muted text-sm max-w-sm">Try resetting the filter or searching for something else!</p>
                    </div>
                )}

                {tasks.length > 0 && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        {/* Previous Button */}
                        <Link
                            href={getPageLink(currentPage - 1)}
                            className={`px-4 py-2 border rounded-xl text-sm font-medium bg-white transition ${
                                currentPage <= 1 ? "opacity-50 pointer-events-none text-gray-400" : "hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            Previous
                        </Link>

                        {/* পেজ ইন্ডিকেটর */}
                        <span className="text-sm font-semibold text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>

                        {/* Next Button */}
                        <Link
                            href={getPageLink(currentPage + 1)}
                            className={`px-4 py-2 border rounded-xl text-sm font-medium bg-white transition ${
                                currentPage >= totalPages ? "opacity-50 pointer-events-none text-gray-400" : "hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            Next
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default BrowseTasksPage;