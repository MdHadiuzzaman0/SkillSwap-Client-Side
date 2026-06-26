"use client";
import React, { useState, useEffect } from "react";
import { FiPlusCircle, FiDollarSign, FiCalendar, FiTag, FiFileText } from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; 
import { Button, FieldError, Form, Input, Label, TextArea, TextField } from "@heroui/react"; 
import toast from "react-hot-toast";
import { createTaskAction } from "@/lib/action";
import { useRouter } from "next/navigation";

const PostTaskPage = () => {
    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const [dbUser, setDbUser] = useState(null); // 🎯 ডাটাবেজ থেকে পাওয়া ইউজার স্টেট
    const router = useRouter();

    // ক্যাটাগরি অপশনস
    const categories = ['Web Development', 'UI/UX Design', 'Content Writing', 'Mobile Development', 'Graphic Design', 'Digital Marketing', 'Video Editing'];

    // 🎯 ইউজারের ইমেইল দিয়ে ডাটাবেজ থেকে রিয়েল-টাইম ডাটা ফিল্টার করা
    useEffect(() => {
        async function fetchAndFilterUser() {
            if (!session?.user?.email) return;
            try {
                const { data: tokenData } = await authClient.token();
                const token = tokenData?.token;
                
                // সব ইউজার নিয়ে আসা
                const response = await getAllData(token);
                const allUsers = response?.users || [];
                
                // 🎯 কারেন্ট লগইন থাকা ইউজারের ইমেইল দিয়ে ফিল্টার করা
                const matchedUser = allUsers.find(u => u.email === session.user.email);
                if (matchedUser) {
                    setDbUser(matchedUser);
                }
            } catch (error) {
                console.error("Error fetching user from DB:", error);
            }
        }
        fetchAndFilterUser();
    }, [session?.user?.email]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 🎯 সেশন না থাকলে সাবমিট আটকে দেবে
    if (!session?.user?.email) {
        toast.error("User session not found! Please reload the page.");
        return;
    }
    
    setLoading(true);
    const formData = new FormData(e.target);
    
    // বাকি taskPayload কোড আগের মতোই থাকবে...
        
        const taskPayload = {
            title: formData.get("title"),
            category: formData.get("category"),
            description: formData.get("description"),
            budget: Number(formData.get("budget")),
            deadline: new Date(formData.get("deadline")).toISOString(),
            status: "open",
            clientEmail: session?.user?.email || "n/a",  
            clientName: `${dbUser?.firstName || ""} ${dbUser?.lastName || ""}`.trim()|| session?.user?.name || "Anonymous", 
            clientImage: dbUser?.image || "https://cdn-icons-png.flaticon.com/512/2640/2640788.png",
            createdAt: new Date().toISOString(),
        };
        
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token; 
        
        try {
            const result = await createTaskAction({ taskPayload, token });
            if (result?.success) {
                toast.success("Task posted successfully!");
                e.target.reset();
                router.push('/dashboard/client/my-tasks');
            } else {
                toast.error(result?.message || "Failed to post task.");
            }
        } catch (error) {
            console.error("Error posting task:", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* হেডার সেকশন */}
            <div className="flex items-center gap-3 border-b border-brown/10 pb-4">
                <div className="p-2.5 bg-navy/10 text-navy rounded-xl">
                    <FiPlusCircle className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold font-[var(--font-heading)] text-black">Post a New Task</h1>
                    <p className="text-xs text-brown font-light mt-0.5">
                        Fill out the details below to find the best freelancer for your micro-task[cite: 1].
                    </p>
                </div>
            </div>

            {/* ফর্ম কন্টেইনার */}
            <div className="bg-white p-6 border border-brown/10 rounded-2xl shadow-sm">
                {/* 🎯 HeroUI Form */}
                <Form onSubmit={handleSubmit} validationBehavior="native" className="flex flex-col gap-5 w-full">

                    {/* ১. Task Title */}
                    <TextField name="title" isRequired className="w-full flex flex-col gap-1">
                        <Label className="text-xs font-bold text-brown uppercase tracking-wide">Task Title</Label>
                        <Input
                            placeholder="e.g., Build a Custom Shopify Store for Apparel Brand"
                            className="w-full text-black border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus-within:border-navy mt-1"
                        />
                        <FieldError className="text-xs text-red-500 mt-0.5 font-medium" />
                    </TextField>

                    {/* ২. Category Selector */}
                    {/* ২. Category Selector */}
<div className="flex flex-col gap-1 w-full">
  <Label className="text-xs font-bold text-brown uppercase tracking-wide">Category</Label>
  <div className="relative flex items-center w-full border border-gray-300 rounded-xl mt-1 bg-white px-3 py-2.5 focus-within:border-navy">
    <FiTag className="text-brown/60 mr-2" />
    
    {/* 🎯 এখানে defaultValue="" যোগ করা হয়েছে */}
    <select 
      name="category" 
      required 
      defaultValue="" 
      className="w-full text-black bg-transparent focus:outline-none text-sm cursor-pointer"
    >
      {/* 🎯 এখান থেকে selected প্রপটি ফেলে দেওয়া হয়েছে */}
      <option value="" disabled>Select a Category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  </div>
</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {/* ৩. Budget (USD) */}
                        <TextField name="budget" type="number" isRequired className="w-full flex flex-col gap-1">
                            <Label className="text-xs font-bold text-brown uppercase tracking-wide">Budget (USD)</Label>
                            <div className="relative flex items-center w-full border border-gray-300 rounded-xl mt-1 px-3 py-2.5 bg-white focus-within:border-navy">
                                <FiDollarSign className="text-brown/60 mr-1" />
                                <Input
                                    placeholder="e.g., 450"
                                    min="1"
                                    className="w-full text-black bg-transparent focus:outline-none text-sm"
                                />
                            </div>
                            {/* 🎯 বাজেট এরর ট্যাগ */}
                            <FieldError className="text-xs text-red-500 mt-0.5 font-medium" />
                        </TextField>

                        {/* ৪. Deadline Date */}
                        <TextField name="deadline" type="date" isRequired className="w-full flex flex-col gap-1">
                            <Label className="text-xs font-bold text-brown uppercase tracking-wide">Deadline Date</Label>
                            <div className="relative flex items-center w-full border border-gray-300 rounded-xl mt-1 px-3 py-2.5 bg-white focus-within:border-navy">
                                <FiCalendar className="text-brown/60 mr-2" />
                                <Input
                                    className="w-full text-black bg-transparent focus:outline-none text-sm cursor-pointer"
                                />
                            </div>
                            {/* 🎯 ডেডলাইন এরর ট্যাগ */}
                            <FieldError className="text-xs text-red-500 mt-0.5 font-medium" />
                        </TextField>
                    </div>

                    {/* ৫. Description  */}
                    <TextField name="description" isRequired className="w-full flex flex-col gap-1">
                        <Label className="text-xs font-bold text-brown uppercase tracking-wide">Task Description</Label>
                        <TextArea
                            placeholder="Describe your project requirements in detail..."
                            className="w-full text-black border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus-within:border-navy mt-1 min-h-32 resize-none"
                        />

                        <FieldError className="text-xs text-red-500 mt-0.5 font-medium" />
                    </TextField>


                    {/* সাবমিট বাটন */}
                    <div className="flex justify-end pt-2 w-full">
                        {/* 🎯 isDisabled এ !session যোগ করা হয়েছে */}
<Button
    type="submit"
    isDisabled={loading || !session?.user?.email} 
    className="bg-navy text-cream font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:opacity-90 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
>
    {loading || !session?.user?.email ? (
        <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></div>
    ) : (
        <>
            <FiPlusCircle /> Publish Task
        </>
    )}
</Button>
                    </div>

                </Form>
            </div>
        </div>
    );
};

export default PostTaskPage;