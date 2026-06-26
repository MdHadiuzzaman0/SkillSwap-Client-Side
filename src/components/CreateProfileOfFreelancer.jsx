"use client";

import { TextField, Label, Input, TextArea } from "@heroui/react";

export default function CreateProfileOfFreelancer({ email, image, imageFile, setImageFile }) {
  return (
    <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm animate-fadeIn">
      <h3 className="font-heading font-bold text-gray-900 text-lg border-b pb-3 mb-4">
        Freelancer Professional Details
      </h3>

      {/* Hidden field to automatically pass the email into formData */}
      <input type="hidden" name="email" value={email || ""} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name Input */}
        <TextField isRequired name="firstName">
          <Label>First Name *</Label>
          <Input placeholder="e.g. Md. Hadiuzzaman" />
        </TextField>

        {/* Last Name Input */}
        <TextField isRequired name="lastName">
          <Label>Last Name *</Label>
          <Input placeholder="e.g. Clear" />
        </TextField>
      </div>

      {/* 🎯 মডিফাইড ইমেজ আপলোডার এবং রোল সেকশন (পাশাপাশি) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        {/* Role Input (Read Only) */}
        <TextField isReadOnly name="role" defaultValue="freelancer">
          <Label>Your Role</Label>
          <Input className="bg-gray-50 text-gray-500 cursor-not-allowed" />
        </TextField>

        {/* 📸 প্লাস সাইন সহ কাস্টম ফাইল ইনপুট */}
        <div className="space-y-1 text-left">
          <Label className="text-sm font-medium text-gray-700 block mb-1">
            Profile Picture (Optional)
          </Label>
          <div className="w-full relative flex items-center gap-3 bg-neutral-50 border border-gray-200 rounded-xl p-2.5 h-[40px]">
            <label className="flex items-center justify-center bg-navy text-white w-7 h-7 rounded-lg cursor-pointer hover:opacity-90 transition-all font-black text-sm select-none">
              +
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            
            {/* ফাইল সিলেক্ট হলে নাম দেখাবে, না হলে ডিফল্ট টেক্সট বা সেশনের ইমেজ */}
            {imageFile ? (
              <span className="text-xs text-emerald-700 font-bold truncate max-w-[180px]">
                📸 {imageFile.name}
              </span>
            ) : image ? (
              <span className="text-xs text-blue-600 font-medium truncate max-w-[180px]">
                🔗 Google Photo Loaded
              </span>
            ) : (
              <span className="text-xs text-gray-400 font-medium">
                Upload photo
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Professional Bio */}
      <div className="w-full">
        <Label className="block mb-2 font-medium text-sm text-gray-700">Professional Bio *</Label>
        <TextArea
          name="bio"
          placeholder="Tell clients about your expertise, experience, and what you excel at..."
          className="w-full"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Input */}
        <TextField isRequired name="skills">
          <Label>Skills (Comma Separated) *</Label>
          <Input placeholder="e.g. React, Node.js, Next.js, Tailwind" />
        </TextField>
      </div>

      {/* Portfolio Link */}
      <TextField name="portfolio" type="url">
        <Label>Portfolio Link</Label>
        <Input placeholder="https://yourportfolio.com" />
      </TextField>
    </div>
  );
}