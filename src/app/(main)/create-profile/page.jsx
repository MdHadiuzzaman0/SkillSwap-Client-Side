"use client";
import CreateProfileOfClient from "@/components/CreateProfileOfClient"; 
import CreateProfileOfFreelancer from "@/components/CreateProfileOfFreelancer"; 
import { handleFormSubmit } from "@/lib/action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function CreateProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  
  const email = session?.user?.email;
  const initialRole = session?.user?.role || "";
  const targetRole = initialRole === "freelancer" ? "freelancer" : "client";

  const handleProfileSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const profileData = Object.fromEntries(formData.entries());

  // // 1. Inject the correct role directly into profileData
  // profileData.role = targetRole;

  // 2. Process skills data based on user role right here
  if (profileData.role === "freelancer" && typeof profileData.skills === "string") {
    // Convert comma-separated string into a clean array
    profileData.skills = profileData.skills.split(",").map(s => s.trim()).filter(Boolean);
  } else {
    // Clients or empty states don't need skills array elements
    profileData.skills = [];
  }

  // 3. Attach metadata requirements directly before sending to the database
  profileData.isBlocked = false;
  profileData.createdAt = new Date(); // To keep tracking of user onboarding
  const res = await handleFormSubmit(profileData);
    
    if (res.success) {
      toast.success("Profile updated successfully! 🎉");
      // Redirect straight to their specific dashboard path
      window.location.href = `/dashboard/${targetRole}`;
    } else {
      toast.error(`Failed to save: ${res.error}`);
    }
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-6 bg-white rounded-2xl shadow-sm border mt-10 text-xs font-body">
      <h2 className="text-lg font-bold mb-6 text-[#1E242B]">
        Complete Your Profile as ({targetRole === "freelancer" ? "Freelancer" : "Client"})
      </h2>

      <form onSubmit={handleProfileSubmit} className="space-y-6">

        {/* DIRECT RENDERING: No dropdown step needed */}
        {targetRole === "freelancer" ? (
          <CreateProfileOfFreelancer email={email} />
        ) : (
          <CreateProfileOfClient email={email} />
        )}

        {/* SUBMIT BUTTON */}
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