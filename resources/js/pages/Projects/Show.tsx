// // resources/js/Pages/Projects/Show.tsx
// import React, { useState } from "react";
// import AppLayout from "@/layouts/app-layout";
// import { Head, Link, usePage } from "@inertiajs/react";
// import { type BreadcrumbItem } from "@/types";

// const breadcrumbsBase: BreadcrumbItem[] = [
//   { title: "Projects", href: "/projects" },
// ];

// const dummyProject = {
//   id: 1,
//   name: "AI Research",
//   owner: "Nafisa",
//   status: "Active",
//   start_date: "2025-09-01",
//   end_date: "2025-12-01",
// };

// const dummyUsers = ["Nafisa", "Anas", "Aisha", "Khalid"];

// const dummyTasks = [
//   {
//     id: 1,
//     title: "Design mockups",
//     assigned: "Aisha",
//     status: "in_progress",
//     priority: "High",
//     due_date: "2025-09-10",
//   },
//   {
//     id: 2,
//     title: "Research dataset",
//     assigned: "Nafisa",
//     status: "todo",
//     priority: "Medium",
//     due_date: "2025-09-20",
//   },
// ];

// export default function Show() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const page: any = usePage();
//   const project = page.props.project ?? dummyProject;
//   const initialTasks = page.props.tasks ?? dummyTasks;

//   const [tasks, setTasks] = useState(initialTasks);
//   const [q, setQ] = useState("");
//   const [newTaskTitle, setNewTaskTitle] = useState("");
//   const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
//   const [comments, setComments] = useState<{ [key: number]: string[] }>({});
//   const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

//   const filtered = tasks.filter(
//     (t: any) =>
//       t.title.toLowerCase().includes(q.toLowerCase()) ||
//       (t.assigned ?? "").toLowerCase().includes(q.toLowerCase())
//   );

//   function addTask(e: React.FormEvent) {
//     e.preventDefault();
//     if (!newTaskTitle.trim()) return;
//     const nt = {
//       id: Date.now(),
//       title: newTaskTitle,
//       assigned: "Unassigned",
//       status: "todo",
//       priority: "Medium",
//       due_date: "",
//     };
//     setTasks([nt, ...tasks]);
//     setNewTaskTitle("");
//   }

//   function removeTask(id: number) {
//     if (!confirm("Delete task?")) return;
//     setTasks(tasks.filter((t) => t.id !== id));
//   }

//   function updateStatus(taskId: number, newStatus: string) {
//     setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
//     setEditingStatusId(null);
//   }

//   function updateAssignee(taskId: number, newUser: string) {
//     setTasks(tasks.map((t) => (t.id === taskId ? { ...t, assigned: newUser } : t)));
//   }

//   function addComment(taskId: number) {
//     const comment = newComment[taskId]?.trim();
//     if (!comment) return;
//     setComments({
//       ...comments,
//       [taskId]: [...(comments[taskId] || []), comment],
//     });
//     setNewComment({ ...newComment, [taskId]: "" });
//   }

//   return (
//     <AppLayout breadcrumbs={[...breadcrumbsBase, { title: project.name, href: `/projects/${project.id}` }]}>
//       <Head title={project.name} />

//       <div className="flex h-full flex-1 flex-col gap-6 p-4">
//         <header className="flex items-start justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">{project.name}</h1>
//             <p className="text-sm text-gray-600">
//               Owner: {project.owner} · Status: {project.status}
//             </p>
//             <p className="text-sm text-gray-500">
//               Dates: {project.start_date} → {project.end_date}
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <Link href="/projects" className="rounded border px-3 py-2 text-sm">
//               Back
//             </Link>
//             <Link
//               href={`/projects/${project.id}/edit`}
//               className="rounded bg-yellow-500 px-3 py-2 text-sm text-white"
//             >
//               Edit Project
//             </Link>
//           </div>
//         </header>

//         <div className="grid gap-4 md:grid-cols-3">
//           {/* left: tasks */}
//           <div className="md:col-span-2 rounded-xl border p-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold">Tasks</h3>
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 placeholder="Search tasks..."
//                 className="w-48 rounded border px-3 py-2 text-sm"
//               />
//             </div>

//             <div className="mt-4">
//               <form onSubmit={addTask} className="flex gap-2">
//                 <input
//                   value={newTaskTitle}
//                   onChange={(e) => setNewTaskTitle(e.target.value)}
//                   placeholder="New task title"
//                   className="flex-1 rounded border px-3 py-2"
//                 />
//                 <button className="rounded bg-indigo-600 px-4 py-2 text-white">Add New Task</button>
//               </form>

