import { validateSnip } from "$lib/schema/snip";
import { json, type RequestHandler } from "@sveltejs/kit";

export const prerender = false;


export const POST: RequestHandler = async ({
    request,
    locals: { getSession, supabase },
}) => {
    const session = await getSession();
    if (!session) {
        return json(
            {
                message: "Not authorized",
            },
            { status: 403 }
        );
    }

    const { user_id, prefix, description, body, lang, lib_id } =
        await request.json();

    const result = validateSnip({
        body,
        description,
        lang,
        prefix,
        lib_id: parseInt(lib_id),
        user_id,
    });
    if (result) {
        return json({ message: result.message }, { status: 403 });
    }

    const { error } = await supabase.from("snip").insert({
        body,
        description,
        lang,
        prefix,
        lib_id: parseInt(lib_id),
        user_id,
    });

    if (error) {
        return json({
            message: error.message,
        });
    }
    return json({ message: "Snip created successfully!" }, { status: 201 });
};
