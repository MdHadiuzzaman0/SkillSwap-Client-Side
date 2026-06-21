"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FiXCircle } from "react-icons/fi";
import { updateProposalStatusAction } from "@/lib/action";
import toast from "react-hot-toast";

export default function IgnoreButton({ proposalId, setProposals }) {
  const [isPending, setIsPending] = useState(false);

  const handleIgnore = async () => {
    if (!confirm("Are you sure you want to ignore this proposal?")) return;

    try {
      setIsPending(true);
      const result = await updateProposalStatusAction(proposalId, "rejected");

      if (result?.success) {
        toast.success("Proposal ignored successfully!");
        setProposals((prev) => prev.filter((item) => item._id !== proposalId));
      } else {
        toast.error(result?.message || "Failed to ignore proposal.");
      }
    } catch (error) {
      console.error("Error ignoring proposal:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      isLoading={isPending}
      onClick={handleIgnore}
      className="border border-red-200 text-red-600 hover:bg-red-50 font-medium rounded-xl px-3 py-1.5 text-xs cursor-pointer flex items-center gap-1"
    >
      {!isPending && <FiXCircle className="w-3.5 h-3.5" />} Ignore
    </Button>
  );
}