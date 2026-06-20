import { Table, Button, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { FiEdit2, FiTrash2, FiCalendar, FiDollarSign } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyTasksAction, getClientProposalsAction } from "@/lib/data";
import EditButton from "@/lib/EditButton";

export default async function MyTasksPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const clientEmail = session?.user?.email;

  if (!email) {
    return <div className="p-4 text-red-500 font-medium">Please log in to view your tasks.</div>;
  }

  const fetchedTasks = await getMyTasksAction(email);
  const fetchedProposals = await getClientProposalsAction(clientEmail);
  const renderStatusBadge = (status) => {
    const styles = {
      open: "bg-green-100 text-green-700 border-green-200",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
      completed: "bg-gray-100 text-gray-700 border-gray-200",
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
        <Table aria-label="Client Tasks Table">
          <TableHeader>
            <TableColumn className="bg-gray-50 text-gray-600 font-bold">TASK TITLE</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-600 font-bold">BUDGET</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-600 font-bold">DEADLINE</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-600 font-bold">STATUS</TableColumn>
            <TableColumn className="bg-gray-50 text-gray-600 font-bold text-center">ACTIONS</TableColumn>
          </TableHeader>

          <TableBody emptyContent={fetchedTasks.length === 0 ? "No tasks posted yet." : null}>
            {fetchedTasks.map((task) => {
              const hasProposal = fetchedProposals.some((proposal) => proposal.task_id === task._id.toString());
              const isEditDisabled = task.status.toLowerCase() !== "open";
              const isDeleteDisabled = task.status.toLowerCase() !== "open" || hasProposal;

              return (
                <TableRow key={task._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">

                  {/* ১. টাস্ক টাইটেল */}
                  <TableCell className="font-medium text-sm max-w-xs truncate">
                    {task.title}
                  </TableCell>

                  {/* ২. বাজেট */}
                  <TableCell className="text-sm font-semibold text-navy">
                    <span className="inline-flex items-center gap-0.5">
                      <FiDollarSign className="w-3.5 h-3.5" />
                      {task.budget}
                    </span>
                  </TableCell>

                  {/* ৩. ডেডলাইন */}
                  <TableCell className="text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar className="text-gray-400" />
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </TableCell>

                  {/* ৪. লাইভ স্ট্যাটাস */}
                  <TableCell>
                    {renderStatusBadge(task.status)}
                  </TableCell>

                  {/* ৫. অ্যাকশন বাটনসমূহ (এখানে বাটনগুলো স্ট্যাটিক রাখা হয়েছে) */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">

                      {/* এডিট বাটন */}
                      <EditButton task={task} />

                      {/* ডিলিট বাটন */}
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        disabled={isDeleteDisabled}
                        className={`rounded-lg ${!isDeleteDisabled ? "text-red-600 hover:bg-red-50" : "text-gray-300 cursor-not-allowed"}`}
                        title={isDeleteDisabled ? "Cannot delete if task has proposals or is not Open" : "Delete Task"}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </Button>

                    </div>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}