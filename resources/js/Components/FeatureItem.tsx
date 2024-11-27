import { Feature } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FeatureActionDeopdown } from "./FeatureActionDropdown";
import FeatureUpvoteDownvote from "./FeatureUpvoteDownvote";

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setExpanded] = useState(false);

    const toggalReadMore = () => {
        setExpanded(!isExpanded);
    };

    return (
        <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                <FeatureUpvoteDownvote feature={feature} />
                <div className="flex-1">
                    <h2 className="text-2xl md-2">
                        <Link href={route("feature.show", feature)}>
                            {feature.name}
                        </Link>
                    </h2>
                    {(feature.description || "").length > 200 && (
                        <>
                            <p>
                                {isExpanded
                                    ? feature.description
                                    : `${(feature.description || "").slice(
                                          0,
                                          200
                                      )}...`}
                            </p>
                            <button
                                onClick={toggalReadMore}
                                className="text-amber-500 hover:underline"
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        </>
                    )}

                    {(feature.description || "").length <= 200 && (
                        <p>{feature.description}</p>
                    )}
                </div>
                <div>
                    <FeatureActionDeopdown feature={feature} />
                </div>
            </div>
        </div>
    );
}
