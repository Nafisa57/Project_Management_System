import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Tickets", href: "/tickets" },
  { title: "Ticket #1", href: "/tickets/1" },
];

// Dummy ticket initial data
const ticketData = {
  id: 1,
  subject: "Login Bug",
  category: "Bug",
  client: "Aisha",
  assignee: "Anas",
  priority: "High",
  status: "Open",
  comments: [
    { id: 1, user: "Nafisa", body: "Please check error logs", created_at: "2025-09-29" },
    { id: 2, user: "Anas", body: "Working on fix", created_at: "2025-09-30" },
  ],
  attachments: [{ id: 1, file: "error_screenshot.png" }],
};

// Dummy options
const users = ["Anas", "Nafisa", "Aisha", "Zara"];
const statuses = ["Open", "In Progress", "Resolved", "Closed"];
const priorities = ["Low", "Medium", "High", "Critical"];

export default function Show() {
  const [ticket, setTicket] = useState(ticketData);
  const [newComment, setNewComment] = useState("");

  // Handle dynamic dropdowns
  const updateField = (field: "assignee" | "status" | "priority", value: string) => {
    setTicket((prev) => ({ ...prev, [field]: value }));
  };

  // Handle adding comment
  const addComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: ticket.comments.length + 1,
      user: "You", // assuming logged-in user
      body: newComment,
      created_at: new Date().toISOString().slice(0, 10),
    };
    setTicket((prev) => ({
      ...prev,
      comments: [...prev.comments, newEntry],
    }));
    setNewComment("");
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Ticket ${ticket.id}`} />

      <div className="p-6 space-y-6">
        {/* Ticket Details */}
        <div className="rounded-lg border p-4 shadow-sm">
          <h2 className="text-xl font-bold">{ticket.subject}</h2>
          <p>Category: {ticket.category}</p>
          <p>Client: {ticket.client}</p>

          {/* Dynamic Dropdowns */}
          <div className="mt-3 space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Assignee</label>
              <select
                value={ticket.assignee}
                onChange={(e) => updateField("assignee", e.target.value)}
                className="mt-1 w-full rounded border p-2 text-sm"
              >
                {users.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={ticket.status}
                onChange={(e) => updateField("status", e.target.value)}
                className="mt-1 w-full rounded border p-2 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={ticket.priority}
                onChange={(e) => updateField("priority", e.target.value)}
                className="mt-1 w-full rounded border p-2 text-sm"
              >
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Comments</h3>
          <ul className="space-y-2 mt-2">
            {ticket.comments.map((c) => (
              <li key={c.id} className="rounded bg-gray-100 p-2">
                <p className="text-sm">
                  <strong>{c.user}:</strong> {c.body}
                </p>
                <p className="text-xs text-gray-500">{c.created_at}</p>
              </li>
            ))}
          </ul>

          <textarea
            placeholder="Add comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-3 w-full rounded border p-2 text-sm"
          ></textarea>
          <button
            onClick={addComment}
            className="mt-2 rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
          >
            Add Comment
          </button>
        </div>

        {/* Attachments */}
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="text-lg font-semibold">Attachments</h3>
          <ul className="mt-2 space-y-1">
            {ticket.attachments.map((a) => (
              <li key={a.id}>
                <a href="#" className="text-indigo-600 hover:underline">
                  {a.file}
                </a>
              </li>
            ))}
          </ul>
          <input type="file" className="mt-3" />
          <button className="mt-2 rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700">
            Upload
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
