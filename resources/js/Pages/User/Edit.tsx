import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Redio from "@/Components/Radio";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function show({
    users,
    roles,
    roleLable,
}: {
    roleLable: Record<string, string>;
    roles: any;
    users: User;
}) {
    const { data, setData, processing, errors, put } = useForm({
        name: users.name,
        email: users.email,
        roles: users.roles,
    });

    const createusers: FormEventHandler = (ev) => {
        ev.preventDefault();

        put(route("users.update", users.id), {
            preserveScroll: true,
        });
    };

    const onRoleChaneg = (ev: any) => {
        console.log(ev.target.value, ev.target.checked);
        if (ev.target.checked) {
            setData("roles", [ev.target.value]);
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit users <b>"{users.name}"</b>
                </h2>
            }
        >
            <Head title={" Edit users " + users.name} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                    <form onSubmit={createusers} className="w-full">
                        <div className="md-8">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    disabled
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                                <InputLabel htmlFor="email" value="email" />

                                <TextInput
                                    id="email"
                                    disabled
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>
                        </div>
                        <div className="mb-8">
                            {roles.map((role: any) => (
                                <label
                                    className="flex items-center mb-1"
                                    key={role.id}
                                >
                                    <Redio
                                        name="Radio"
                                        value={role.name}
                                        checked={data.roles.includes(role.name)}
                                        onChange={onRoleChaneg}
                                    />

                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-400 text-capital">
                                        {roleLable[role.name]}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <div className="md-8">
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
