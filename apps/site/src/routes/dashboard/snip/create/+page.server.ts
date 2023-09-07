import { validateSnip } from "$lib/schema/snip";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) throw redirect(302, "/signin");

    const { data, error } = await supabase
        .from("library")
        .select("id,name,short,version");
    if (error) throw new Error(error.message);
    return {
        libs: data,
    };
};

export const actions: Actions = {
    default: async ({ locals: { supabase, getSession }, request }) => {
        const session = await getSession();
        if (!session) {
            return fail(403, {
                prefix: null,
                body: null,
                description: null,
                lang: null,
                lib_id: null,
                message: "Not authorized",
            });
        }
        const user_id = session.user.id;
        const data = await request.formData();
        const prefix = String(data.get("prefix"));
        const body = String(data.get("body"));
        const description = String(data.get("description"));
        const lang = String(data.get("lang"));
        const lib_id = Number(data.get("lib_id"));
        const result = validateSnip({
            user_id,
            prefix,
            body,
            description,
            lang,
            lib_id,
        });
        if (result) {
            return fail(400, {
                prefix,
                body,
                description,
                lang,
                lib_id,
                message: result.message,
            });
        }

        const { error } = await supabase.from("snip").insert({
            user_id,
            prefix,
            body,
            description,
            lang,
            lib_id,
        });
        if (error) {
            return fail(500, {
                prefix,
                body,
                description,
                lang,
                lib_id,
                message: error.message,
            });
        }
        throw redirect(302, `/dashboard/snip`);
    },
};
