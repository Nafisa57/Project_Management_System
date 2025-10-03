// import { useState } from "react";
// import AppLayout from "@/layouts/app-layout";
// import { type BreadcrumbItem } from "@/types";
// import { Head, Link } from "@inertiajs/react";

// const breadcrumbs: BreadcrumbItem[] = [
//   {
//     title: "Roles",
//     href: "/roles",
//   },
// ];

// // dummy roles for now
// const dummyRoles = [
//   { id: 1, name: "Admin", description: "Full access to all resources" },
//   { id: 2, name: "Manager", description: "Manage projects and tasks" },
//   { id: 3, name: "Client", description: "View project progress" },
//   { id: 4, name: "Support", description: "Handle tickets and user queries" },
// ];

// export default function Index() {
//   const [query, setQuery] = useState("");

//   const filteredRoles = dummyRoles.filter(
//     (r) =>
//       r.name.toLowerCase().includes(query.toLowerCase()) ||
//       r.description.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <AppLayout breadcrumbs={breadcrumbs}>
//       <Head title="Roles" />

//       <div className="flex h-full flex-1 flex-col gap-6 p-4">
//         {/* Top bar with search */}
//         <div className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Roles</h1>
//           <input
//             type="text"
//             placeholder="Search roles..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
//           />
//         </div>

//         {/* Roles Table */}
//         <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
//                   Role Name
//                 </th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
//                   Description
//                 </th>
//                 <th className="px-4 py-2 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//               {filteredRoles.map((role) => (
//                 <tr key={role.id}>
//                   <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
//                     {role.name}
//                   </td>
//                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
//                     {role.description}
//                   </td>
//                   <td className="px-4 py-2 text-right text-sm">
//                     <div className="flex justify-end gap-2">
//                       <Link
//                         href={`/roles/${role.id}`}
//                         className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
//                       >
//                         Show
//                       </Link>
//                       <Link
//                         href={`/roles/${role.id}/edit`}
//                         className="rounded-md bg-yellow-500 px-3 py-1 text-xs text-white hover:bg-yellow-600"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => alert(`Delete role ${role.id}`)}
//                         className="rounded-md bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {filteredRoles.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={3}
//                     className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
//                   >
//                     No roles found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Roles', href: '/roles' }];

// Dummy roles
const dummyRoles = [
    { id: 1, name: 'Admin', description: 'Full access to all resources' },
    { id: 2, name: 'Manager', description: 'Manage projects and tasks' },
    { id: 3, name: 'Client', description: 'View project progress' },
    { id: 4, name: 'Support', description: 'Handle tickets and user queries' },
];

export default function Index() {
    const [query, setQuery] = useState('');

    const filteredRoles = dummyRoles.filter(
        (r) =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.description.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-gray-50 p-6">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Roles</h1>
                    <input
                        type="text"
                        placeholder="Search roles..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* Roles cards grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredRoles.map((role) => (
                        <div
                            key={role.id}
                            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_12px_rgba(139,92,246,0.3)] transition-shadow hover:shadow-[0_6px_18px_rgba(139,92,246,0.45)]"
                        >
                            {/* Avatar + Role info */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                    {role.name[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        {role.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {role.description}
                                    </div>
                                </div>
                            </div>

                            {/* Role badge */}
                            <div className="mt-4">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                        role.name === 'Admin'
                                            ? 'bg-red-100 text-red-600'
                                            : role.name === 'Manager'
                                              ? 'bg-blue-100 text-blue-600'
                                              : role.name === 'Support'
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-green-100 text-green-600'
                                    }`}
                                >
                                    {role.name}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="mt-5 flex gap-2">
                                <Link
                                    href={`/roles/${role.id}`}
                                    className="flex-1 rounded-lg bg-indigo-500 px-3 py-2 text-center text-xs text-white hover:bg-indigo-600"
                                >
                                    Show
                                </Link>
                                <Link
                                    href={`/roles/${role.id}/edit`}
                                    className="flex-1 rounded-lg bg-yellow-500 px-3 py-2 text-center text-xs text-white hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() =>
                                        alert(`Delete role ${role.id}`)
                                    }
                                    className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-xs text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredRoles.length === 0 && (
                        <div className="col-span-full py-10 text-center text-gray-500">
                            No roles found
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
