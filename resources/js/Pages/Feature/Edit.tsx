import FeatureItem from "@/Components/FeatureItem";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature, paginatedData } from "@/types";
import { Description, Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { features } from "process";
import { FormEventHandler, useState } from "react";

export default function show({ feature }: { feature: Feature }) {
    const { data, setData, processing, errors, put } = useForm({
        name: feature.name,
        description: feature.description,
    });

    const createFeature: FormEventHandler = (ev) => {
        ev.preventDefault();

        put(route("feature.update", feature.id), {
            preserveScroll: true,
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Feature <b>"{feature.name}"</b>
                </h2>
            }
        >
            <Head title={" Edit Feature " + feature.name} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                    <form onSubmit={createFeature} className="w-full">
                        <div className="md-8">
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
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
                            </div>
                        </div>

                        <div className="md-8">
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />

                                <TextAreaInput
                                    rows={6}
                                    id="description"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    // required
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>
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
