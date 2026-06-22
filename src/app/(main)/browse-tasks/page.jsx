import TaskCard from "@/components/TaskCard"; 
import { getUserInfo } from "@/lib/data";
import { authClient } from "@/lib/auth-client"; // BetterAuth ক্লায়েন্ট
import { headers } from "next/headers";
import Filter from "@/components/Filter"; 
import Search from "@/components/Search"; 
import { getFilteredTasks } from "@/lib/action";

const BrowseTasksPage = async ({ searchParams: searchParamsPromise }) => {
    // ১. ইউজার সেশন ডাটা
    const session = await authClient.api.getSession({
        headers: await headers()
    });
    const email = session?.user?.email;
    const userInfo = await getUserInfo(email);

    // ২. searchParams await করা (Next.js 15+ রুল)
    const searchParams = await searchParamsPromise;  
    
    const category = searchParams?.category || "";
    const search = searchParams?.search || "";

    // 🚀 ফিল্টারড টাস্ক গেট করা
    const { tasks, count } = await getFilteredTasks({ category, search });

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
                                key={task._id || task.id} 
                                task={task} 
                                email={email}
                                userInfo={userInfo}
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
            </div>
        </div>
    );
};

export default BrowseTasksPage;