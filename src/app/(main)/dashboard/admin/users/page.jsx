import React from "react";
import { Table } from "@heroui/react";
import { getAllData } from "@/lib/data";
import { authClient } from '@/lib/auth-client';
import AdminUsers from "@/components/AdminUsers"; // New client component

export default async function AdminUsersPage() {
  const { data: tokenData } = await authClient.token();
  const token = tokenData?.token;
  const data = await getAllData(); // Remove token param
  const users = data?.users || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-950">Manage Users</h1>
        <p className="text-gray-500 text-xs mt-1">Block or unblock users.</p>
      </div>
      <AdminUsers initialUsers={users} />
    </div>
  );
}