import { Table } from "@heroui/react";
import { FiEdit2, FiTrash2, FiCalendar, FiDollarSign } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyTasksAction, getClientProposalsAction } from "@/lib/data";
import EditButton from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";

export default async function MyTasksPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const clientEmail = session?.user?.email;

  if (!clientEmail) {
    return <div className="p-4 text-red-500 font-medium">Please log in to view your tasks.</div>;
  }

  const { token } = await auth.api.getToken({
    headers: await headers()
  })
  const fetchedTasks = await getMyTasksAction({ email: clientEmail, token });
  const fetchedProposals = await getClientProposalsAction({ email: clientEmail, token });
  //console.log(fetchedTasks.length, fetchedProposals.length);
  const renderStatusBadge = (status) => {
    const styles = {
      open: "bg-green-100 text-green-700 border-green-200",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
      completed: "bg-gray-100 text-gray-700 border-gray-200",
      closed: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status.toLowerCase()] || styles.open}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 w-full p-2 text-black">
      {/* হেডার সেকশন */}
      <div>
        <h1 className="text-xl font-bold">My Tasks View</h1>
        <p className="text-xs text-gray-500 mt-1">Monitor live status, edit open tasks, or delete them if no proposal exists.</p>
      </div>

      {/* HeroUI Table Anatomy */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Client Tasks Table" className="min-w-[700px]">

              <Table.Header>
                <Table.Column isRowHeader className="bg-gray-50 text-gray-600 font-bold">TASK TITLE</Table.Column>
                <Table.Column className="bg-gray-50 text-gray-600 font-bold">BUDGET</Table.Column>
                <Table.Column className="bg-gray-50 text-gray-600 font-bold">DEADLINE</Table.Column>
                <Table.Column className="bg-gray-50 text-gray-600 font-bold">STATUS</Table.Column>
                <Table.Column className="bg-gray-50 text-gray-600 font-bold text-center">ACTIONS</Table.Column>
              </Table.Header>

              <Table.Body>
  {fetchedTasks.length === 0 ? (
    <Table.Row>
      <Table.Cell colSpan={5} className="text-center text-gray-400 py-8">
        No tasks posted yet.
      </Table.Cell>
    </Table.Row>
  ) : (
    fetchedTasks.map((task) => {
      // 🎯 ১. এই টাস্কের আন্ডারে আসা সব ফ্রিল্যান্সারদের প্রপোজাল ফিল্টার করে বের করা
      const allProposalsForThisTask = fetchedProposals.filter(
        (proposal) => proposal.task_id === task._id.toString()
      );

      const hasProposals = allProposalsForThisTask.length > 0;

      // 🎯 ২. প্রপোজালগুলোর ভেতরের স্ট্যাটাস চেক করা (যেকোনো একটা ম্যাচ করলেই হবে)
      const hasInProgressBar = allProposalsForThisTask.some(p => p.status.toLowerCase() === "in-progress");
      const hasCompletedBar  = allProposalsForThisTask.some(p => p.status.toLowerCase() === "completed");
      const hasPendingBar    = allProposalsForThisTask.some(p => p.status.toLowerCase() === "pending");

      // 🎯 ৩. আপনার দেওয়া শর্ত অনুযায়ী সঠিক লাইফসাইকেল স্ট্যাটাস সেট করা
      let currentStatus = "open"; // ডিফল্ট কোনো প্রপোজাল না থাকলে

      if (hasProposals) {
        if (hasCompletedBar) {
          currentStatus = "completed";   // ১. সাবমিট করলে completed
        } else if (hasInProgressBar) {
          currentStatus = "in-progress"; // ২. পেমেন্ট করলে in-progress
        } else if (hasPendingBar) {
          currentStatus = "pending";     // ৩. প্রথমে প্রপোজাল দিলে pending
        } else {
          // যদি সব প্রপোজাল রিজেক্টেড হয় বা অন্য কিছু হয়, তবে টাস্কের নিজস্ব স্ট্যাটাস দেখাবে
          currentStatus = task.status; 
        }
      }

      // 🎯 ৪. বাটন কন্ট্রোল (একদম ফ্রেশ open টাস্ক ছাড়া এডিট/ডিলিট করা যাবে না)
      const isActionAllowed = currentStatus.toLowerCase() === "open";

      return (
        <Table.Row key={task._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">

          {/* টাস্ক টাইটেল ও কয়টা প্রপোজাল পড়েছে তার কাউন্ট */}
          <Table.Cell className="font-medium text-sm max-w-xs truncate">
            <div>
              <p className="font-semibold text-gray-800">{task.title}</p>
              {hasProposals && (
                <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md mt-1 inline-block font-normal">
                  📩 {allProposalsForThisTask.length} Proposals received
                </span>
              )}
            </div>
          </Table.Cell>

          {/* বাজেট */}
          <Table.Cell className="text-sm font-semibold text-navy">
            <span className="inline-flex items-center gap-0.5">
              <FiDollarSign className="w-3.5 h-3.5" />
              {task.budget}
            </span>
          </Table.Cell>

          {/* ডেডলাইন */}
          <Table.Cell className="text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar className="text-gray-400" />
              {new Date(task.deadline).toLocaleDateString()}
            </span>
          </Table.Cell>

          {/* ডাইনামিক স্ট্যাটাস ব্যাজ (pending / in-progress / completed / open) */}
          <Table.Cell>
            {renderStatusBadge(currentStatus)}
          </Table.Cell>

          {/* অ্যাকশন বাটন এর ডাইনামিক মেসেজ */}
          <Table.Cell className="text-center">
            <div className="flex items-center justify-center gap-2">
              {isActionAllowed ? (
                <>
                  <EditButton task={task} />
                  <DeleteButton task={task} />
                </>
              ) : (
                <span className="text-xs text-gray-400 font-medium italic">
                  {currentStatus === "pending" && "Proposals Submitted"}
                  {currentStatus === "in-progress" && "Job is cooking"}
                  {currentStatus === "completed" && "Task Finished 🏁"}
                </span>
              )}
            </div>
          </Table.Cell>

        </Table.Row>
      );
    })
  )}
</Table.Body>   

            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}