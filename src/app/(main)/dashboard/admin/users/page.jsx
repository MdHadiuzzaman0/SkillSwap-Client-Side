'use client';
import React, { useEffect, useState } from "react";
import { Table } from "@heroui/react";
import { getAllData } from "@/lib/data"; // আপনার ফেচ করার ফাংশন
import { toggleUserBlockStatus } from "@/lib/action"; // ব্লক করার অ্যাকশন ফাংশন
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from '@/lib/auth-client';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ডাটা লোড করা
  useEffect(() => {
    async function loadData() {
      const { data: tokenData} = await authClient.token()
      const token = tokenData?.token; 
      const data = await getAllData(token);
      setUsers(data?.users || []);
      setLoading(false);
    }
    loadData();
  }, []);

  // ব্লক/আনব্লক হ্যান্ডলার
  const handleBlockToggle = async (userId, currentStatus) => {
    const { data: tokenData} = await authClient.token()
    const token = tokenData?.token; 
    const success = await toggleUserBlockStatus(userId, currentStatus, token);
    if (success) {
      toast.success("User status updated successfully!");
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, isBlocked: !currentStatus } : u))
      );
      router.refresh();
    } else {
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center font-medium text-gray-500">Loading Users...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-950 tracking-tight">Manage Users</h1>
        <p className="text-gray-500 text-xs mt-1">Block or unblock users and monitor platform roles.</p>
      </div>

      {/* 🎯 @heroui/react টেবিল স্ট্রাকচার (হুবহু মেইনটেইন করা হয়েছে) */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-[600px]">
            <Table.Header>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Action</Table.Column> {/* 🎯 অ্যাকশনের জন্য কলাম বাড়ানো হলো */}
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>{user.name || "N/A"}</Table.Cell>
                  <Table.Cell>
                    <span className="capitalize">{user.role || "user"}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        user.isBlocked
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : "bg-green-50 text-green-700 border border-green-100"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                      className={`text-xs font-bold px-3 py-1 rounded transition-colors ${
                        user.isBlocked
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}