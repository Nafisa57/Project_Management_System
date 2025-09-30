import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { title: "Projects", value: 5 },
  { title: "Tasks", value: 23 },
  { title: "Tickets", value: 8 },
  { title: "Users", value: 12 },
];

// Dummy users for search demo
const dummyUsers = [
  { id: 1, name: "Nafisa" },
  { id: 2, name: "Anas" },
  { id: 3, name: "Aisha" },
  { id: 4, name: "Zara" },
  { id: 5, name: "Omar" },
];

// Dummy projects for dashboard preview
const dummyProjects = [
  { id: 1, name: 'AI Research', owner: 'Nafisa', status: 'Active', tasks_count: 5 },
  { id: 2, name: 'Website Redesign', owner: 'Anas', status: 'Planning', tasks_count: 8 },
  { id: 3, name: 'Mobile App', owner: 'Aisha', status: 'Active', tasks_count: 4 },
  { id: 4, name: 'Marketing Campaign', owner: 'Zara', status: 'Completed', tasks_count: 10 },
];

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const filteredUsers = dummyUsers.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        {/* Top bar with title + search */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            {query && (
              <div className="absolute left-0 top-12 z-10 w-full rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <div
                      key={u.id}
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {u.name}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No results
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.title}
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart: Project Statuses */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Project Status Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={[
                { status: 'Planning', count: dummyProjects.filter(p => p.status === 'Planning').length },
                { status: 'Active', count: dummyProjects.filter(p => p.status === 'Active').length },
                { status: 'Completed', count: dummyProjects.filter(p => p.status === 'Completed').length },
              ]}
            >
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Projects</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Project</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Owner</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-2 text-right text-sm font-medium">Tasks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dummyProjects.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{p.owner}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{p.status}</td>
                  <td className="px-4 py-3 text-right text-sm">{p.tasks_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
