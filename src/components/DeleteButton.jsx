"use client";
import { AlertDialog, Button } from "@heroui/react";
import { deleteTaskAction } from "@/lib/action"; 
import { useState } from "react";
import toast from "react-hot-toast";

export function DeleteTaskModal({ task }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await deleteTaskAction(task._id); 
    setIsDeleting(false);
    if (response.success) {
      toast.success(response.message || "Task deleted successfully!");
      setTimeout(() => {
        window.location.reload(); 
      }, 1000);
    } else {
      toast.error(response.message || "Something went wrong!");
    }
  };

  return (
    <AlertDialog>
      {/* ট্রিগার বাটন */}
      <Button variant="danger">Delete Task</Button>
      
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