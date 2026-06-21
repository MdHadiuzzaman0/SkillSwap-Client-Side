"use client";
import { AlertDialog, Button } from "@heroui/react";
import { deleteTaskAction } from "@/lib/action";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

export function DeleteButton({ task }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await deleteTaskAction(task._id);
    setIsDeleting(false);
    if (response.success) {
      toast.success(response.message || "Task deleted successfully!");
      router.refresh()
    } else {
      toast.error(response.message || "Something went wrong!");
    }
  };

  return (
    <AlertDialog>
      {/* ট্রিগার বাটন */}
      <div className="shrink-0 flex items-center justify-end">
        <Button
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl shadow-md shadow-red-600/10 hover:shadow-red-600/20 active:scale-95 transition-all duration-200 border border-red-700 group cursor-pointer"
        >
          <FiTrash2 className="w-4 h-4 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
        </Button>
      </div>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete task permanently?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{task.title || "this task"}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              {/* ক্যানসেল বাটন */}
              <Button slot="close" variant="tertiary" disabled={isDeleting}>
                Cancel
              </Button>

              {/* কনফার্ম ডিলিট বাটন */}
              <Button
                slot={isDeleting ? "" : "close"}
                variant="danger"
                onPress={handleDelete}
                isLoading={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Task"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}