import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Tickets", href: "/tickets" },
  { title: "Create Ticket", href: "/tickets/create" },
];

export default function Form() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Ticket" />

      <div className="max-w-xl mx-auto rounded-lg border p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-4">Create Ticket</h1>

        <form className="space-y-4">
          <input type="text" placeholder="Subject" className="w-full rounded border p-2" />
          <select className="w-full rounded border p-2">
            <option>Bug</option>
            <option>Support</option>
            <option>Billing</option>
          </select>
          <select className="w-full rounded border p-2">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
          <select className="w-full rounded border p-2">
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
          <input type="file" className="w-full" />
          <button className="w-full rounded bg-indigo-600 px-4 py-2 text-white">Save</button>
        </form>
      </div>
    </AppLayout>
  );
}
