import { Feature } from "@/types";
import { useForm } from "@inertiajs/react";

export default function FeatureUpvoteDownvote({
    feature,
}: {
    feature: Feature;
}) {
    const upvoteForm = useForm({
        upvote: true,
    });
    const downvoteForm = useForm({
        upvote: false,
    });
    const upvoteDownvot = (upvote: boolean) => {
        if (
            (feature.user_has_downvoted && !upvote) ||
            (feature.user_has_upvoted && upvote)
        ) {
            upvoteForm.delete(route("feature.destroy", feature.id), {
                preserveScroll: true,
            });
        } else {
            let form = null;
            if (upvote) {
                form = upvoteForm;
            } else {
                form = downvoteForm;
            }
            form.post(route("upvote.store", feature.id), {
                preserveScroll: true,
            });
        }
    };
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={() => upvoteDownvot(true)}
                className={feature.user_has_upvoted ? "text-amber-500" : ""}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-12"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                </svg>
            </button>
            <span
                className={
                    "text-2xl font-semibol " +
                    (feature.user_has_upvoted ? "text-amber-600" : "")
                }
            >
                {feature.upvote_count || 0}
            </span>

            <button
                onClick={() => upvoteDownvot(false)}
                className={feature.user_has_downvoted ? "text-amber-500" : ""}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-12"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </button>
        </div>
    );
}
