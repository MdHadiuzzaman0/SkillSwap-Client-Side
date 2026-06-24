"use client";
import React, { useState, useEffect } from "react";
import { fetchProfileData } from "@/lib/data";
import { updateProfileData } from "@/lib/action";
import { useSession } from "@/lib/auth-client";
import { FiEdit2, FiX, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from '@/lib/auth-client';

const FreelancerProfilePage = () => {
  const router = useRouter()
  const { data: session, isPending } = useSession();
  const freelancerEmail = session?.user?.email;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: "",
    skills: "",
    bio: "",
    //hourlyRate: "",
  });

  // Load existing user info from database on mount
  useEffect(() => {
    if (!freelancerEmail) return;

    const loadProfile = async () => {
      setLoading(true);
      const { data: tokenData } = await authClient.token()
      const token = tokenData?.token;
      const data = await fetchProfileData(freelancerEmail, token);
      if (data) {
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          image: data.image || "",
          skills: data.skills ? data.skills.join(", ") : "",
          bio: data.bio || "",
          //hourlyRate: data.hourlyRate || "",
        });
      }
      setLoading(false);
    };

    loadProfile();
  }, [freelancerEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      //[name]: name === "hourlyRate" ? Number(value) : value,
      [name] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    const payload = {
      ...formData,
      skills: skillsArray,
    };

    const { data: tokenData } = await authClient.token()
    const token = tokenData?.token;
    const result = await updateProfileData(freelancerEmail, payload, token);
    setUpdating(false);

    if (result.success) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setFormData({
        ...formData,
        skills: skillsArray.join(", "),
      });
      router.refresh();
    } else {
      toast.error("Failed to update profile.");
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-sm font-semibold text-brown">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-brown/10 space-y-6 shadow-sm">

      {/* Header section with Dynamic Edit / Cancel Button */}
      <div className="flex items-center justify-between border-b border-brown/5 pb-4">
        <div>
          <h1 className="text-xl font-bold text-black font-[var(--font-heading)]">Profile Settings</h1>
          <p className="text-[11px] text-brown font-light mt-0.5">Manage your public information shown to clients.</p>
        </div>

        {/* Toggle Mode Button */}
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 bg-cream hover:bg-gray-200 text-black px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer"
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
        {/* Full Name Field */}
        <div>
          <label className="block font-semibold text-brown mb-1.5">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditing} // 🎯 Field is disabled if isEditing is false
            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-brown/30 focus:border-black outline-none" : "bg-gray-50/50 border-brown/5 text-gray-500 cursor-not-allowed"
              }`}
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-brown mb-1.5">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditing} // 🎯 Field is disabled if isEditing is false
            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-brown/30 focus:border-black outline-none" : "bg-gray-50/50 border-brown/5 text-gray-500 cursor-not-allowed"
              }`}
            required
          />
        </div>

        {/* Profile Photo Link Field */}
        <div>
          <label className="block font-semibold text-brown mb-1.5">Profile Photo URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-brown/30 focus:border-black outline-none" : "bg-gray-50/50 border-brown/5 text-gray-500 cursor-not-allowed"
              }`}
          />
        </div>

        {/* Skills Tag Field */}
        <div>
          <label className="block font-semibold text-brown mb-1.5">Skills (Comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="e.g. React.js, Next.js, Tailwind CSS"
            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-brown/30 focus:border-black outline-none" : "bg-gray-50/50 border-brown/5 text-gray-500 cursor-not-allowed"
              }`}
          />
        </div>

        {/* Hourly Rate Field */}
        {/* <div>
          <label className="block font-semibold text-brown mb-1.5">Hourly Rate (USD / hr)</label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-brown/30 focus:border-black outline-none" : "bg-gray-50/50 border-brown/5 text-gray-500 cursor-not-allowed"
              }`}
            required
          />
        </div> */}

        {/* Biography Textarea */}
        <div>
          <label className="block font-semibold text-brown mb-1.5">Biography</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            disabled={!isEditing}
            rows="4"
            className={`w-full p-2.5 border rounded-xl transition-all duration-200 ${isEditing ? "bg-white border-brown/30 focus:border-black outline-none" : "bg-gray-50/50 border-brown/5 text-gray-500 cursor-not-allowed"
              }`}
          ></textarea>
        </div>

        {/* Action Button: Renders only when user hits the edit state toggle */}
        {isEditing && (
          <div className="pt-2 border-t border-brown/5 flex justify-end">
            <button
              type="submit"
              disabled={updating}
              className="flex items-center gap-1.5 bg-gray-300 text-black px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-400 transition-colors"
            >
              <FiCheck /> {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FreelancerProfilePage;