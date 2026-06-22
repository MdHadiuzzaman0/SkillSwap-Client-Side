"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown, Separator } from '@heroui/react';
import { FiChevronDown } from "react-icons/fi";

const FilterDropdown = ({ categoryOptions }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ১. ইউআরএল থেকে কারেন্টলি একটিভ ক্যাটাগরি রিড করা[cite: 4]
    const currentCategory = searchParams.get("category");

    // ২. বাটনের টেক্সট ডাইনামিক করা[cite: 4]
    let buttonText = "Filter Tasks";
    if (currentCategory) buttonText = `Category: ${currentCategory}`;

    // ৩. ফিল্টার ক্লিক হ্যান্ডলার[cite: 4]
    const handleFilterClick = (filterType, value) => {
        const params = new URLSearchParams(searchParams.toString()); // কারেন্ট ইউআরএল নেওয়া[cite: 4]

        const isCurrentlyActive = searchParams.get(filterType) === value;

        if (value === "All" || isCurrentlyActive) {
            params.delete(filterType); // 'All' বা পুনরায় ক্লিকে ফিল্টার রিমুভ হবে[cite: 4]
        } else {
            params.set(filterType, value); // নতুন ফিল্টার সেট হবে[cite: 4]
        }
        
        router.push(`?${params.toString()}`); // ইউআরএল আপডেট[cite: 4]
    };

    // ৪. ফিল্টার ক্লিয়ার করার ফাংশন[cite: 4]
    const handleClearFilter = () => {
        router.push("?"); // সব কুয়েরি সাফ[cite: 4]
    };

    return (
        <Dropdown>
            {/* 🔘 মেইন বাটন ট্রিগার */}
            <Dropdown.Trigger
                className="bg-gray-100 border p-4 rounded-2xl text-sm font-semibold text-gray-700 cursor-pointer flex justify-between items-center w-full"
            >
                <div className="flex justify-between items-center w-full">
                    <span>{buttonText}</span>
                    <FiChevronDown className="text-lg text-gray-500 ml-2" />
                </div>
            </Dropdown.Trigger>

            {/* 🍿 ড্রপডাউন বডি */}
            <Dropdown.Popover className="bg-white border border-gray-100 rounded-2xl shadow-xl min-w-[220px]">
                <Dropdown.Menu aria-label="Task Filter Menu">

                    <Dropdown.Item 
                        onPress={handleClearFilter}
                        className="text-red-500 text-center hover:bg-red-50 font-medium cursor-pointer"
                    >
                        <span>Clear Filters</span>
                    </Dropdown.Item>

                    <Separator className="my-1 bg-gray-100" />

                    {/* 🗂️ সাব-মেনু: টাস্ক ক্যাটাগরি */}
                    <Dropdown.SubmenuTrigger>
                        <Dropdown.Item className={`cursor-pointer ${currentCategory ? "text-workable-dark-green font-bold" : ""}`}>
                            <span>Task Category</span>
                            <Dropdown.SubmenuIndicator />
                        </Dropdown.Item>
                        
                        {/* ক্যাটাগরি অপশনস লিস্ট পপওভার */}
                        <Dropdown.Popover className="bg-white border border-gray-100 rounded-2xl shadow-xl min-w-[200px]">
                            <Dropdown.Menu aria-label="Categories">
                                <Dropdown.Item 
                                    onPress={() => handleFilterClick("category", "All")}
                                    className={`cursor-pointer ${!currentCategory ? "text-workable-dark-green font-bold" : ""}`}
                                >
                                    <span>All Categories</span>
                                    {!currentCategory && <Dropdown.ItemIndicator />}
                                </Dropdown.Item>

                                {/* মেইন পেজ থেকে আসা ডাইনামিক ক্যাটাগরি লিস্ট[cite: 4] */}
                                {categoryOptions?.map((opt) => (
                                    <Dropdown.Item 
                                        key={opt}
                                        onPress={() => handleFilterClick("category", opt)}
                                        className={`cursor-pointer ${currentCategory === opt ? "text-workable-dark-green font-bold" : ""}`}
                                    >
                                        <span>{opt}</span>
                                        {currentCategory === opt && <Dropdown.ItemIndicator />}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.SubmenuTrigger>

                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    );
};

export default FilterDropdown;