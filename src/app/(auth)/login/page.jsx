"use client";
import Link from 'next/link';
import { Form, TextField, Label, Input, Button, FieldError, Spinner } from "@heroui/react";
import { FaGoogle } from 'react-icons/fa';
import { FiMail, FiLock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const rawData = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.signIn.email({
                email: rawData.email,
                password: rawData.password,
            });
            if (error) {
                toast.error(error.message || "Invalid credentials. Please try again.");
            } else {
                toast.success('Logged in successfully!');
                // Role verification logic can be handled here or inside a middleware/layout
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            console.error("Login Error: ", err);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

   const handleSignInWithGoogle = async () => {
    try {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/create_profile?method=google", 
        });
    } catch (err) {
        toast.error("Google sign-in failed.");
    }
};

    return (
        <div className="min-h-[calc(100vh-68px)] w-full bg-white relative flex items-center justify-center p-4 sm:p-8 overflow-hidden text-[var(--color-black)] font-body">

            {/* Background Decorative Element */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(var(--color-tan)_1px,transparent_1px)] [background-size:32px_32px]"></div>

            <div className="w-full max-w-5xl bg-white border border-[var(--color-tan)]/30 rounded-2xl shadow-xl z-10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">

                {/* Left Informational Sidebar panel */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-[var(--color-navy)] text-[var(--color-cream)] relative">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                    <div className="my-6 lg:my-0 space-y-6 text-left relative z-10">
                        <span className="font-heading font-extrabold text-xl tracking-tight text-white block">
                            Skill<span className="text-[var(--color-tan)]">Swap</span>
                        </span>

                        <div className="space-y-2">
                            <h1 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight text-white leading-tight">
                                Welcome Back to <br />Your Workspace.
                            </h1>
                            <p className="text-[var(--color-cream)]/70 text-xs leading-relaxed max-w-xs font-normal">
                                Sign in to manage your active single-contract tasks or browse the marketplace for your next micro-gig.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="flex items-start gap-2.5 text-xs text-white/90">
                                <FiCheckCircle className="text-[var(--color-tan)] text-base mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold block">Secure Payments</span>
                                    <span className="text-[var(--color-cream)]/60 text-[11px] font-normal">Escrow-backed transactions via Stripe Checkout.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 text-xs text-white/90">
                                <FiCheckCircle className="text-[var(--color-tan)] text-base mt-0.5 shrink-0" />
                                <div>
                                    <span className="font-bold block">Verified Micro-Tasks</span>
                                    <span className="text-[var(--color-cream)]/60 text-[11px] font-normal">Direct contract setup with fast turnarounds.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block text-[10px] text-white/40 font-mono tracking-widest relative z-10">
                        SKILLSWAP AUTH SERVICES
                    </div>
                </div>

                {/* Right Login Action Side Form */}
                <div className="lg:col-span-7 p-8 lg:p-12 bg-white flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto space-y-6">

                        <div className="text-left">
                            <h2 className="text-xl font-heading font-bold tracking-tight text-[var(--color-black)]">Sign In</h2>
                            <p className="text-[var(--color-brown)] text-xs mt-1">Enter your platform credentials to access your workspace</p>
                        </div>

                        <div className="space-y-2">
                            <Button
                                onPress={handleSignInWithGoogle}
                                type="button"
                                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 border border-[var(--color-tan)]/40 text-[var(--color-black)] text-xs font-semibold uppercase tracking-wider h-11 rounded-xl cursor-pointer transition-colors"
                            >
                                <FaGoogle className="w-3.5 h-3.5 text-[var(--color-navy)]" />
                                <span>Continue with Google</span>
                            </Button>

                            {/* PDF/Assignment Rule Alert Note */}
                            <div className="flex items-start gap-2 bg-[var(--color-cream)]/40 border border-[var(--color-tan)]/30 p-2.5 rounded-xl text-[11px] text-[var(--color-brown)] leading-normal">
                                <FiAlertCircle className="text-[var(--color-navy)] text-sm shrink-0 mt-0.5" />
                                <p>
                                    <span className="font-bold text-[var(--color-navy)]">Note:</span> By Google, you will be automatically <logged-in></logged-in> as a <span className="font-bold">Client</span>. 
                                </p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center text-[10px] uppercase tracking-widest text-[var(--color-brown)]/40">
                            <div className="w-full border-t border-[var(--color-tan)]/20"></div>
                            <span className="bg-white px-4 absolute whitespace-nowrap">Or secure credentials login</span>
                        </div>

                        <Form onSubmit={handleLogin} className="space-y-4 text-left">
                            <TextField isRequired name="email" type="email" className="w-full">
                                <Label className="text-[11px] font-bold tracking-wider text-[var(--color-brown)] mb-1.5 block">Email Address</Label>
                                <div className="w-full relative flex items-center">
                                    <FiMail className="absolute left-4 text-[var(--color-brown)] w-4 h-4 pointer-events-none" />
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full bg-neutral-50 text-[var(--color-black)] placeholder-[var(--color-brown)]/50 text-sm border border-[var(--color-tan)]/40 focus:border-[var(--color-navy)] rounded-xl pl-11 pr-4 py-3 outline-none transition-colors duration-200 block"
                                    />
                                </div>
                                <FieldError className="text-rose-500 text-[11px] mt-1 block" />
                            </TextField>

                            <TextField isRequired name="password" type="password" className="w-full">
                                <div className="flex justify-between items-center mb-1.5">
                                    <Label className="text-[11px] font-bold tracking-wider text-[var(--color-brown)] block">Password</Label>
                                </div>
                                <div className="w-full relative flex items-center">
                                    <FiLock className="absolute left-4 text-[var(--color-brown)] w-4 h-4 pointer-events-none" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-neutral-50 text-[var(--color-black)] placeholder-[var(--color-brown)]/50 text-sm border border-[var(--color-tan)]/40 focus:border-[var(--color-navy)] rounded-xl pl-11 pr-4 py-3 outline-none transition-colors duration-200 block"
                                    />
                                </div>
                                <FieldError className="text-rose-500 text-[11px] mt-1 block" />
                            </TextField>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy)]/90 text-white font-bold text-xs uppercase tracking-widest h-12 rounded-xl mt-4 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner size="sm" color="white" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <span>Login to Account</span>
                                )}
                            </Button>
                        </Form>

                        <p className="text-center text-xs text-[var(--color-brown)] pt-1">
                            Dont have an account yet? <Link href="/signup" className="text-[var(--color-navy)] hover:underline font-bold ml-1">Sign-up here</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}