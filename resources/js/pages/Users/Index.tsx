import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: '/users' }];

const dummyUsers = [
    { id: 1, name: 'Nafisa', email: 'nafisa@example.com', role: 'Admin' },
    { id: 2, name: 'Anas', email: 'anas@example.com', role: 'Manager' },
    { id: 3, name: 'Aisha', email: 'aisha@example.com', role: 'Client' },
    { id: 4, name: 'Zara', email: 'zara@example.com', role: 'Support' },
    { id: 5, name: 'Omar', email: 'omar@example.com', role: 'Client' },
    { id: 6, name: 'Lina', email: 'lina@example.com', role: 'Manager' },
];

export default function Index() {
    const [query, setQuery] = useState('');

    const filteredUsers = dummyUsers.filter(
        (u) =>
            u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase()) ||
            u.role.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-6 bg-gray-50 p-6">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/* User cards grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_12px_rgba(139,92,246,0.3)] transition-shadow hover:shadow-[0_6px_18px_rgba(139,92,246,0.45)]"
                        >
                            {/* Avatar */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                    {user.name[0]}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            {/* Role badge */}
                            <div className="mt-4">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                        user.role === 'Admin'
                                            ? 'bg-red-100 text-red-600'
                                            : user.role === 'Manager'
                                              ? 'bg-blue-100 text-blue-600'
                                              : user.role === 'Support'
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-green-100 text-green-600'
                                    }`}
                                >
                                    {user.role}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="mt-5 flex gap-2">
                                <Link
                                    href={`/users/${user.id}`}
                                    className="flex-1 rounded-lg bg-indigo-500 px-3 py-2 text-center text-xs text-white hover:bg-indigo-600"
                                >
                                    Show
                                </Link>
                                <Link
                                    // The user.id is essential to tell the system *which* user to edit
                                    href={`/users/${user.id}/edit`}
                                    className="mx-1 flex-1 rounded-lg bg-yellow-500 px-3 py-2 text-center text-xs text-white hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() =>
                                        alert(`Delete user ${user.id}`)
                                    }
                                    className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-xs text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                        No users found
                    </div>
                ) : null}
            </div>
        </AppLayout>
    );
}
