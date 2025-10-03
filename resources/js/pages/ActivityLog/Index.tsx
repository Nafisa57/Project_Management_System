import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { type BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Search } from "lucide-react";



const breadcrumbs: BreadcrumbItem[] = [
  { title: "Activity Log", href: "/activity_log" },
];

const activityLogs = [
  {
    id: 1,
    time: "2025-10-01 4:27 pm",
    action: "Task Created",
    module: "Task",
    user: "Nafisa",
    description: "Created Task #12: Design Dashboard UI",
    status: "success",
    subEvents: [
      { time: "4:28 pm", detail: "Priority set to High" },
      { time: "4:29 pm", detail: "Assigned to Anas" },
    ],
  },
  {
    id: 2,
    time: "2025-10-01 4:35 pm",
    action: "Ticket Updated",
    module: "Ticket",
    user: "Admin",
    description: "Changed status of Ticket #5 → In Progress",
    status: "update",
  },
  {
    id: 3,
    time: "2025-10-01 4:40 pm",
    action: "Project Deleted",
    module: "Project",
    user: "Project Manager",
    description: "Deleted Project #7: Client Onboarding",
    status: "error",
  },
];

export default function ActivityLog() {
  const [search, setSearch] = useState("");

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
     <AppLayout breadcrumbs={breadcrumbs}>
         <Head title="Activity Log" />
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-200 pl-6">
        {filteredLogs.map((log) => (
          <div key={log.id} className="mb-8">
            <div
              className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center ${
                log.status === "success"
                  ? "bg-green-500"
                  : log.status === "update"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }`}
            ></div>
            <p className="text-sm text-gray-500">{log.time}</p>
            <h3 className="font-semibold">{log.action}</h3>
            <p className="text-gray-700">{log.description}</p>
            <p className="text-xs text-gray-400">
              By <span className="font-medium">{log.user}</span> in {log.module}
            </p>

            {/* Sub-events */}
            {log.subEvents && (
              <div className="mt-2 ml-6 border-l border-gray-300 pl-4 space-y-1">
                {log.subEvents.map((sub, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {sub.time} – {sub.detail}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
     </AppLayout>
  );
}
