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
  
  const email = session?.user?.email;
  const initialRole = session?.user?.role || "";
  const targetRole = initialRole === "freelancer" ? "freelancer" : "client";

  const adminEmail="admin1@example.com";

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

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const profileData = Object.fromEntries(formData.entries())

    if (profileData.role === "freelancer" && typeof profileData.skills === "string") {
      profileData.skills = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
      profileData.totalEarnings = 0;
    } 
    
    profileData.isBlocked = false;
    profileData.email = email;
    profileData.createdAt = new Date(); 
    const res = await handleFormSubmit(profileData);
    if (res.success) {
      toast.success("Profile updated successfully! 🎉");
      window.location.href = `/dashboard/${targetRole}/intro`;
    } else {
      toast.error(`Failed to save: ${res.error}`);
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
        {targetRole === "freelancer" ? (
          <CreateProfileOfFreelancer email={email} />
        ) : (
          <CreateProfileOfClient email={email} />
        )}

        <button 
          type="submit" 
          className="w-full bg-workable-dark-green text-black py-2.5 rounded-xl font-bold font-heading uppercase tracking-wide hover:bg-workable-primary transition-all duration-300 shadow-md active:scale-[0.99] cursor-pointer"
        >
          Save 
        </button>
      </form>
    </div>
  );
}