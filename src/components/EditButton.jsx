"use client";
import React, { useState } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { FiDollarSign, FiCalendar, FiTag, FiFileText, FiEdit2 } from "react-icons/fi";
import { updateTaskAction } from "@/lib/action";
import toast from "react-hot-toast";

export default function EditButton({ task }) {

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: task?.title || "",
        category: task?.category || "",
        budget: task?.budget || "",
        deadline: task?.deadline ? new Date(task.deadline).toISOString().split("T")[0] : "",
        description: task?.description || "",
    });

    // ক্যাটাগরি অপশনস (আপনার পেজ থেকে হুবহু নেওয়া)
    const categories = ['Web Development', 'UI/UX Design', 'Content Writing', 'Mobile Development', 'Graphic Design', 'Digital Marketing', 'Video Editing'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🎯 ডাটার সাথে আপডেট হওয়ার টাইমস্ট্যাম্প যোগ করা হলো
        const finalUpdatedData = {
            ...formData,
            budget: Number(formData.budget), // বাজেট নাম্বার ফরম্যাটে কনভার্ট
            updatedAt: new Date().toISOString()
        };

        // আপনার অ্যাকশন ফাইলে সোজা ডাটা পাস
        const result = await updateTaskAction(task._id, finalUpdatedData);

        if (result?.success) {
            toast.success(result.message || "Task updated successfully!");
        } else {
            toast.error(result?.message || "Failed to update task.");
        }

        // কাজ শেষ হলে মোডাল অফ
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            {/* মেইন টেবিল থেকে ওপেন করার ট্রিপল বাটন ট্রিগার */}
            <Button onPress={() => setIsOpen(true)} variant="secondary"><FiEdit2 className="w-4 h-4" />Edit Task</Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog className="sm:max-w-md bg-white text-black rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                        <Modal.CloseTrigger />

                        {/* হেডার সেকশন */}
                        <Modal.Header className="flex flex-col gap-1 p-6 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-2 text-navy">
                                <FiFileText className="w-5 h-5" />
                                <Modal.Heading className="text-lg font-bold">Edit Task Details</Modal.Heading>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                Modify your task requirements. Changes will reflect immediately for freelancers.
                            </p>
                        </Modal.Header>

                        {/* মোডাল বডি ও ফর্ম কন্টেইনার */}
                        <Modal.Body className="p-6">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

                                {/* ১. Task Title */}
                                <TextField name="title" className="w-full flex flex-col gap-1">
                                    <Label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Task Title</Label>
                                    <Input
                                        type="text"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., Build a Custom Shopify Store"
                                        className="w-full text-black border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus-within:border-navy mt-1"
                                    />
                                </TextField>

                                {/* ২. Category Selector */}
                                <div className="flex flex-col gap-1 w-full">
                                    <Label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Category</Label>
                                    <div className="relative flex items-center w-full border border-gray-300 rounded-xl mt-1 bg-white px-3 py-2.5 focus-within:border-navy">
                                        <FiTag className="text-gray-400 mr-2" />
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full text-black bg-transparent focus:outline-none text-sm cursor-pointer"
                                        >
                                            <option value="" disabled>Select a Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    {/* ৩. Budget (USD) */}
                                    <TextField name="budget" type="number" className="w-full flex flex-col gap-1">
                                        <Label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Budget (USD)</Label>
                                        <div className="relative flex items-center w-full border border-gray-300 rounded-xl mt-1 px-3 py-2.5 bg-white focus-within:border-navy">
                                            <FiDollarSign className="text-gray-400 mr-1" />
                                            <Input
                                                value={formData.budget}
                                                onChange={handleChange}
                                                placeholder="e.g., 450"
                                                min="1"
                                                className="w-full text-black bg-transparent focus:outline-none text-sm"
                                            />
                                        </div>
                                    </TextField>

                                    {/* ৪. Deadline Date */}
                                    <TextField name="deadline" type="date" className="w-full flex flex-col gap-1">
                                        <Label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Deadline Date</Label>
                                        <div className="relative flex items-center w-full border border-gray-300 rounded-xl mt-1 px-3 py-2.5 bg-white focus-within:border-navy">
                                            <FiCalendar className="text-gray-400 mr-2" />
                                            <Input
                                                value={formData.deadline}
                                                onChange={handleChange}
                                                className="w-full text-black bg-transparent focus:outline-none text-sm cursor-pointer"
                                            />
                                        </div>
                                    </TextField>
                                </div>

                                {/* ৫. Description */}
                                <TextField name="description" className="w-full flex flex-col gap-1">
                                    <Label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Task Description</Label>
                                    <Input
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe your project requirements..."
                                        className="w-full text-black border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus-within:border-navy mt-1"
                                    />
                                </TextField>

                            </form>
                        </Modal.Body>

                        {/* মোডাল ফুটার অ্যাকশন বাটন */}
                        <Modal.Footer className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                onPress={() => setIsOpen(false)}
                                className="px-5 py-2 rounded-xl text-sm"
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={handleSubmit}
                                className="bg-navy text-white font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition-all text-sm"
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}