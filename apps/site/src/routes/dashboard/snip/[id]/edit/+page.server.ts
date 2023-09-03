import { updateSnip } from "$lib/crud/snip.js";
import { redirect, type Actions } from "@sveltejs/kit";

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
    if (error) {
        throw redirect(302, `/dashboard`);
    }
    return {
        snip: data,
    };
};

export const actions: Actions = {
    default: async ({
        params: { id },
        locals: { supabase, getSession },
        request,
    }) => {
        const session = await getSession();
        return await updateSnip({
            supa: supabase,
            id,
            request,
            session,
            type: "action",
        });
    },
};
