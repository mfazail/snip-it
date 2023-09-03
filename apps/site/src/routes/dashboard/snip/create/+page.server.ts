import { createSnip } from "$lib/crud/snip";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ locals: { supabase, getSession }, request }) => {
        const session = await getSession();
        return await createSnip({
            supa: supabase,
            request,
            session,
            type: "action",
        });
    },
};
