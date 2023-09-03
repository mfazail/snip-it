import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    signout: async ({ locals: { getSession, supabase } }) => {
        const session = await getSession();
        if (!session)
            return fail(403, {
                message: "Not signed in",
            });
        const { error } = await supabase.auth.signOut();
        if (error)
            return fail(400, {
                message: "Sign out failed",
            });
        throw redirect(302, "/signin");
    },
};
