"use client";

import React, { useState } from "react";
import { FiSend, FiDollarSign, FiClock, FiFileText } from "react-icons/fi";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { submitProposalAction } from "@/lib/action";
import toast from "react-hot-toast";

export function ProposalSubmit({ taskData, currentUserEmail }) {
  const modal = useOverlayState();
  const [loading, setLoading] = useState(false);
  const { _id: taskId, title, category, clientEmail } = taskData || {};
  const freelancerEmail = currentUserEmail || "freelanceruser3@gmail.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const proposalPayload = {
      task_id: taskId,
      freelancer_email: freelancerEmail,
      client_email: clientEmail,
      job_title: formData.get("job_title"),
      category: formData.get("category"),
      proposed_budget: Number(formData.get("proposed_budget")),
      estimated_days: Number(formData.get("estimated_days")),
      cover_note: formData.get("cover_note"),
      status: "pending",
      submitted_at: new Date(),
    };

    try {
      const result = await submitProposalAction(proposalPayload);
      if (result.success) {
        toast.success("Proposal submitted successfully!");
        modal.close()
      } else {
        toast.error(result.message || "Failed to submit proposal.");
      }
    } catch (error) {
      console.error("Error in component while submitting:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal state={modal}>
      <Button onClick={modal.open} className="w-full bg-navy/ text-cream font-semibold py-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
        <FiSend /> Submit Proposal
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-white border border-brown/10 rounded-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-navy/10 text-navy">
                <FiSend className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-black font-bold font-[var(--font-heading)]">
                Apply for this Task
              </Modal.Heading>
              <p className="mt-1.5 text-xs text-brown font-light">
                Provide your best quote and timeline. The project details below will be automatically attached.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id="proposal-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                  <TextField className="w-full opacity-80" name="job_title" variant="secondary" isReadOnly>
                    <Label className="text-xs font-semibold text-brown uppercase">Job Title</Label>
                    <Input
                      value={title || ""}
                      isReadOnly
                      className="bg-cream/20 text-brown/80 font-medium cursor-not-allowed selection:bg-transparent"
                    />
                  </TextField>

                  <TextField className="w-full opacity-80" name="category" variant="secondary" isReadOnly>
                    <Label className="text-xs font-semibold text-brown uppercase">Category</Label>
                    <Input
                      value={category || ""}
                      isReadOnly
                      className="bg-cream/20 text-brown/80 font-medium cursor-not-allowed selection:bg-transparent"
                    />
                  </TextField>

                  <TextField className="w-full opacity-80" name="client_email" type="email" variant="secondary" isReadOnly>
                    <Label className="text-xs font-semibold text-brown uppercase">Client Email</Label>
                    <Input
                      value={clientEmail || ""}
                      isReadOnly
                      className="bg-cream/20 text-brown/80 font-medium cursor-not-allowed selection:bg-transparent"
                    />
                  </TextField>

                  <TextField className="w-full opacity-80" name="freelancer_email" type="email" variant="secondary" isReadOnly>
                    <Label className="text-xs font-semibold text-brown uppercase">Your Email (Freelancer)</Label>
                    <Input
                      value={freelancerEmail || ""}
                      isReadOnly
                      className="bg-cream/20 text-brown/80 font-medium cursor-not-allowed selection:bg-transparent"
                    />
                  </TextField>

                  {/* ====== ১. Proposed Budget (Manual Input) ====== */}
                  <TextField className="w-full" name="proposed_budget" type="number" variant="secondary" required>
                    <Label className="text-xs font-semibold text-brown uppercase">Proposed Budget (USD)</Label>
                    <div className="relative flex items-center">
                      <FiDollarSign className="absolute left-3 text-brown/60 z-10" />
                      <Input className="pl-8 text-black" placeholder="Enter your bid amount" min="1" />
                    </div>
                  </TextField>

                  {/* ====== ২. Estimated Days (Manual Input) ====== */}
                  <TextField className="w-full" name="estimated_days" type="number" variant="secondary" required>
                    <Label className="text-xs font-semibold text-brown uppercase">Estimated Days</Label>
                    <div className="relative flex items-center">
                      <FiClock className="absolute left-3 text-brown/60 z-10" />
                      <Input className="pl-8 text-black" placeholder="e.g. 5" min="1" />
                    </div>
                  </TextField>

                  {/* ====== ৩. Cover Note (Manual Input) ====== */}
                  <TextField className="w-full" name="cover_note" variant="secondary" required>
                    <Label className="text-xs font-semibold text-brown uppercase">Cover Note / Message</Label>
                    <div className="relative flex items-start">
                      <FiFileText className="absolute left-3 top-3.5 text-brown/60 z-10" />
                      <Input className="pl-8 text-black pt-2 min-h-[80px]" placeholder="Why are you a good fit for this job?" />
                    </div>
                  </TextField>

                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary" className="text-brown">
                Cancel
              </Button>
              {/* HTML form attribute দিয়ে বাটনকে ফর্মের সাথে ট্রিগার করা হলো */}
              <Button type="submit" form="proposal-form" disabled={loading} className="bg-navy text-cream font-medium">
                {loading ? "Sending..." : "Submit Application"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}