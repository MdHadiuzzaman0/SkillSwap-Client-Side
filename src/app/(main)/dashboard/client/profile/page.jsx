"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { FiEdit2, FiX, FiCheck, FiBriefcase } from "react-icons/fi";
import { getUserInfo } from "@/lib/data";
import { updateProfileData } from "@/lib/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from '@/lib/auth-client';

const ClientProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const clientEmail = session?.user?.email;

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // ক্লায়েন্টের রিকোয়ার্ড ফিল্ড অনুযায়ী স্টেট ডিফাইন করা হয়েছে
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        image: "",
        companyName: "",
        industry: "",
        bio: "",
    });

    // মাউন্টে এক্সিস্টিং ডাটাবেজ থেকে ক্লায়েন্ট প্রোফাইল ডাটা লোড করা
    useEffect(() => {
        if (!clientEmail) return;

        const loadProfile = async () => {
            setLoading(true);
            const { data: tokenData } = await authClient.token()
            const token = tokenData?.token;
            const data = await getUserInfo(clientEmail);
            if (data) {
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    image: data.image || "",
                    companyName: data.companyName || "",
                    industry: data.industry || "",
                    bio: data.bio || "",
                });
            }
            setLoading(false);
        };

        loadProfile();
    }, [clientEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const { data: tokenData } = await authClient.token()
        const token = tokenData?.token;

        // ফ্রিল্যান্সার প্রোফাইলের মতোই সেম সার্ভার অ্যাকশনে ক্লায়েন্টের ডাটা পাস করা হয়েছে
        const result = await updateProfileData(clientEmail, formData, token);
        setUpdating(false);

        if (result?.success) {
            toast.success("Client profile updated successfully!");
            setIsEditing(false);
            router.refresh(); // পেজ রিফ্রেশ করে লেটেস্ট ডাটা দেখানোর জন্য
        } else {
            toast.error(result?.message || "Failed to update profile.");
        }
    };

    if (isPending || loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-3 text-sm font-semibold text-gray-600">Loading Client Profile...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-gray-100 space-y-6 shadow-sm text-black">

            {/* হেডার সেকশন এবং এডিট/ক্যান্সেল বাটন টগল */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <h1 className="text-xl font-bold">Company Profile Settings</h1>
                    <p className="text-[11px] text-gray-500 mt-0.5">Manage your company information shown to job seekers.</p>
                </div>

                {!isEditing ? (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer"
                    >
                        <FiEdit2 /> Edit Profile
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide cursor-pointer transition-colors"
                    >
                        <FiX /> Cancel
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">

                {/* ১. ফার্স্ট ও লাস্ট নেম গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold text-gray-600 mb-1.5">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-gray-300 focus:border-black outline-none" : "bg-gray-50/50 border-gray-100 text-gray-500 cursor-not-allowed"
                                }`}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-600 mb-1.5">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-gray-300 focus:border-black outline-none" : "bg-gray-50/50 border-gray-100 text-gray-500 cursor-not-allowed"
                                }`}
                            required
                        />
                    </div>
                </div>

                {/* ২. প্রোফাইল লোগো বা ফটো ইউআরএল */}
                <div>
                    <label className="block font-semibold text-gray-600 mb-1.5">Profile / Company Logo URL</label>
                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        disabled
                        placeholder="https://example.com/logo.png"
                        className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-gray-300 focus:border-black outline-none" : "bg-gray-50/50 border-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                    />
                </div>

                {/* Role Field (Disabled) */}
                <div>
                    <label className="block font-semibold text-gray-600 mb-1.5">Your Role</label>
                    <input
                        type="text"
                        name="role"
                        value="client"
                        disabled // 🎯 এটি সবসময় ডিজেবলড থাকবে, ইউজার এডিট করতে পারবে না
                        className="w-full p-2.5 border rounded-xl bg-gray-50/50 border-gray-100 text-gray-400 cursor-not-allowed font-medium"
                    />
                </div>

                {/* ৩. কোম্পানির নাম (Company Name) */}
                <div>
                    <label className="block font-semibold text-gray-600 mb-1.5">Company / Institution Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. Khulna University of Engineering & Technology"
                        className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-gray-300 focus:border-black outline-none" : "bg-gray-50/50 border-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                        required
                    />
                </div>

                {/* ৪. ইন্ডাস্ট্রি টাইপ (Industry) */}
                <div>
                    <label className="block font-semibold text-gray-600 mb-1.5">Industry</label>
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. Technology, Education, E-commerce"
                        className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-gray-300 focus:border-black outline-none" : "bg-gray-50/50 border-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                        required
                    />
                </div>

                {/* ৫. ক্লায়েন্ট বা কোম্পানি বায়ো (Biography) */}
                <div>
                    <label className="block font-semibold text-gray-600 mb-1.5">Company Bio / Description</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows="4"
                        placeholder="Describe your company or your hiring goals..."
                        className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-gray-300 focus:border-black outline-none" : "bg-gray-50/50 border-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                    ></textarea>
                </div>

                {/* সাবমিট বাটন (শুধুমাত্র এডিট মোড অন থাকলে দেখাবে) */}
                {isEditing && (
                    <div className="pt-2 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={updating}
                            className="flex items-center gap-1.5 bg-navy text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
                        >
                            <FiCheck /> {updating ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ClientProfilePage;