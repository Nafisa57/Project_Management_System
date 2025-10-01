import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Tickets", href: "/tickets" },
];

// Dummy Tickets
const dummyTickets = [
  {
    id: 1,
    subject: "Login Bug",
    category: "Bug",
    client: "Aisha",
    assignee: "Anas",
    priority: "High",
    status: "Open",
  },
  {
    id: 2,
    subject: "Billing Issue",
    category: "Support",
    client: "Zara",
    assignee: "Nafisa",
    priority: "Low",
    status: "In Progress",
  },
];

export default function Index() {
  const [query, setQuery] = useState("");

  const filtered = dummyTickets.filter(
    (t) =>
      t.subject.toLowerCase().includes(query.toLowerCase()) ||
      t.client.toLowerCase().includes(query.toLowerCase()) ||
      t.assignee.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase()) ||
      t.status.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tickets" />

      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search tickets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64 rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <Link
              href="/tickets/create"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              + New Ticket
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Subject", "Category", "Client", "Assignee", "Priority", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-4 py-2 text-left text-sm font-medium text-gray-600">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-2">{t.subject}</td>
                  <td className="px-4 py-2">{t.category}</td>
                  <td className="px-4 py-2">{t.client}</td>
                  <td className="px-4 py-2">{t.assignee}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded px-2 py-1 text-xs ${
                      t.priority === "High" ? "bg-red-100 text-red-700" :
                      t.priority === "Low" ? "bg-green-100 text-green-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`rounded px-2 py-1 text-xs ${
                      t.status === "Open" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/tickets/${t.id}`} className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white">Show</Link>
                      <Link href={`/tickets/${t.id}/edit`} className="rounded-md bg-yellow-500 px-3 py-1 text-xs text-white">Edit</Link>
                      <button className="rounded-md bg-red-500 px-3 py-1 text-xs text-white">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-sm text-gray-500">No tickets found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
