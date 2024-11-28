import { can } from "@/helpers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User, PageProps, paginatedData } from "@/types";
import { Head, Link } from "@inertiajs/react";

// export default function Index({features,}: {features: paginatedData<Users>;}) {
export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
    // usePage().props.auth.user
    console.log(users);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User
                </h2>
            }
        >
            <Head title="Users" />

            {can(auth.user, "manage_features") && (
                <div className="md-8">
                    <Link
                        href={route("feature.create")}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 $"
                    >
                        Create New Users
                    </Link>
                </div>
            )}

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Roles
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4"> {user.name}</td>
                                <td className="px-6 py-4"> {user.email}</td>
                                <td className="px-6 py-4">{user.created_at}</td>
                                <td className="px-6 py-4">
                                    {user.roles.join("/")}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        href={route("user.edit", user.id)}
                                    >
                                        edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        ;
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
