import { can } from "@/helpers";
import { comment } from "@/types"; // Assuming you have a `comment` type defined
import { useForm, usePage } from "@inertiajs/react";

// CommentItem Component
export default function CommentItem({ comment }: { comment: comment }) {
    const form = useForm();
    const user = usePage().props.auth.user;

    const deleteComment = () => {
        form.delete(route("feature.comment.destroy", comment.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="flex gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div>
                <h3 className="font-bold mt-1">
                    {comment.user.name}
                    <span className="text-gray-500 text-xs ml-4">
                        {comment.created_at}
                    </span>
                </h3>
                <div className="italic mt-1">{comment.comment}</div>
            </div>
            <div className="flex items-center py-2 px-6">
                
                {can(user, "manage_comments") && comment.user.id == user.id && (
                    <button onClick={deleteComment}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
