'use client';
import React, { useState } from "react";
import { Table } from "@heroui/react";
import { toggleUserBlockStatus } from "@/lib/action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const router = useRouter();

  const handleBlockToggle = async (userId, currentStatus) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const success = await toggleUserBlockStatus(userId, currentStatus, token);
    if (success) {
      toast.success("Updated!");
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === userId ? { ...u, isBlocked: !currentStatus } : u))
      );
      router.refresh();
    } else {
      toast.error("Failed!");
    }
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Users">
          <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Action</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.name || "N/A"}</Table.Cell>
                <Table.Cell>{user.role || "user"}</Table.Cell>
                <Table.Cell>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    user.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                    className={`text-xs px-3 py-1 rounded ${
                      user.isBlocked ? "bg-gray-900 text-white" : "bg-red-500 text-white"
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
  );
}