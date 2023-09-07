import { fail, type Actions, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) throw redirect(302, "/signin");

    const { error,data,status,statusText } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();
        console.log({status,statusText})
        if(error) throw new Error(error.message)
        return {
            profile: data,
        }
};

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
