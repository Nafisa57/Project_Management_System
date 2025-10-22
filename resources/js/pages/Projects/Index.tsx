// import { useState } from "react";
// import AppLayout from "@/layouts/app-layout";
// import { type BreadcrumbItem } from "@/types";
// import { Head, Link } from "@inertiajs/react";

// const breadcrumbs: BreadcrumbItem[] = [
//   { title: "Projects", href: "/projects" },
// ];

// const dummyProjects = [
//   {
//     id: 1,
//     name: "AI Research",
//     owner: "Nafisa",
//     status: "Active",
//     start_date: "2025-09-01",
//     end_date: "2025-12-01",
//     tasks_count: 5,
//   },
//   {
//     id: 2,
//     name: "Website Redesign",
//     owner: "Anas",
//     status: "Planning",
//     start_date: "2025-08-10",
//     end_date: "2025-10-15",
//     tasks_count: 8,
//   },
// ];

// export default function Index() {
//   const [query, setQuery] = useState("");
//   const [projects, setProjects] = useState(dummyProjects);
//   const [comments, setComments] = useState<{ [key: number]: string[] }>({});
//   const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

//   const filteredProjects = projects.filter(
//     (p) =>
//       p.name.toLowerCase().includes(query.toLowerCase()) ||
//       p.owner.toLowerCase().includes(query.toLowerCase()) ||
//       p.status.toLowerCase().includes(query.toLowerCase())
//   );

//   function handleDelete(id: number) {
//     if (!confirm("Delete this project?")) return;
//     setProjects(projects.filter((p) => p.id !== id));
//   }

//   function handleQuickEdit(id: number) {
//     const name = prompt("Set new project name:");
//     if (!name) return;
//     setProjects(projects.map((p) => (p.id === id ? { ...p, name } : p)));
//   }

//   function addComment(projectId: number) {
//     const comment = newComment[projectId]?.trim();
//     if (!comment) return;
//     setComments({
//       ...comments,
//       [projectId]: [...(comments[projectId] || []), comment],
//     });
//     setNewComment({ ...newComment, [projectId]: "" });
//   }

//   return (
//     <AppLayout breadcrumbs={breadcrumbs}>
//       <Head title="Projects" />

//       <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-50">
//         {/* Top bar */}
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
//           <input
//             type="text"
//             placeholder="Search projects..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Project cards grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProjects.map((project) => (
//             <div
//               key={project.id}
//               className="rounded-2xl bg-white p-6 border border-gray-100 shadow-[0_4px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_18px_rgba(139,92,246,0.45)] transition-shadow flex flex-col"
//             >
//               {/* Project header */}
//               <div>
//                 <div className="text-lg font-semibold text-gray-800">
//                   {project.name}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   Owner: {project.owner}
//                 </div>
//                 <div className="mt-1 text-sm text-gray-600">
//                   {project.start_date} → {project.end_date}
//                 </div>
//               </div>

//               {/* Status badge */}
//               <div className="mt-3">
//                 <span
//                   className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
//                     project.status === "Active"
//                       ? "bg-green-100 text-green-600"
//                       : project.status === "Planning"
//                       ? "bg-blue-100 text-blue-600"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {project.status}
//                 </span>
//               </div>

//               {/* Tasks count */}
//               <div className="mt-2 text-sm text-gray-700">
//                 Tasks: {project.tasks_count}
//               </div>

//               {/* Actions */}
//               <div className="mt-4 flex gap-2">
//                 <Link
//                   href={`/projects/${project.id}`}
//                   className="flex-1 rounded-lg bg-indigo-500 px-3 py-2 text-xs text-center text-white hover:bg-indigo-600"
//                 >
//                   Show Tasks
//                 </Link>
//                 <button
//                   onClick={() => handleQuickEdit(project.id)}
//                   className="flex-1 rounded-lg bg-yellow-500 px-3 py-2 text-xs text-white hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(project.id)}
//                   className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-xs text-white hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>

//               {/* Comments Section */}
//               <div className="mt-5 border-t pt-4 flex flex-col flex-1">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-2">
//                   Comments
//                 </h4>

//                 {/* Comments list */}
//                 <div className="flex-1 space-y-2 max-h-32 overflow-y-auto">
//                   {comments[project.id]?.length ? (
//                     comments[project.id].map((c, i) => (
//                       <div
//                         key={i}
//                         className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow-sm border"
//                       >
//                         {c}
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-xs text-gray-400">No comments yet</p>
//                   )}
//                 </div>

//                 {/* Add comment input + button */}
//                 <div className="mt-3">
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="text"
//                       placeholder="Write a comment..."
//                       value={newComment[project.id] || ""}
//                       onChange={(e) =>
//                         setNewComment({
//                           ...newComment,
//                           [project.id]: e.target.value,
//                         })
//                       }
//                       className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//                     />
//                     <button
//                       onClick={() => addComment(project.id)}
//                       className="shrink-0 rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredProjects.length === 0 && (
//           <div className="text-center py-10 text-gray-500">No projects found</div>
//         )}
//       </div>
//     </AppLayout>
//   );
// }

