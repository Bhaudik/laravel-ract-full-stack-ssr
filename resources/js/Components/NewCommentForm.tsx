import { Feature } from "@/types";
import TextAreaInput from "./TextAreaInput";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import PrimaryButton from "./PrimaryButton";
import { can } from "@/helpers";

export default function NewCommentForm({ feature }: { feature: Feature }) {
    const user = usePage().props.auth.user;

    const { data, setData, processing, post } = useForm({
        comment: "",
    });
    const createComment: FormEventHandler = (ev) => {
        ev.preventDefault(),
            post(route("comment.store", feature.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setData("comment", ""),
            });
    };

    if (!can(user, "manage_comments")) {
        return (
            <div className="text-center text-gray-600">
                You Don't have permission to leave comment
            </div>
        );
    }
    return (
        <form
            onSubmit={createComment}
            className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
            <TextAreaInput
                className="mt-1 block w-full"
                placeholder="Your Comment"
                rows={1}
                value={data.comment}
                onChange={(e) => setData("comment", e.target.value)}
            ></TextAreaInput>
            <PrimaryButton disabled={processing}>Comment</PrimaryButton>
        </form>
    );
}
