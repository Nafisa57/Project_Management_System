// import React, { useState } from "react";
// import AppLayout from "@/layouts/app-layout";
// import { Head, Link, usePage } from "@inertiajs/react";
// import { type BreadcrumbItem } from "@/types";

// interface Subtask {
//   id: number;
//   title: string;
//   status: string;
//   assigned: string;
//   due_date?: string;
// }

// interface Task {
//   id: number;
//   title: string;
//   status?: string;
//   assigned?: string;
//   project_id?: number | null;
// }

// const breadcrumbsBase: BreadcrumbItem[] = [
//   { title: "Projects", href: "/projects" },
// ];

// const dummyUsers = ["Nafisa", "Anas", "Aisha", "Zara", "Omar"];

// const dummyTask: Task = {
//   id: 1,
//   title: "Task 1 (dummy)",
//   status: "todo",
//   assigned: "Unassigned",
//   project_id: 1,
// };

// const dummySubtasks: Subtask[] = [
//   { id: 101, title: "Subtask A", status: "todo", assigned: "Nafisa", due_date: "2025-09-05" },
//   { id: 102, title: "Subtask B", status: "in_progress", assigned: "Anas", due_date: "2025-09-12" },
// ];

// export default function Show() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const page: any = usePage();
//   const task: Task = page.props.task ?? dummyTask;
//   const initialSubtasks: Subtask[] = page.props.subtasks ?? dummySubtasks;
//   const projectId: number | null = page.props.projectId ?? (task.project_id ?? null);

//   const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);
//   const [q, setQ] = useState("");
//   const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
//   const [editingStatusId, setEditingStatusId] = useState<number | null>(null);

//   const [comments, setComments] = useState<Record<number, string[]>>({});
//   const [newComment, setNewComment] = useState<Record<number, string>>({});

//   const filtered = subtasks.filter((s) =>
//     s.title.toLowerCase().includes(q.toLowerCase()) || (s.assigned ?? "").toLowerCase().includes(q.toLowerCase())
//   );

//   function addSubtask(e?: React.FormEvent) {
//     e?.preventDefault();
//     const title = newSubtaskTitle.trim();
//     if (!title) return;
//     const newItem: Subtask = {
//       id: Date.now(),
//       title,
//       status: "todo",
//       assigned: "Unassigned",
//     };
//     setSubtasks([newItem, ...subtasks]);
//     setNewSubtaskTitle("");
//   }

//   function deleteSubtask(id: number) {
//     if (!confirm("Delete this subtask?")) return;
//     setSubtasks(subtasks.filter((s) => s.id !== id));
//     const copy = { ...comments };
//     delete copy[id];
//     setComments(copy);
//   }

//   function updateSubtaskStatus(id: number, status: string) {
//     setSubtasks(subtasks.map((s) => (s.id === id ? { ...s, status } : s)));
//     setEditingStatusId(null);
//   }

//   function updateAssignee(id: number, user: string) {
//     setSubtasks(subtasks.map((s) => (s.id === id ? { ...s, assigned: user } : s)));
//   }

//   function addCommentForSubtask(subtaskId: number) {
//     const txt = (newComment[subtaskId] || "").trim();
//     if (!txt) return;
//     setComments({
//       ...comments,
//       [subtaskId]: [...(comments[subtaskId] || []), txt],
//     });
//     setNewComment({ ...newComment, [subtaskId]: "" });
//   }

//   return (
//     <AppLayout breadcrumbs={[...breadcrumbsBase, { title: task.title, href: `/tasks/${task.id}` }]}>
//       <Head title={task.title} />

//       <div className="flex h-full flex-1 flex-col gap-6 p-6">
//         <header className="flex items-start justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-black">{task.title}</h1>
//             <p className="text-sm text-gray-600 mt-1">
//               Status: {task.status ?? "-"} · Assigned: {task.assigned ?? "-"}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               {projectId ? (
//                 <Link href={`/projects/${projectId}`} className="text-sm text-indigo-600 hover:underline">Back to Task</Link>
//               ) : (
//                 <Link href="/projects" className="text-sm text-indigo-600 hover:underline">Back to projects</Link>
//               )}
//             </p>
//           </div>
//         </header>

