import { validateSnip } from "$lib/schema/snip.js";
import { redirect, type Actions, fail } from "@sveltejs/kit";

export const load = async ({
    params: { id },
    locals: { supabase, getSession },
}) => {
    const session = await getSession();
    if (!session) {
        throw redirect(302, `/signin`);
    }
    const { data, error } = await supabase
        .from("snip")
        .select("*")
        .eq("id", id)
        .single();
    const { data: libs, error: LibErr } = await supabase
        .from("library")
        .select("id,name,short,version");
    if (error) {
        throw redirect(302, `/dashboard`);
    }
    if (LibErr) {
        throw redirect(302, `/dashboard`);
    }
    return {
        snip: data,
        libs,
    };
};

export const actions: Actions = {
    default: async ({
        params: { id },
        locals: { supabase, getSession },
        request,
    }) => {
        const session = await getSession();
        if (!session) {
            return fail(403, {
                prefix: null,
                body: null,
                lib_id: null,
                description: null,
                message: "Not authorized",
            });
        }
        const data = await request.formData();
        const prefix = String(data.get("prefix"));
        const body = String(data.get("body"));
        const description = String(data.get("description"));
        const lib_id = Number(data.get("lib_id"));
        const result = validateSnip({
            user_id: session.user.id,
            prefix,
            body,
            description,
            lib_id,
        });
        if (result) {
            return fail(400, {
                prefix,
                body,
                description,
                lib_id,
                message: result.message,
            });
        }

        if (!id) {
            return fail(400, {
                prefix,
                body,
                description,
                lib_id,
                message: "id is required",
            });
        }
        const { error } = await supabase
            .from("snip")
            .update({ prefix, body, description, lib_id: Number(lib_id) })
            .eq("id", id);

        if (error) {
            return fail(500, {
                prefix,
                body,
                description,
                lib_id,
                message: error.message,
            });
        }
        throw redirect(302, `/dashboard/snip`);
    },
};
