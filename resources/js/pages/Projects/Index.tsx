// resources/js/Pages/Projects/Index.tsx
import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Projects', href: '/projects' },
];

const dummyProjects = [
  { id: 1, name: 'AI Research', owner: 'Nafisa', status: 'Active', start_date: '2025-09-01', end_date: '2025-12-01', tasks_count: 5 },
  { id: 2, name: 'Website Redesign', owner: 'Anas', status: 'Planning', start_date: '2025-08-10', end_date: '2025-10-15', tasks_count: 8 },
];

export default function Index() {
  const page: any = usePage();
  const initialProjects = page.props.projects ?? dummyProjects;

  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    owner: '',
    status: 'Planning',
    start_date: '',
    end_date: '',
  });

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.owner?.toLowerCase().includes(query.toLowerCase()) ||
    (p.status ?? '').toLowerCase().includes(query.toLowerCase())
  );

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const newProject = { id: Date.now(), ...form, tasks_count: 0 };
    setProjects([newProject, ...projects]);
    setIsCreating(false);
    setForm({ name: '', owner: '', status: 'Planning', start_date: '', end_date: '' });
  }

  function handleDelete(id: number) {
    if (!confirm('Delete this project?')) return;
    setProjects(projects.filter((p) => p.id !== id));
  }

  function handleQuickEdit(id: number) {
    const name = prompt('Set new project name:');
    if (!name) return;
    setProjects(projects.map((p) => (p.id === id ? { ...p, name } : p)));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />

      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Projects</h1>

          <div className="flex items-center gap-3">
            <label htmlFor="search" className="sr-only">Search Projects</label>
            <input
              id="search"
              type="text"
              placeholder="Search projects..."
              aria-label="Search Projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-72 rounded-lg border px-3 py-2 text-sm"
            />
            <button
              onClick={() => setIsCreating(true)}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
            >
              + New Project
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Project</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Owner</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Dates</th>
                <th className="px-4 py-2 text-right text-sm font-medium">Tasks</th>
                <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p: any) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{p.owner}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{p.status}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{p.start_date} → {p.end_date}</td>
                  <td className="px-4 py-3 text-sm text-right">{p.tasks_count}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <Link href={`/projects/${p.id}`} className="rounded bg-blue-500 px-3 py-1 text-white text-xs">Show</Link>
                      <button onClick={() => handleQuickEdit(p.id)} className="rounded bg-yellow-500 px-3 py-1 text-white text-xs">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="rounded bg-red-500 px-3 py-1 text-white text-xs">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Project Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={handleCreate} className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Create Project</h3>

            <div className="mb-2">
              <label htmlFor="projectName" className="block text-sm">Name</label>
              <input
                id="projectName"
                aria-label="Project Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter project name"
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="projectOwner" className="block text-sm">Owner</label>
              <input
                id="projectOwner"
                aria-label="Project Owner"
                required
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                placeholder="Enter owner name"
                className="w-full rounded border px-3 py-2"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="projectStatus" className="block text-sm">Status</label>
              <select
                id="projectStatus"
                aria-label="Project Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded border px-3 py-2"
              >
                <option>Planning</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={() => setIsCreating(false)} className="rounded border px-4 py-2">Cancel</button>
              <button className="rounded bg-indigo-600 px-4 py-2 text-white">Create</button>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  );
}