import { useState, DragEvent, ChangeEvent } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Projects", href: "/projects" },
];

const dummyProjects = [
  {
    id: 1,
    name: "AI Research",
    owner: "Nafisa",
    status: "Active",
    start_date: "2025-09-01",
    end_date: "2025-12-01",
    tasks_count: 5,
  },
  {
    id: 2,
    name: "Website Redesign",
    owner: "Anas",
    status: "Planning",
    start_date: "2025-08-10",
    end_date: "2025-10-15",
    tasks_count: 8,
  },
];

export default function Index() {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState(dummyProjects);
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: string | null }>({});
  const [isDragging, setIsDragging] = useState<{ [key: number]: boolean }>({});

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.owner.toLowerCase().includes(query.toLowerCase()) ||
      p.status.toLowerCase().includes(query.toLowerCase())
  );

  function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    setProjects(projects.filter((p) => p.id !== id));
  }

  function handleQuickEdit(id: number) {
    const name = prompt("Set new project name:");
    if (!name) return;
    setProjects(projects.map((p) => (p.id === id ? { ...p, name } : p)));
  }

  function addComment(projectId: number) {
    const comment = newComment[projectId]?.trim();
    if (!comment) return;
    setComments({
      ...comments,
      [projectId]: [...(comments[projectId] || []), comment],
    });
    setNewComment({ ...newComment, [projectId]: "" });
  }

  function handleFileUpload(projectId: number, file: File) {
    setUploadedFiles({ ...uploadedFiles, [projectId]: file.name });
  }

  function handleDrop(e: DragEvent<HTMLDivElement>, projectId: number) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(projectId, file);
    setIsDragging({ ...isDragging, [projectId]: false });
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>, projectId: number) {
    e.preventDefault();
    setIsDragging({ ...isDragging, [projectId]: true });
  }

  function handleDragLeave(projectId: number) {
    setIsDragging({ ...isDragging, [projectId]: false });
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>, projectId: number) {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(projectId, file);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />

      <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-gray-50">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-white p-6 border border-gray-100 shadow-[0_4px_12px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_18px_rgba(139,92,246,0.45)] transition-shadow flex flex-col"
            >
              {/* Project header */}
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {project.name}
                </div>
                <div className="text-xs text-gray-500">
                  Owner: {project.owner}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {project.start_date} → {project.end_date}
                </div>
              </div>

              {/* Status badge */}
              <div className="mt-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : project.status === "Planning"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Tasks count */}
              <div className="mt-2 text-sm text-gray-700">
                Tasks: {project.tasks_count}
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex-1 rounded-lg bg-indigo-500 px-3 py-2 text-xs text-center text-white hover:bg-indigo-600"
                >
                  Show Tasks
                </Link>
                <button
                  onClick={() => handleQuickEdit(project.id)}
                  className="flex-1 rounded-lg bg-yellow-500 px-3 py-2 text-xs text-white hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-xs text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              {/* 📂 Drag & Drop Upload Section */}
              <div
                onDragOver={(e) => handleDragOver(e, project.id)}
                onDragLeave={() => handleDragLeave(project.id)}
                onDrop={(e) => handleDrop(e, project.id)}
                onClick={() =>
                  document.getElementById(`file-input-${project.id}`)?.click()
                }
                className={`mt-5 border-2 border-dashed rounded-xl p-4 text-center text-sm font-medium cursor-pointer transition-all ${
                  isDragging[project.id]
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {uploadedFiles[project.id] ? (
                  <span className="text-green-600 font-semibold">
                    ✅ {uploadedFiles[project.id]} uploaded
                  </span>
                ) : (
                  <span>
                     Drag & Drop File Here or Click to Upload
                  </span>
                )}
                <input
                  id={`file-input-${project.id}`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e, project.id)}
                />
              </div>

              {/* Comments Section */}
              <div className="mt-5 border-t pt-4 flex flex-col flex-1">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Comments
                </h4>

                {/* Comments list */}
                <div className="flex-1 space-y-2 max-h-32 overflow-y-auto">
                  {comments[project.id]?.length ? (
                    comments[project.id].map((c, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow-sm border"
                      >
                        {c}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400">No comments yet</p>
                  )}
                </div>

                {/* Add comment input + button */}
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment[project.id] || ""}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          [project.id]: e.target.value,
                        })
                      }
                      className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => addComment(project.id)}
                      className="shrink-0 rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-10 text-gray-500">No projects found</div>
        )}
      </div>
    </AppLayout>
  );
}
