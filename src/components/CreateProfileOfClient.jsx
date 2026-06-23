"use client";

import { TextField, Label, Input, TextArea } from "@heroui/react";

export default function CreateProfileOfClient({ email, image }) {
  return (
    <div className="space-y-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm animate-fadeIn">
      <h3 className="font-heading font-bold text-gray-900 text-lg border-b pb-3 mb-4">
        Client / Recruiter Business Profile
      </h3>

      {/* Hidden field to automatically pass the email into formData */}
      <input type="hidden" name="email" value={email || ""} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name Input */}
        <TextField isRequired name="firstName">
          <Label>First Name</Label>
          <Input placeholder="e.g. Md. Hadiuzzaman" />
        </TextField>

        {/* Last Name Input */}
        <TextField isRequired name="lastName">
          <Label>Last Name</Label>
          <Input placeholder="e.g. Clear" />
        </TextField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Input (Read Only) */}
        <TextField isReadOnly name="role" defaultValue="client">
          <Label>Your Role</Label>
          <Input className="bg-gray-50 text-gray-500 cursor-not-allowed" />
        </TextField>

        {/* Image */}
                <TextField isRequired name="image" defaultValue={image}>
                  <Label>Image Link</Label>
                  <Input placeholder='www.skillswap.jpg' />
                </TextField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <TextField name="companyName">
          <Label>Company / Organization Name</Label>
          <Input placeholder="e.g. Acme Corp or Personal" />
        </TextField>

        {/* Industry Type */}
        <TextField name="industry">
          <Label>Industry Sector</Label>
          <Input placeholder="e.g. Technology, Finance, E-commerce" />
        </TextField>
      </div>

      {/* Client Description / Bio */}
      <div className="w-full">
        <Label className="block mb-2 font-medium text-sm text-gray-700">About Yourself or Company *</Label>
        <TextArea
          name="bio"
          placeholder="Briefly describe what your projects look like or what type of talents you look to hire..."
          className="w-full"
          required
        />
      </div>
    </div>
  );
}