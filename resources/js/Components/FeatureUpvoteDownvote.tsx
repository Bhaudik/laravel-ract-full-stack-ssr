import { Feature } from "@/types";

export default function FeatureUpvoteDownvote({
    feature,
}: {
    feature: Feature;
}) {
    return (
        <div className="flex flex-col items-center">
            <button
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
