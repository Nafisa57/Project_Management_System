import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Users",
    href: "/users",
  },
];

// dummy user data for now
const dummyUsers = [
  { id: 1, name: "Nafisa", email: "nafisa@example.com", role: "Admin" },
  { id: 2, name: "Anas", email: "anas@example.com", role: "Manager" },
  { id: 3, name: "Aisha", email: "aisha@example.com", role: "Client" },
  { id: 4, name: "Zara", email: "zara@example.com", role: "Support" },
];

export default function Index() {
  const [query, setQuery] = useState("");

  const filteredUsers = dummyUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      u.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        {/* Top bar with search */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Role
                </th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {user.role}
                  </td>
                  <td className="px-4 py-2 text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/users/${user.id}`}
                        className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                      >
                        Show
                      </Link>
                      <Link
                        href={`/users/${user.id}/edit`}
                        className="rounded-md bg-yellow-500 px-3 py-1 text-xs text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => alert(`Delete user ${user.id}`)}
                        className="rounded-md bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
