// resources/js/Pages/Projects/Show.tsx
import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbsBase: BreadcrumbItem[] = [
  { title: 'Projects', href: '/projects' },
];

const dummyProject = {
  id: 1,
  name: 'AI Research',
  owner: 'Nafisa',
  status: 'Active',
  start_date: '2025-09-01',
  end_date: '2025-12-01',
};

const dummyTasks = [
  { id: 1, title: 'Design mockups', assigned: 'Aisha', status: 'in_progress', priority: 'High', due_date: '2025-09-10' },
  { id: 2, title: 'Research dataset', assigned: 'Nafisa', status: 'todo', priority: 'Medium', due_date: '2025-09-20' },
];

export default function Show() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page: any = usePage();
  const project = page.props.project ?? dummyProject;
  const initialTasks = page.props.tasks ?? dummyTasks;

  const [tasks, setTasks] = useState(initialTasks);
  const [q, setQ] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);

  const filtered = tasks.filter(
    (t: any) =>
      t.title.toLowerCase().includes(q.toLowerCase()) ||
      (t.assigned ?? '').toLowerCase().includes(q.toLowerCase())
  );

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const nt = {
      id: Date.now(),
      title: newTaskTitle,
      assigned: 'Unassigned',
      status: 'todo',
      priority: 'Medium',
      due_date: '',
    };
    setTasks([nt, ...tasks]);
    setNewTaskTitle('');
  }

  function removeTask(id: number) {
    if (!confirm('Delete task?')) return;
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function updateStatus(taskId: number, newStatus: string) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    setEditingStatusId(null);
  }

  return (
    <AppLayout breadcrumbs={[...breadcrumbsBase, { title: project.name, href: `/projects/${project.id}` }]}>
      <Head title={project.name} />

      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-sm text-gray-600">Owner: {project.owner} · Status: {project.status}</p>
            <p className="text-sm text-gray-500">
              Dates: {project.start_date} → {project.end_date}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/projects" className="rounded border px-3 py-2 text-sm">
              Back
            </Link>
            <Link
              href={`/projects/${project.id}/edit`}
              className="rounded bg-yellow-500 px-3 py-2 text-sm text-white"
            >
              Edit Project
            </Link>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {/* left: tasks */}
          <div className="md:col-span-2 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tasks..."
                className="w-48 rounded border px-3 py-2 text-sm"
              />
            </div>

            <div className="mt-4">
              <form onSubmit={addTask} className="flex gap-2">
                <input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="New task title"
                  className="flex-1 rounded border px-3 py-2"
                />
                <button className="rounded bg-indigo-600 px-4 py-2 text-white">Add</button>
              </form>

              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm">Title</th>
                      <th className="px-4 py-2 text-left text-sm">Assigned</th>
                      <th className="px-4 py-2 text-left text-sm">Status</th>
                      <th className="px-4 py-2 text-left text-sm">Due</th>
                      <th className="px-4 py-2 text-right text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((t: any) => (
                      <tr key={t.id}>
                        <td className="px-4 py-3 text-sm font-medium">{t.title}</td>
                        <td className="px-4 py-3 text-sm">{t.assigned}</td>
                        <td className="px-4 py-3 text-sm">
                          {editingStatusId === t.id ? (
                            <select
                              value={t.status}
                              onChange={(e) => updateStatus(t.id, e.target.value)}
                              onBlur={() => setEditingStatusId(null)}
                              className="rounded border px-2 py-1 text-sm"
                              autoFocus
                            >
                              <option value="todo">To Do</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          ) : (
                            <span
                              onClick={() => setEditingStatusId(t.id)}
                              className="cursor-pointer rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
                            >
                              {t.status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">{t.due_date || '-'}</td>
                        <td className="px-4 py-3 text-right text-sm">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/tasks/${t.id}`}
                              className="rounded bg-blue-500 px-3 py-1 text-white text-xs"
                            >
                              Show
                            </Link>
                            <Link
                              href={`/projects/${project.id}/tasks/${t.id}/edit`}
                              className="rounded bg-yellow-500 px-3 py-1 text-white text-xs"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => removeTask(t.id)}
                              className="rounded bg-red-500 px-3 py-1 text-white text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                          No tasks found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* right: project summary / quick stats */}
          <aside className="rounded-xl border p-4">
            <h3 className="font-semibold">Project Summary</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                <strong>Owner:</strong> {project.owner}
              </li>
              <li>
                <strong>Status:</strong> {project.status}
              </li>
              <li>
                <strong>Start:</strong> {project.start_date}
              </li>
              <li>
                <strong>End:</strong> {project.end_date}
              </li>
              <li>
                <strong>Tasks:</strong> {tasks.length}
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