//         {/* Main card with purple shadow */}
//         <div className="rounded-xl border p-5 bg-white shadow-lg shadow-purple-300/50">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-black">Subtasks</h3>
//             <div className="flex items-center gap-2">
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 placeholder="Search subtasks..."
//                 className="w-48 rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//               <form onSubmit={(e) => { e.preventDefault(); addSubtask(); }} className="flex items-center gap-2">
//                 <input
//                   value={newSubtaskTitle}
//                   onChange={(e) => setNewSubtaskTitle(e.target.value)}
//                   placeholder="New subtask title"
//                   className="rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 />
//                 <button type="submit" className="rounded bg-purple-600 hover:bg-purple-700 px-4 py-2 text-sm text-white shadow-md shadow-purple-400/60 transition">
//                   Add
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="space-y-4">
//             {filtered.map((s) => (
//               <div key={s.id} className="rounded-xl border p-4 bg-white shadow-md shadow-purple-200/60 hover:shadow-purple-400/40 transition">
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-black">{s.title}</p>

//                     <div className="mt-2 text-sm text-gray-700 flex items-center gap-3 flex-wrap">
//                       <div>
//                         <strong className="mr-1">Status:</strong>
//                         {editingStatusId === s.id ? (
//                           <select
//                             value={s.status}
//                             onChange={(e) => updateSubtaskStatus(s.id, e.target.value)}
//                             onBlur={() => setEditingStatusId(null)}
//                             autoFocus
//                             className="rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
//                           >
//                             <option value="todo">To Do</option>
//                             <option value="in_progress">In Progress</option>
//                             <option value="completed">Completed</option>
//                           </select>
//                         ) : (
//                           <span
//                             onClick={() => setEditingStatusId(s.id)}
//                             className="cursor-pointer rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
//                           >
//                             {s.status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
//                           </span>
//                         )}
//                       </div>

//                       <div>
//                         <strong className="mr-1">Assigned:</strong>
//                         <select
//                           value={s.assigned}
//                           onChange={(e) => updateAssignee(s.id, e.target.value)}
//                           className="rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
//                         >
//                           <option>Unassigned</option>
//                           {dummyUsers.map((u) => (
//                             <option key={u}>{u}</option>
//                           ))}
//                         </select>
//                       </div>

//                       {s.due_date && (
//                         <div>
//                           <strong className="mr-1">Due:</strong>
//                           <span className="text-sm">{s.due_date}</span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="mt-3">
//                       <div className="text-sm font-semibold text-black mb-1">Comments</div>
//                       <div className="space-y-2 max-h-36 overflow-y-auto">
//                         {comments[s.id]?.length ? (
//                           comments[s.id].map((c, i) => (
//                             <div key={i} className="rounded bg-gray-50 px-3 py-2 text-sm border shadow-sm shadow-purple-100">
//                               {c}
//                             </div>
//                           ))
//                         ) : (
//                           <div className="text-xs text-gray-400">No comments yet</div>
//                         )}
//                       </div>

//                       <div className="mt-2">
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="text"
//                             placeholder="Write a comment..."
//                             value={newComment[s.id] || ""}
//                             onChange={(e) => setNewComment({ ...newComment, [s.id]: e.target.value })}
//                             className="min-w-0 flex-1 rounded border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-400"
//                           />
//                           <button
//                             onClick={() => addCommentForSubtask(s.id)}
//                             className="shrink-0 rounded bg-purple-600 hover:bg-purple-700 px-3 py-2 text-sm text-white shadow-md shadow-purple-400/60 transition"
//                           >
//                             Add
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-shrink-0 flex flex-col items-end gap-2">
//                     <button onClick={() => deleteSubtask(s.id)} className="rounded bg-red-500 hover:bg-red-600 px-3 py-1 text-white text-xs shadow-md shadow-red-300/50 transition">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {filtered.length === 0 && (
//               <div className="text-center py-6 text-gray-500">No subtasks found</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }


