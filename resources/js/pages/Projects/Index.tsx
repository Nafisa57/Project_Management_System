import { useState } from "react";
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








// import { useState } from "react";
// import AppLayout from "@/layouts/app-layout";
// import { Head } from "@inertiajs/react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const dummyProjects = [
//   {
//     id: 1,
//     name: "AI Research",
//     owner: "Nafisa",
//     status: "Active",
//     start_date: "2025-09-01",
//     end_date: "2025-12-01",
//     tasks: [
//       { id: "t1", title: "Collect Dataset", status: "To Do" },
//       { id: "t2", title: "Train Model", status: "In Progress" },
//       { id: "t3", title: "Evaluate Accuracy", status: "Done" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Website Redesign",
//     owner: "Anas",
//     status: "Planning",
//     start_date: "2025-08-10",
//     end_date: "2025-10-15",
//     tasks: [
//       { id: "t4", title: "Wireframe Layout", status: "To Do" },
//       { id: "t5", title: "Implement UI", status: "In Progress" },
//       { id: "t6", title: "Testing", status: "Done" },
//     ],
//   },
// ];

// const columns = ["To Do", "In Progress", "Done"];

// export default function Index() {
//   const [projects, setProjects] = useState(dummyProjects);
//   const [selectedProject, setSelectedProject] = useState<number | null>(null);

//   // 🧭 Handle Drag End
//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;
//     const projectIndex = projects.findIndex((p) => p.id === selectedProject);
//     const project = projects[projectIndex];
//     const updatedTasks = Array.from(project.tasks);
//     const [movedTask] = updatedTasks.splice(source.index, 1);
//     movedTask.status = destination.droppableId;
//     updatedTasks.splice(destination.index, 0, movedTask);

//     const newProjects = [...projects];
//     newProjects[projectIndex] = { ...project, tasks: updatedTasks };
//     setProjects(newProjects);
//   };

//   // 🗑 Delete Task
//   const handleDeleteTask = (taskId) => {
//     const newProjects = projects.map((p) =>
//       p.id === selectedProject
//         ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
//         : p
//     );
//     setProjects(newProjects);
//   };

//   return (
//     <AppLayout breadcrumbs={[{ title: "Projects", href: "/projects" }]}>
//       <Head title="Projects" />

//       <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//         <h1 className="text-2xl font-bold text-gray-800">Projects</h1>

//         {/* ✅ Project List */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
//             >
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {project.name}
//               </h2>
//               <p className="text-sm text-gray-500">Owner: {project.owner}</p>
//               <p className="text-sm text-gray-600 mt-1">
//                 {project.start_date} → {project.end_date}
//               </p>

//               <div className="mt-3">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     project.status === "Active"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-blue-100 text-blue-600"
//                   }`}
//                 >
//                   {project.status}
//                 </span>
//               </div>

//               <div className="mt-4 flex justify-between">
//                 <button
//                   onClick={() => setSelectedProject(project.id)}
//                   className="w-full bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-600"
//                 >
//                   Show Kanban Board
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 🧱 Kanban Board */}
//         {selectedProject && (
//           <div className="mt-10 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Kanban Board —{" "}
//                 {
//                   projects.find((p) => p.id === selectedProject)?.name
//                 }
//               </h2>
//               <button
//                 onClick={() => setSelectedProject(null)}
//                 className="text-sm text-red-500 hover:underline"
//               >
//                 Close
//               </button>
//             </div>

//             <DragDropContext onDragEnd={onDragEnd}>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 {columns.map((col) => (
//                   <Droppable droppableId={col} key={col}>
//                     {(provided) => (
//                       <div
//                         {...provided.droppableProps}
//                         ref={provided.innerRef}
//                         className="bg-gray-50 rounded-xl p-4 border border-gray-200 min-h-[250px]"
//                       >
//                         <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                           {col}
//                         </h3>

//                         {projects
//                           .find((p) => p.id === selectedProject)
//                           ?.tasks.filter((task) => task.status === col)
//                           .map((task, index) => (
//                             <Draggable
//                               key={task.id}
//                               draggableId={task.id}
//                               index={index}
//                             >
//                               {(provided) => (
//                                 <div
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   ref={provided.innerRef}
//                                   className="bg-white border rounded-lg shadow-sm p-3 mb-3 flex justify-between items-center"
//                                 >
//                                   <span className="text-sm text-gray-800">
//                                     {task.title}
//                                   </span>
//                                   <button
//                                     onClick={() => handleDeleteTask(task.id)}
//                                     className="text-xs text-red-500 hover:underline"
//                                   >
//                                     Delete
//                                   </button>
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}

//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                 ))}
//               </div>
//             </DragDropContext>
//           </div>
//         )}
//       </div>
//     </AppLayout>
//   );
// }
