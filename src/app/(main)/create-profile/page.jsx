"use client";
import { useEffect, useState } from "react";
import CreateProfileOfClient from "@/components/CreateProfileOfClient";
import CreateProfileOfFreelancer from "@/components/CreateProfileOfFreelancer";
import { handleFormSubmit } from "@/lib/action";
import { getUserInfo } from "@/lib/data";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function CreateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(true);

  // 🎯 ইমেজ ফাইল ও আপলোড স্ট্যাটাস ট্র্যাকিংয়ের জন্য নতুন স্টেট
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const email = session?.user?.email || "";
  const image = session?.user?.image || ""; // সেশন থেকে আসা ডিফল্ট বা গুগল ইমেজ
  const initialRole = session?.user?.role || "";
  const targetRole = initialRole === "freelancer" ? "freelancer" : "client";

  const adminEmail = "admin1@taskhive.com";

  useEffect(() => {
    async function checkProfile() {
      if (!isPending && email) {
        if (email.toLowerCase() === adminEmail.toLowerCase()) {
          window.location.href = "/dashboard/admin/intro";
          return;
        }

        const userData = await getUserInfo(email);
        if (userData) {
          const userRole = userData.role ? userData.role.toLowerCase() : "client";
          window.location.href = `/dashboard/${userRole}/intro`;
          return;
        }
        setLoading(false);
      }
    }
    checkProfile();
  }, [email, isPending]);

  // 🎯 ImgBB-তে ছবি আপলোড করার কাস্টম ফাংশন
  const uploadToImgBB = async (file) => {
    if (!file) return "";

    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        return data.data.url;
      } else {
        console.error("ImgBB Error:", data);
        return "";
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      return "";
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const profileData = Object.fromEntries(formData.entries())

    try {
      setUploading(true); // আপলোড ও সাবমিট লোডার স্টার্ট

      // 🎯 ছবি নির্ধারণের চমৎকার লজিক
      // প্রথমে চেক করবে সেশনে কোনো ইমেজ আছে কি না (যেমন গুগল সাইন-ইন), না থাকলে ডিফল্ট ইমেজ
      let finalImageUrl = image || "https://i.pravatar.cc/150?img=default";

      // কিন্তু ইউজার যদি নতুন করে ফোল্ডার থেকে ফাইল সিলেক্ট করে, তবে সেটা ImgBB-তে আপলোড হবে
      if (imageFile) {
        toast.loading("Uploading profile picture...", { id: "profile-upload" });
        const uploadedUrl = await uploadToImgBB(imageFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
          toast.success("Image uploaded successfully!", { id: "profile-upload" });
        } else {
          toast.error("Image upload failed, keeping fallback image.", { id: "profile-upload" });
        }
      }

      // ফাইনাল ছবির ইউআরএল ডাটা অবজেক্টে সেট করা
      profileData.image = finalImageUrl;

      if (profileData.role === "freelancer" && typeof profileData.skills === "string") {
        profileData.skills = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
        profileData.totalEarnings = 0;
      }

      profileData.isBlocked = false;
      profileData.email = email;
      profileData.createdAt = new Date();

      const tokenData = await authClient.token()
      const token = tokenData?.data?.token;

      const res = await handleFormSubmit(profileData, token);
      setUploading(false); // সাবমিট শেষে লোডার স্টপ

      if (res.success) {
        toast.success("Profile updated successfully! 🎉");
        window.location.href = `/dashboard/${targetRole}/intro`;
      } else {
        toast.error(`Failed to save: ${res.error}`);
      }
    } catch (err) {
      console.error("Profile Submit Error:", err);
      setUploading(false);
      toast.error("An unexpected error occurred.");
    }
  };

  if (isPending || loading) {
    return <div className="text-center mt-20 text-xs">Checking profile status...</div>;
  }

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6 bg-white rounded-2xl shadow-sm border mt-10 text-xs font-body">
      <h2 className="text-lg font-bold mb-6 text-[#1E242B]">
        Complete Your Profile as ({targetRole === "freelancer" ? "Freelancer" : "Client"})
      </h2>

      <form onSubmit={handleProfileSubmit} className="space-y-6">
        {/* 🎯 সাব-কম্পোনেন্টগুলোতে নতুন স্টেট ও প্রপস পাস করা হয়েছে */}
        {targetRole === "freelancer" ? (
          <CreateProfileOfFreelancer
            email={email}
            image={image}
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
        ) : (
          <CreateProfileOfClient
            email={email}
            image={image}
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
        )}

        {/* 🎯 আপলোডিং এর সময় ডাবল ক্লিক সেভ করার জন্য ডিসেবল বাটন */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full bg-navy text-white py-2.5 rounded-xl font-bold font-heading uppercase tracking-wide hover:bg-opacity-90 active:scale-[0.99] transition-all duration-300 shadow-md cursor-pointer ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {uploading ? "Saving Profile Info..." : "Save Info"}
        </button>
      </form>
    </div>
  );
}