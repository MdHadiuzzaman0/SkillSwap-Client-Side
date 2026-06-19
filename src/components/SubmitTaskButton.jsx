"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { updateProposalTask } from "@/lib/action"; // আপনার অ্যাকশন ফাইলের পাথ অনুযায়ী দেবেন
import { useRouter } from "next/navigation";

export function SubmitTaskButton({ proposalId }) {
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deliverableUrl) return alert("Please provide a deliverable work link!");

    setLoading(true);

    // স্ট্যাটাস "Completed" স্ট্যাটিক হিসেবে পাঠানো হচ্ছে
    const payload = {
      status: "completed",
      deliverable_url: deliverableUrl,
    };

    const result = await updateProposalTask(proposalId, payload);
    setLoading(false);

    if (result.success) {
      alert("Task submitted and marked as Completed successfully!");
      setDeliverableUrl(""); // ইনপুট ক্লিয়ার
      router.refresh(); // সার্ভার কম্পোনেন্টের ডাটা রিফ্রেশ করার জন্য
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal>
      {/* মেইন বাটন */}
      <Button className="bg-navy text-white font-bold px-4 py-2 rounded-xl text-xs">
        Submit Task
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-white border border-brown/10 rounded-2xl">
            <Modal.CloseTrigger />
            
            <Modal.Header>
              <Modal.Heading className="text-base font-bold text-black">Submit Project Task</Modal.Heading>
              <p className="mt-1.5 text-xs text-brown opacity-80">
                Provide your completed work link below. Once submitted, the project status will staticly change to Completed.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id={`form-${proposalId}`} onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <TextField className="w-full" name="deliverable_url" type="url" variant="secondary">
                    <Label className="text-xs font-bold text-brown mb-1 block">Work Link / Deliverable URL</Label>
                    <Input 
                      placeholder="https://github.com/... or live preview link" 
                      value={deliverableUrl}
                      onChange={(e) => setDeliverableUrl(e.target.value)}
                      required
                      className="text-xs text-black"
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-2 text-xs">
              <Button slot="close" variant="secondary" className="px-4 py-2 rounded-xl bg-gray-100 font-bold text-black">
                Cancel
              </Button>
              {/* HTML form এর সাথে ট্রিগার করার জন্য type="submit" এবং form id ব্যবহার করা হয়েছে */}
              <Button 
                type="submit" 
                form={`form-${proposalId}`} 
                disabled={loading}
                slot={loading ? undefined : "close"} // সাকসেস হলে তবেই মোডাল ক্লোজ হবে
                className="px-4 py-2 rounded-xl bg-navy text-white font-bold"
              >
                {loading ? "Submitting..." : "Submit Project"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}