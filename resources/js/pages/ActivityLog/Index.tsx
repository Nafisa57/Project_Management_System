import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";

export default function ActivityLog() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Activity Log</h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Activity List */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="text-gray-500">No activity yet...</div>
        </div>
      </div>
    </div>
  );
}
