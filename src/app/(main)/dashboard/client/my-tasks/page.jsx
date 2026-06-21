import { Table } from "@heroui/react";
import { FiEdit2, FiTrash2, FiCalendar, FiDollarSign } from "react-icons/fi";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyTasksAction, getClientProposalsAction } from "@/lib/data";
import EditButton from "@/components/EditButton";
import {DeleteButton} from "@/components/DeleteButton";

export default async function MyTasksPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const clientEmail = session?.user?.email;

  if (!clientEmail) {
    return <div className="p-4 text-red-500 font-medium">Please log in to view your tasks.</div>;
  }

  const fetchedTasks = await getMyTasksAction(clientEmail);
  const fetchedProposals = await getClientProposalsAction(clientEmail);
  console.log(fetchedTasks.length, fetchedProposals.length);
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
              const hasProposal = fetchedProposals.some(
                (proposal) => proposal.task_id === task._id.toString()
              );
              const isEditDisabled = task.status.toLowerCase() !== "open";
              const isDeleteDisabled = task.status.toLowerCase() !== "open" || hasProposal;

              return (
                <Table.Row key={task._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  
                  <Table.Cell className="font-medium text-sm max-w-xs truncate">
                    {task.title}
                  </Table.Cell>

                  <Table.Cell className="text-sm font-semibold text-navy">
                    <span className="inline-flex items-center gap-0.5">
                      <FiDollarSign className="w-3.5 h-3.5" />
                      {task.budget}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar className="text-gray-400" />
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    {renderStatusBadge(task.status)}
                  </Table.Cell>

                  <Table.Cell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <EditButton task={task}  />
                      <DeleteButton task={task} />
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