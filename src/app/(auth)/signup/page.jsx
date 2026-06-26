"use client";

import Link from 'next/link';
import { Form, TextField, Label, Input, Button, FieldError } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FiUser, FiMail, FiLock, FiImage, FiAlertCircle, FiCheckCircle, FiStar, FiUsers } from 'react-icons/fi';

export default function SignupPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("client");
    
    // 🎯 ইমেজ ফাইল ও আপলোডিং ট্র্যাকিংয়ের জন্য নতুন স্টেট
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // 🎯 ImgBB-তে ছবি আপলোড করার আইসোলেটেড ফাংশন
    const uploadToImgBB = async (file) => {
        if (!file) return "";
        
        const formData = new FormData();
        formData.append("image", file);

        // .env ফাইল থেকে আপনার প্রজেক্টের ImgBB API Key নেওয়া হচ্ছে
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
        
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            
            if (data.success) {
                return data.data.url; // সাকসেস হলে লাইভ ডিরেক্ট লিঙ্ক ব্যাক করবে
            } else {
                console.error("ImgBB Error:", data);
                return "";
            }
        } catch (error) {
            console.error("Error uploading image to ImgBB:", error);
            return "";
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const rawData = Object.fromEntries(formData.entries());

        try {
            setUploading(true); // আপলোড ও রেজিস্ট্রেশন লোডার স্টার্ট
            let finalImageUrl = "https://i.pravatar.cc/150?img=default"; // ডিফল্ট অবতার

            // 🎯 ইউজার যদি ডিভাইস থেকে কোনো ছবি সিলেক্ট করে থাকে
            if (imageFile) {
                toast.loading("Uploading avatar image...", { id: "uploading-toast" });
                const uploadedUrl = await uploadToImgBB(imageFile);
                
                if (uploadedUrl) {
                    finalImageUrl = uploadedUrl;
                    toast.success("Image uploaded successfully!", { id: "uploading-toast" });
                } else {
                    toast.error("Image upload failed, using default avatar.", { id: "uploading-toast" });
                }
            }

            // 🎯 authClient-এর মাধ্যমে ডাটাবেজে ইউজার ক্রিয়েট করা
            const { data, error } = await authClient.signUp.email({
                email: rawData.email,
                password: rawData.password,
                name: rawData.name,
                image: finalImageUrl, // এখানে লাইভ ImgBB লিঙ্ক অথবা ডিফল্ট লিঙ্কটি যাবে
                role: selectedRole,
            });

            setUploading(false); // কাজ শেষে লোডার স্টপ

            if (error) {
                toast.error(error.message || "Registration failed. Please try again.");
            } else {
                toast.success('Registration completed successfully!');
                router.push('/login');
            }
        } catch (err) {
            console.error("Signup Error: ", err);
            setUploading(false);
            toast.error("An unexpected error occurred.");
        }
    };

    const handleSignInWithGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/create-profile", 
            });
        } catch (err) {
            toast.error("Google sign-in failed.");
        }
    };

    return (
        <div className="min-h-[calc(100vh-68px)] w-full bg-white relative flex items-center justify-center p-4 sm:p-8 overflow-hidden text-[var(--color-black)] font-body">
            
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(var(--color-tan)_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <div className="w-full max-w-5xl bg-white border border-[var(--color-tan)]/30 rounded-2xl shadow-xl z-10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                
                {/* Left Info Panel */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-[var(--color-navy)] text-[var(--color-cream)] relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                    {/* Top Brand & Header Section */}
                    <div className="my-6 lg:my-0 space-y-6 text-left relative z-10">
                        <span className="font-heading font-extrabold text-xl tracking-tight text-white block">
                            Skill<span className="text-[var(--color-tan)]">Swap</span>
                        </span>

                        <div className="space-y-2">
                            <h1 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight text-white leading-tight">
                                Join the Elite <br />Talent Hub.
                            </h1>
                            <p className="text-[var(--color-cream)]/70 text-xs leading-relaxed max-w-xs font-normal">
                                Select your structural role during credential entry to start tracking milestones on specialized dashboards.
                            </p>
                        </div>
                    </div>

                    {/* 🎯 নতুন যুক্ত হওয়া লাইভ স্ট্যাটস ও কী-ফিচার সেকশন (খালি জায়গা পূরণ করার জন্য) */}
                    <div className="relative z-10 my-6 lg:my-0 space-y-4 border-t border-white/10 pt-6 text-left">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Stat 1: Rating */}
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-white/10 rounded-lg text-[var(--color-tan)]">
                                    <FiStar className="w-4 h-4 fill-current" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm leading-none">4.9 / 5.0</h4>
                                    <p className="text-[var(--color-cream)]/50 text-[10px] mt-0.5 font-medium">User Rating</p>
                                </div>
                            </div>

                            {/* Stat 2: Active Users */}
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-white/10 rounded-lg text-white">
                                    <FiUsers className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm leading-none">10K+</h4>
                                    <p className="text-[var(--color-cream)]/50 text-[10px] mt-0.5 font-medium">Active Members</p>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Key Feature List */}
                        <div className="space-y-2.5 pt-2">
                            <div className="flex items-center gap-2 text-xs text-[var(--color-cream)]/90">
                                <FiCheckCircle className="text-[var(--color-tan)] w-3.5 h-3.5 shrink-0" />
                                <span>Secure Escrow & Milestones Tracking</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--color-cream)]/90">
                                <FiCheckCircle className="text-[var(--color-tan)] w-3.5 h-3.5 shrink-0" />
                                <span>Verified Client & Professional Profiles</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Meta Text */}
                    <div className="hidden lg:block text-[10px] text-white/40 font-mono tracking-widest relative z-10">
                        SKILLSWAP REGISTRATION
                    </div>
                </div>

                {/* Right Form Fields Panel */}
                <div className="lg:col-span-7 p-8 lg:p-12 bg-white flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto space-y-5">

                        <div className="text-left">
                            <h2 className="text-xl font-heading font-bold tracking-tight text-[var(--color-black)]">Create Account</h2>
                            <p className="text-[var(--color-brown)] text-xs mt-1">Register to start participating in active micro-task flows</p>
                        </div>

                        {/* Google Sign-In Button */}
                        <div className="space-y-2">
                            <Button
                                onPress={handleSignInWithGoogle}
                                type="button"
                                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 border border-[var(--color-tan)]/40 text-[var(--color-black)] text-xs font-semibold uppercase tracking-wider h-11 rounded-xl cursor-pointer transition-colors"
                            >
                                <FaGoogle className="w-3.5 h-3.5 text-[var(--color-navy)]" />
                                <span>Sign up with Google</span>
                            </Button>
                            
                            {/* PDF/Assignment Rule Alert Note */}
                            <div className="flex items-center gap-2 bg-[var(--color-cream)]/40 border border-[var(--color-tan)]/30 p-2.5 rounded-xl text-[11px] text-[var(--color-brown)] leading-normal">
                                <FiAlertCircle className="text-[var(--color-navy)] text-lg shrink-0 mt-0.5" />
                                <p>
                                    <span className="font-bold text-[var(--color-navy)]">Note:</span> By signing in with Google, you will be automatically registered as a <span className="font-extrabold">Client</span>. <span className="text-center"> To join as a <span className="font-extrabold">Freelancer</span>, please fill out the form below.</span>
                                </p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center text-[10px] uppercase tracking-widest text-[var(--color-brown)]/40 my-2">
                            <div className="w-full border-t border-[var(--color-tan)]/20"></div>
                            <span className="bg-white px-4 absolute whitespace-nowrap">Or register with credentials</span>
                        </div>

                        <Form onSubmit={handleSignup} className="space-y-4 text-left">
                            
                            {/* Role Selection Checkboxes */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold tracking-wider text-[var(--color-brown)] block">Select System Role</label>
                                <input type="hidden" name="role" value={selectedRole} />
                                <div className="grid grid-cols-2 gap-4">
                                    <div 
                                        onClick={() => setSelectedRole("client")}
                                        className={`p-2.5 rounded-xl border text-center cursor-pointer select-none transition-all text-xs uppercase tracking-wider ${
                                            selectedRole === "client" 
                                                ? "border-[var(--color-navy)] bg-[var(--color-navy)]/5 font-bold text-[var(--color-navy)]" 
                                                : "border-[var(--color-tan)]/40 hover:bg-neutral-50 text-[var(--color-brown)]"
                                        }`}
                                    >
                                        Client
                                    </div>
                                    <div 
                                        onClick={() => setSelectedRole("freelancer")}
                                        className={`p-2.5 rounded-xl border text-center cursor-pointer select-none transition-all text-xs uppercase tracking-wider ${
                                            selectedRole === "freelancer" 
                                                ? "border-[var(--color-navy)] bg-[var(--color-navy)]/5 font-bold text-[var(--color-navy)]" 
                                                : "border-[var(--color-tan)]/40 hover:bg-neutral-50 text-[var(--color-brown)]"
                                        }`}
                                    >
                                        Freelancer
                                    </div>
                                </div>
                            </div>

                            {/* Full Name Validation */}
                            <TextField 
                                isRequired 
                                name="name" 
                                type="text" 
                                className="w-full"
                                // validate={(value) => {
                                //     if (!value || value.trim().length < 2) {
                                //         return "Please enter your full name (at least 2 characters)";
                                //     }
                                //     return null;
                                // }}
                            >
                                <Label className="text-[11px] font-bold tracking-wider text-[var(--color-brown)] mb-1 block">Full Name</Label>
                                <div className="w-full relative flex items-center">
                                    <FiUser className="absolute left-4 text-[var(--color-brown)] w-4 h-4 pointer-events-none" />
                                    <Input
                                        placeholder="John Doe"
                                        className="w-full bg-neutral-50 text-[var(--color-black)] placeholder-[var(--color-brown)]/50 text-sm border border-[var(--color-tan)]/40 focus:border-[var(--color-navy)] rounded-xl pl-11 pr-4 py-2.5 outline-none block"
                                    />
                                </div>
                                <FieldError className="text-rose-500 text-[11px] mt-1 block" />
                            </TextField>

                            {/* Email Validation */}
                            <TextField 
                                isRequired 
                                name="email" 
                                type="email" 
                                className="w-full"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Label className="text-[11px] font-bold tracking-wider text-[var(--color-brown)] mb-1 block">Email Address</Label>
                                <div className="w-full relative flex items-center">
                                    <FiMail className="absolute left-4 text-[var(--color-brown)] w-4 h-4 pointer-events-none" />
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full bg-neutral-50 text-[var(--color-black)] placeholder-[var(--color-brown)]/50 text-sm border border-[var(--color-tan)]/40 focus:border-[var(--color-navy)] rounded-xl pl-11 pr-4 py-2.5 outline-none block"
                                    />
                                </div>
                                <FieldError className="text-rose-500 text-[11px] mt-1 block" />
                            </TextField>

                            {/* 🎯 মডিফাইড লোকাল ফাইল ইনপুট সেকশন */}
                            <div className="w-full space-y-1">
                                <Label className="text-[11px] font-bold tracking-wider text-[var(--color-brown)] mb-1 block">
                                    Profile Avatar (Optional)
                                </Label>
                                <div className="w-full relative flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-neutral-50 border border-[var(--color-tan)]/40 rounded-xl p-3">
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <FiImage className="text-[var(--color-brown)] w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files[0])}
                                            className="text-xs text-[var(--color-brown)] file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-navy)] file:text-white hover:file:opacity-90 cursor-pointer"
                                        />
                                    </div>
                                    
                                    {/* ফাইল সিলেক্ট হলে তার প্রিভিউ নাম দেখানোর ছোট ব্যাজ */}
                                    {imageFile && (
                                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-md border border-emerald-200 max-w-[180px] truncate">
                                            📸 {imageFile.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Password Validation with PDF Rules */}
                            <TextField 
                                isRequired 
                                name="password" 
                                type="password" 
                                className="w-full"
                                validate={(value) => {
                                    if (value.length < 6) {
                                        return "Password must be at least 6 characters long";
                                    }
                                    // if (!/[A-Z]/.test(value)) {
                                    //     return "Password must contain at least one capital letter";
                                    // }
                                    if (!/[a-z]/.test(value)) {
                                        return "Password must contain at least one lowercase letter";
                                    }
                                    return null;
                                }}
                            >
                                <Label className="text-[11px] font-bold tracking-wider text-[var(--color-brown)] mb-1 block">Secure Password</Label>
                                <div className="w-full relative flex items-center">
                                    <FiLock className="absolute left-4 text-[var(--color-brown)] w-4 h-4 pointer-events-none" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-neutral-50 text-[var(--color-black)] placeholder-[var(--color-brown)]/50 text-sm border border-[var(--color-tan)]/40 focus:border-[var(--color-navy)] rounded-xl pl-11 pr-4 py-2.5 outline-none block"
                                    />
                                </div>
                                <FieldError className="text-rose-500 text-[11px] mt-1 block" />
                            </TextField>

                            {/* 🎯 লোডিং স্টেটের ওপর ভিত্তি করে ডিজেবল ও টেক্সট ডায়নামিক করা বাটন */}
                            <Button
                                type="submit"
                                disabled={uploading}
                                className={`w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white font-bold text-xs uppercase tracking-widest h-12 rounded-xl mt-2 cursor-pointer transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <span>{uploading ? "Processing..." : "Register Account"}</span>
                            </Button>
                        </Form>

                        <p className="text-center text-xs text-[var(--color-brown)] pt-1">
                            Already have an account? <Link href="/login" className="text-[var(--color-navy)] hover:underline font-bold ml-1">Sign-in here</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}