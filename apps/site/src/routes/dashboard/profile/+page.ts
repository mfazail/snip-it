import { redirect, error } from "@sveltejs/kit";

export const load = async ({ parent }) => {
    const { session, supabase } = await parent();
    if (!session) throw redirect(302, "/signin");

    const {
        error: err,
        data,
    } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();
        
    // console.log(session.user.id);
    if (err) throw error(500, { message: err.message });
    return {
        profile: data,
    };
};