//               <div className="mt-4 space-y-4">
//                 {filtered.map((t: any) => (
//                   <div key={t.id} className="rounded-lg border p-3">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-medium">{t.title}</p>
//                         <div className="text-sm text-gray-600">
//                           <span>Status: </span>
//                           {editingStatusId === t.id ? (
//                             <select
//                               value={t.status}
//                               onChange={(e) => updateStatus(t.id, e.target.value)}
//                               onBlur={() => setEditingStatusId(null)}
//                               className="rounded border px-2 py-1 text-sm"
//                               autoFocus
//                             >
//                               <option value="todo">To Do</option>
//                               <option value="in_progress">In Progress</option>
//                               <option value="completed">Completed</option>
//                             </select>
//                           ) : (
//                             <span
//                               onClick={() => setEditingStatusId(t.id)}
//                               className="cursor-pointer rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
//                             >
//                               {t.status.replace("_", " ")}
//                             </span>
//                           )}
//                         </div>
//                         <div className="text-sm">
//                           <span>Assigned: </span>
//                           <select
//                             value={t.assigned}
//                             onChange={(e) => updateAssignee(t.id, e.target.value)}
//                             className="rounded border px-2 py-1 text-sm"
//                           >
//                             <option>Unassigned</option>
//                             {dummyUsers.map((u) => (
//                               <option key={u}>{u}</option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>

//                       <div className="flex gap-2">
//                         <Link
//                           href={`/tasks/${t.id}`}
//                           className="rounded bg-blue-500 px-3 py-1 text-white text-xs"
//                         >
//                           Show Subtask
//                         </Link>
//                         <button
//                           onClick={() => removeTask(t.id)}
//                           className="rounded bg-red-500 px-3 py-1 text-white text-xs"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>

