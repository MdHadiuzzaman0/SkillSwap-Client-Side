"use client";

import { TextField, Label, Input, TextArea } from "@heroui/react";

export default function CreateProfileOfFreelancer({ email, image }) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Input (Read Only) */}
        <TextField isReadOnly name="role" defaultValue="freelancer">
          <Label>Your Role</Label>
          <Input className="bg-gray-50 text-gray-500 cursor-not-allowed" />
        </TextField>

        {/* Image */}
        <TextField isRequired name="image" defaultValue={image}>
          <Label>Image Link</Label>
          <Input placeholder='www.skillswap.jpg' />
        </TextField>
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

        {/* Hourly Rate */}
        <TextField isRequired name="hourlyRate" type="number">
          <Label>Hourly Rate ($) *</Label>
          <Input placeholder="e.g. 25" min="1" />
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