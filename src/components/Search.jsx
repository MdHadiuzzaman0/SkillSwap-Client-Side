"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBox = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [text, setText] = useState(searchParams.get("search") || "");

    useEffect(() => {
        // Debounce: টাইপ করা থামানোর ৫০০ মিলি-সেকেন্ড পর ইউআরএল চেঞ্জ হবে
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (text) {
                params.set("search", text); // টাইপ করলে সার্চ কুয়েরি বসবে[cite: 3]
            } else {
                params.delete("search"); // ইনপুট খালি করলে সার্চ কুয়েরি মুছে যাবে[cite: 3]
            }
            router.push(`?${params.toString()}`);
        }, 500); 

        return () => clearTimeout(delayDebounceFn);
    }, [text]);

    return (
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex items-center gap-3 focus-within:border-workable-dark-green transition-all duration-200 w-full">
            <FiSearch className="text-workable-dark-green text-xl shrink-0" />
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search tasks by title..."
                className="w-full text-sm text-gray-800 focus:outline-none py-1"
            />
        </div>
    );
};

export default SearchBox;