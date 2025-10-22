// resources/js/Pages/Users/Show.tsx
import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

interface Project {
  id: number;
  name: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  projects: Project[];
}

const breadcrumbsBase: BreadcrumbItem[] = [
  { title: "Users", href: "/users" },
];

// Dummy users array
const dummyUsers: User[] = [
  {
    id: 1,
    name: "Nafisa",
    email: "nafisa@example.com",
    role: "Admin",
    projects: [
      { id: 1, name: "AI Research", status: "In Progress" },
      { id: 2, name: "Website Redesign", status: "Completed" },
    ],
  },
  {
    id: 2,
    name: "Anas",
    email: "anas@example.com",
    role: "Manager",
    projects: [
      { id: 3, name: "Mobile App", status: "In Progress" },
    ],
  },
  {
    id: 3,
    name: "Aisha",
    email: "aisha@example.com",
    role: "Client",
    projects: [],
  },
  {
    id: 4,
    name: "Zara",
    email: "zara@example.com",
    role: "Support",
    projects: [
      { id: 4, name: "Ticketing System", status: "Completed" },
      { id: 5, name: "Bug Fixes", status: "In Progress" },
    ],
  },
];

export default function Show() {
  const [showProjects, setShowProjects] = useState(true);

  // Get userId from URL using Inertia props
  const { userId } = usePage<{ userId: string }>().props;
  const user = dummyUsers.find(u => u.id === Number(userId)) || dummyUsers[0];

  return (
    <AppLayout breadcrumbs={[...breadcrumbsBase, { title: user.name, href: `/users/${user.id}` }]}>
      <Head title={user.name} />

      <div className="flex flex-col gap-6 p-4">
        {/* Top header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{user.name}'s Profile</h1>
          <Link
            href="/users"
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Back to Users
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: profile card */}
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center gap-4">
              {/* Profile avatar */}
              <div className="h-24 w-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold">
                {user.name[0]}
              </div>

              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <p className="text-sm font-medium mt-1">Role: {user.role}</p>

              {/* Projects summary */}
              <div className="mt-4 w-full rounded-lg border p-4 text-center bg-gray-50 dark:bg-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">Projects</p>
                <p className="text-2xl font-bold mt-1">{user.projects.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.projects.length > 0 ? "Active Projects" : "No projects yet"}
                </p>
              </div>
            </div>
          </div>

          {/* Right: projects list */}
          <div className="md:col-span-2 rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              <button
                className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                onClick={() => setShowProjects(!showProjects)}
              >
                {showProjects ? "Hide" : "Show"}
              </button>
            </div>

            {showProjects && (
              <div className="space-y-3">
                {user.projects.length > 0 ? (
                  user.projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between rounded-lg border px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Status: {project.status}
                        </p>
                      </div>
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-indigo-600 text-sm hover:underline dark:text-indigo-400"
                      >
                        View
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No projects assigned.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