//                     {/* Comments */}
//                     <div className="mt-3 border-t pt-2">
//                       <h4 className="text-sm font-semibold text-gray-700 mb-1">
//                         Comments
//                       </h4>
//                       <div className="space-y-2 max-h-20 overflow-y-auto">
//                         {comments[t.id]?.length ? (
//                           comments[t.id].map((c, i) => (
//                             <div
//                               key={i}
//                               className="rounded bg-gray-50 px-2 py-1 text-sm border"
//                             >
//                               {c}
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-xs text-gray-400">No comments yet</p>
//                         )}
//                       </div>
//                       <div className="flex mt-2 gap-2">
//                         <input
//                           type="text"
//                           placeholder="Write comment..."
//                           value={newComment[t.id] || ""}
//                           onChange={(e) =>
//                             setNewComment({ ...newComment, [t.id]: e.target.value })
//                           }
//                           className="flex-1 rounded border px-2 py-1 text-sm"
//                         />
//                         <button
//                           onClick={() => addComment(t.id)}
//                           className="rounded bg-indigo-500 px-3 py-1 text-white text-xs"
//                         >
//                           Add
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {filtered.length === 0 && (
//                   <p className="text-center text-sm text-gray-500 py-4">
//                     No tasks found
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* right: project summary */}
//           <aside className="rounded-xl border p-4">
//             <h3 className="font-semibold">Project Summary</h3>
//             <ul className="mt-3 space-y-2 text-sm text-gray-700">
//               <li>
//                 <strong>Owner:</strong> {project.owner}
//               </li>
//               <li>
//                 <strong>Status:</strong> {project.status}
//               </li>
//               <li>
//                 <strong>Start:</strong> {project.start_date}
//               </li>
//               <li>
//                 <strong>End:</strong> {project.end_date}
//               </li>
//               <li>
//                 <strong>Tasks:</strong> {tasks.length}
//               </li>
//             </ul>
//           </aside>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }


// resources/js/Pages/Projects/Show.tsx
import React, { useState, DragEvent, ChangeEvent } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

const breadcrumbsBase: BreadcrumbItem[] = [
  { title: "Projects", href: "/projects" },
];

const dummyProject = {
  id: 1,
  name: "AI Research",
  owner: "Nafisa",
  status: "Active",
  start_date: "2025-09-01",
  end_date: "2025-12-01",
};

const dummyUsers = ["Nafisa", "Anas", "Aisha", "Khalid"];

const dummyTasks = [
  {
    id: 1,
    title: "Design mockups",
    assigned: "Aisha",
    status: "in_progress",
    priority: "High",
    due_date: "2025-09-10",
  },
  {
    id: 2,
    title: "Research dataset",
    assigned: "Nafisa",
    status: "todo",
    priority: "Medium",
    due_date: "2025-09-20",
  },
];

export default function Show() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page: any = usePage();
  const project = page.props.project ?? dummyProject;
  const initialTasks = page.props.tasks ?? dummyTasks;

  const [tasks, setTasks] = useState(initialTasks);
  const [q, setQ] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: File[] }>({});
  const [dragActive, setDragActive] = useState<{ [key: number]: boolean }>({});

  const filtered = tasks.filter(
    (t: any) =>
      t.title.toLowerCase().includes(q.toLowerCase()) ||
      (t.assigned ?? "").toLowerCase().includes(q.toLowerCase())
  );

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const nt = {
      id: Date.now(),
      title: newTaskTitle,
      assigned: "Unassigned",
      status: "todo",
      priority: "Medium",
      due_date: "",
    };
    setTasks([nt, ...tasks]);
    setNewTaskTitle("");
  }

  function removeTask(id: number) {
    if (!confirm("Delete task?")) return;
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function updateStatus(taskId: number, newStatus: string) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    setEditingStatusId(null);
  }

  function updateAssignee(taskId: number, newUser: string) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, assigned: newUser } : t)));
  }

  function addComment(taskId: number) {
    const comment = newComment[taskId]?.trim();
    if (!comment) return;
    setComments({
      ...comments,
      [taskId]: [...(comments[taskId] || []), comment],
    });
    setNewComment({ ...newComment, [taskId]: "" });
  }

  // Handle drag & drop events
  const handleDragOver = (e: DragEvent<HTMLDivElement>, taskId: number) => {
    e.preventDefault();
    setDragActive({ ...dragActive, [taskId]: true });
  };

  const handleDragLeave = (taskId: number) => {
    setDragActive({ ...dragActive, [taskId]: false });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, taskId: number) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles({
      ...uploadedFiles,
      [taskId]: [...(uploadedFiles[taskId] || []), ...files],
    });
    setDragActive({ ...dragActive, [taskId]: false });
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>, taskId: number) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setUploadedFiles({
      ...uploadedFiles,
      [taskId]: [...(uploadedFiles[taskId] || []), ...files],
    });
  };

  return (
    <AppLayout breadcrumbs={[...breadcrumbsBase, { title: project.name, href: `/projects/${project.id}` }]}>
      <Head title={project.name} />

      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-sm text-gray-600">
              Owner: {project.owner} · Status: {project.status}
            </p>
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
                <button className="rounded bg-indigo-600 px-4 py-2 text-white">Add New Task</button>
              </form>

              <div className="mt-4 space-y-4">
                {filtered.map((t: any) => (
                  <div key={t.id} className="rounded-lg border p-3 shadow-sm bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{t.title}</p>
                        <div className="text-sm text-gray-600">
                          <span>Status: </span>
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
                              {t.status.replace("_", " ")}
                            </span>
                          )}
                        </div>
                        <div className="text-sm mt-1">
                          <span>Assigned: </span>
                          <select
                            value={t.assigned}
                            onChange={(e) => updateAssignee(t.id, e.target.value)}
                            className="rounded border px-2 py-1 text-sm"
                          >
                            <option>Unassigned</option>
                            {dummyUsers.map((u) => (
                              <option key={u}>{u}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/tasks/${t.id}`}
                          className="rounded bg-blue-500 px-3 py-1 text-white text-xs"
                        >
                          Show Subtask
                        </Link>
                        <button
                          onClick={() => removeTask(t.id)}
                          className="rounded bg-red-500 px-3 py-1 text-white text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* 🔽 Drag & Drop Upload Section 🔽 */}
                    <div
                      className={`mt-4 p-4 border-2 border-dashed rounded-xl text-center transition-all ${
                        dragActive[t.id] ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                      }`}
                      onDragOver={(e) => handleDragOver(e, t.id)}
                      onDragLeave={() => handleDragLeave(t.id)}
                      onDrop={(e) => handleDrop(e, t.id)}
                      onClick={() => document.getElementById(`fileInput-${t.id}`)?.click()}
                    >
                      <input
                        id={`fileInput-${t.id}`}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, t.id)}
                      />
                      <p className="text-sm text-gray-500 italic">
                         Drag & Drop files here <br />
                        or click to browse
                      </p>
                    </div>

                    {/* Uploaded file list */}
                    {uploadedFiles[t.id]?.length ? (
                      <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                        {uploadedFiles[t.id].map((f, i) => (
                          <li key={i}>{f.name}</li>
                        ))}
                      </ul>
                    ) : null}

                    {/* Comments */}
                    <div className="mt-4 border-t pt-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Comments</h4>
                      <div className="space-y-2 max-h-20 overflow-y-auto">
                        {comments[t.id]?.length ? (
                          comments[t.id].map((c, i) => (
                            <div
                              key={i}
                              className="rounded bg-gray-50 px-2 py-1 text-sm border"
                            >
                              {c}
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-400">No comments yet</p>
                        )}
                      </div>
                      <div className="flex mt-2 gap-2">
                        <input
                          type="text"
                          placeholder="Write comment..."
                          value={newComment[t.id] || ""}
                          onChange={(e) =>
                            setNewComment({ ...newComment, [t.id]: e.target.value })
                          }
                          className="flex-1 rounded border px-2 py-1 text-sm"
                        />
                        <button
                          onClick={() => addComment(t.id)}
                          className="rounded bg-indigo-500 px-3 py-1 text-white text-xs"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <p className="text-center text-sm text-gray-500 py-4">No tasks found</p>
                )}
              </div>
            </div>
          </div>

          {/* right: project summary */}
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
