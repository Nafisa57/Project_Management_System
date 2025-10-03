import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

// Define the structure of the user object for type safety
interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
}

const breadcrumbsBase: BreadcrumbItem[] = [{ title: 'Users', href: '/users' }];

export default function Edit() {
    // Get the user data from Inertia props. We assume the key is 'user'.
    const { user } = usePage<any>().props as { user: UserData };

    // Setup Inertia's useForm hook
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Sends a PUT request to the backend route /users/{user.id}
        put(`/users/${user.id}`);
    };

    return (
        <AppLayout
            breadcrumbs={[
                ...breadcrumbsBase,
                { title: user.name, href: `/users/${user.id}` },
                { title: 'Edit', href: `/users/${user.id}/edit` },
            ]}
        >
            <Head title={`Edit ${user.name}`} />

            {/* Centering Wrapper */}
            <div className="flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-xl border bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                    <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                        Edit {user.name}'s Details
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field - NO 'required' attribute */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email Field - NO 'required' attribute */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Role Field */}
                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData('role', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Support">Support</option>
                                <option value="Client">Client</option>
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-6">
                            <Link
                                href="/users"
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                                as="button"
                                type="button"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