import React, { useState, useRef } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

interface Subtask {
  id: number;
  title: string;
  status: string;
  assigned: string;
  due_date?: string;
}

interface Task {
  id: number;
  title: string;
  status?: string;
  assigned?: string;
  project_id?: number | null;
}

const breadcrumbsBase: BreadcrumbItem[] = [
  { title: "Projects", href: "/projects" },
];

const dummyUsers = ["Nafisa", "Anas", "Aisha", "Zara", "Omar"];

const dummyTask: Task = {
  id: 1,
  title: "Task 1 (dummy)",
  status: "todo",
  assigned: "Unassigned",
  project_id: 1,
};

const dummySubtasks: Subtask[] = [
  { id: 101, title: "Subtask A", status: "todo", assigned: "Nafisa", due_date: "2025-09-05" },
  { id: 102, title: "Subtask B", status: "in_progress", assigned: "Anas", due_date: "2025-09-12" },
];

export default function Show() {
  const page: any = usePage();
  const task: Task = page.props.task ?? dummyTask;
  const initialSubtasks: Subtask[] = page.props.subtasks ?? dummySubtasks;
  const projectId: number | null = page.props.projectId ?? (task.project_id ?? null);

  const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);
  const [q, setQ] = useState("");
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);

  const [comments, setComments] = useState<Record<number, string[]>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, File[]>>({});

  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const filtered = subtasks.filter((s) =>
    s.title.toLowerCase().includes(q.toLowerCase()) ||
    (s.assigned ?? "").toLowerCase().includes(q.toLowerCase())
  );

  function addSubtask(e?: React.FormEvent) {
    e?.preventDefault();
    const title = newSubtaskTitle.trim();
    if (!title) return;
    const newItem: Subtask = {
      id: Date.now(),
      title,
      status: "todo",
      assigned: "Unassigned",
    };
    setSubtasks([newItem, ...subtasks]);
    setNewSubtaskTitle("");
  }

  function deleteSubtask(id: number) {
    if (!confirm("Delete this subtask?")) return;
    setSubtasks(subtasks.filter((s) => s.id !== id));
    const copy = { ...comments };
    delete copy[id];
    setComments(copy);
  }

  function updateSubtaskStatus(id: number, status: string) {
    setSubtasks(subtasks.map((s) => (s.id === id ? { ...s, status } : s)));
    setEditingStatusId(null);
  }

  function updateAssignee(id: number, user: string) {
    setSubtasks(subtasks.map((s) => (s.id === id ? { ...s, assigned: user } : s)));
  }

  function addCommentForSubtask(subtaskId: number) {
    const txt = (newComment[subtaskId] || "").trim();
    if (!txt) return;
    setComments({
      ...comments,
      [subtaskId]: [...(comments[subtaskId] || []), txt],
    });
    setNewComment({ ...newComment, [subtaskId]: "" });
  }

  function handleFileSelect(subtaskId: number, files: FileList | null) {
    if (!files) return;
    const fileArr = Array.from(files);
    setUploadedFiles({
      ...uploadedFiles,
      [subtaskId]: [...(uploadedFiles[subtaskId] || []), ...fileArr],
    });
  }

  function handleDrop(subtaskId: number, e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    handleFileSelect(subtaskId, e.dataTransfer.files);
  }

  function handleClickUpload(subtaskId: number) {
    fileInputRefs.current[subtaskId]?.click();
  }

  return (
    <AppLayout breadcrumbs={[...breadcrumbsBase, { title: task.title, href: `/tasks/${task.id}` }]}>
      <Head title={task.title} />

      <div className="flex h-full flex-1 flex-col gap-6 p-6">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">{task.title}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Status: {task.status ?? "-"} · Assigned: {task.assigned ?? "-"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {projectId ? (
                <Link href={`/projects/${projectId}`} className="text-sm text-indigo-600 hover:underline">
                  Back to Task
                </Link>
              ) : (
                <Link href="/projects" className="text-sm text-indigo-600 hover:underline">
                  Back to projects
                </Link>
              )}
            </p>
          </div>
        </header>

        {/* Main card */}
        <div className="rounded-xl border p-5 bg-white shadow-lg shadow-purple-300/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Subtasks</h3>
            <div className="flex items-center gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search subtasks..."
                className="w-48 rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <form onSubmit={(e) => { e.preventDefault(); addSubtask(); }} className="flex items-center gap-2">
                <input
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  placeholder="New subtask title"
                  className="rounded border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="rounded bg-purple-600 hover:bg-purple-700 px-4 py-2 text-sm text-white shadow-md shadow-purple-400/60 transition"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((s) => (
              <div key={s.id} className="rounded-xl border p-4 bg-white shadow-md shadow-purple-200/60 hover:shadow-purple-400/40 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-black">{s.title}</p>

                    <div className="mt-2 text-sm text-gray-700 flex items-center gap-3 flex-wrap">
                      <div>
                        <strong className="mr-1">Status:</strong>
                        {editingStatusId === s.id ? (
                          <select
                            value={s.status}
                            onChange={(e) => updateSubtaskStatus(s.id, e.target.value)}
                            onBlur={() => setEditingStatusId(null)}
                            autoFocus
                            className="rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
                          >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        ) : (
                          <span
                            onClick={() => setEditingStatusId(s.id)}
                            className="cursor-pointer rounded px-2 py-1 bg-gray-200 hover:bg-gray-300"
                          >
                            {s.status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                        )}
                      </div>

                      <div>
                        <strong className="mr-1">Assigned:</strong>
                        <select
                          value={s.assigned}
                          onChange={(e) => updateAssignee(s.id, e.target.value)}
                          className="rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
                        >
                          <option>Unassigned</option>
                          {dummyUsers.map((u) => (
                            <option key={u}>{u}</option>
                          ))}
                        </select>
                      </div>

                      {s.due_date && (
                        <div>
                          <strong className="mr-1">Due:</strong>
                          <span className="text-sm">{s.due_date}</span>
                        </div>
                      )}
                    </div>

                    {/* Drag & Drop Zone */}
                    <div
                      onClick={() => handleClickUpload(s.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(s.id, e)}
                      className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-lg p-4 text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 cursor-pointer transition relative"
                    >
                      <span className="font-medium"> Drag and Drop Here </span>
                      <input
                        type="file"
                        multiple
                        ref={(el) => (fileInputRefs.current[s.id] = el)}
                        onChange={(e) => handleFileSelect(s.id, e.target.files)}
                        className="hidden"
                      />
                    </div>

                    {uploadedFiles[s.id]?.length > 0 && (
                      <div className="mt-2 text-xs text-gray-700 space-y-1">
                        {uploadedFiles[s.id].map((f, i) => (
                          <div key={i} className="bg-purple-50 border border-purple-200 rounded px-2 py-1">
                            📎 {f.name}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comments Section */}
                    <div className="mt-4">
                      <div className="text-sm font-semibold text-black mb-1">Comments</div>
                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {comments[s.id]?.length ? (
                          comments[s.id].map((c, i) => (
                            <div key={i} className="rounded bg-gray-50 px-3 py-2 text-sm border shadow-sm shadow-purple-100">
                              {c}
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-gray-400">No comments yet</div>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={newComment[s.id] || ""}
                          onChange={(e) => setNewComment({ ...newComment, [s.id]: e.target.value })}
                          className="min-w-0 flex-1 rounded border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                          onClick={() => addCommentForSubtask(s.id)}
                          className="shrink-0 rounded bg-purple-600 hover:bg-purple-700 px-3 py-2 text-sm text-white shadow-md shadow-purple-400/60 transition"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <button
                      onClick={() => deleteSubtask(s.id)}
                      className="rounded bg-red-500 hover:bg-red-600 px-3 py-1 text-white text-xs shadow-md shadow-red-300/50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-6 text-gray-500">No subtasks found</div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
