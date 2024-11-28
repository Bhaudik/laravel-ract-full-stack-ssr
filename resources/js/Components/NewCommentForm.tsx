import { Feature } from "@/types";
import TextAreaInput from "./TextAreaInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import PrimaryButton from "./PrimaryButton";

export default function NewCommentForm({ feature }: { feature: Feature }) {
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
