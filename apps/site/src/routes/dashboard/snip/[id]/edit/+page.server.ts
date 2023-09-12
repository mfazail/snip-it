import { validateSnip } from "$lib/schema/snip.js";
import { redirect, type Actions, fail } from "@sveltejs/kit";

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
            .update({ prefix, body, description, lib_id })
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
        return {
            prefix,
            body,
            description,
            lib_id,
            success: true,
        };
    },
};
