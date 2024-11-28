import CommentItem from "@/Components/CommentItem";
import CommenrItem from "@/Components/CommentItem";
import { FeatureActionDeopdown } from "@/Components/FeatureActionDropdown";
import FeatureItem from "@/Components/FeatureItem";
import FeatureUpvoteDownvote from "@/Components/FeatureUpvoteDownvote";
import NewCommentForm from "@/Components/NewCommentForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Feature, paginatedData } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ feature }: { feature: Feature }) {
    // console.log(feature.comments);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Feature
                </h2>
            }
        >
            <Head title={" Feature" + feature} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                    <FeatureUpvoteDownvote feature={feature} />

                    <div className="flex-1">
                        <h2 className="text-2xl md-2">{feature.name}</h2>
                        <p>{feature.description}</p>
                        <div className="mt-8">
                            <NewCommentForm feature={feature} />
                            {feature.comments.map((Comment) => (
                                <CommentItem
                                    key={Comment.id}
                                    comment={Comment}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <FeatureActionDeopdown feature={feature} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
