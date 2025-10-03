import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { title: "Projects", value: 5, color: "bg-indigo-500" },
  { title: "Tasks", value: 23, color: "bg-pink-500" },
  { title: "Tickets", value: 8, color: "bg-purple-500" },
  { title: "Users", value: 12, color: "bg-blue-500" },
];

const dummyUsers = [
  { id: 1, name: "Nafisa", online: true },
  { id: 2, name: "Anas", online: false },
  { id: 3, name: "Aisha", online: true },
  { id: 4, name: "Zara", online: true },
  { id: 5, name: "Omar", online: false },
];

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

      <div className="flex h-full flex-1 flex-col gap-8 p-6 bg-gray-50">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {query && (
              <div className="absolute left-0 top-12 z-10 w-full rounded-lg border border-gray-200 bg-white shadow-md">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <div
                      key={u.id}
                      className="px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      {u.name}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">
                    No results
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main layout: left (stats + chart + projects) + right (friends) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((item) => (
                <div
                  key={item.title}
                  className={`${item.color} text-white rounded-2xl p-5 shadow-md`}
                >
                  <div className="text-sm opacity-90">{item.title}</div>
                  <div className="mt-2 text-2xl font-bold">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Chart + Projects side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Project Status Overview</h3>
                <ResponsiveContainer width="100%" height={180}>
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
                    <Bar dataKey="count" fill="#6366F1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Projects Table */}
              <div className="rounded-2xl bg-white p-6 shadow-md overflow-x-auto">
                <h3 className="text-lg font-semibold mb-4">Projects</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="pb-3">Project</th>
                      <th className="pb-3">Owner</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyProjects.map((p) => (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-3 font-medium">{p.name}</td>
                        <td className="py-3">{p.owner}</td>
                        <td className="py-3">{p.status}</td>
                        <td className="py-3 text-right">{p.tasks_count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Friends Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Team Members</h3>
            <div className="space-y-4">
              {dummyUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                      {u.name[0]}
                    </div>
                    <span className="text-sm font-medium">{u.name}</span>
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full ${u.online ? "bg-green-500" : "bg-gray-400"}`}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
