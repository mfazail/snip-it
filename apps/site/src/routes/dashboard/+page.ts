import { error, redirect } from "@sveltejs/kit";

export const load = async ({ parent,setHeaders }) => {
    const { session, supabase } = await parent();
    if (!session) {
        throw redirect(302, "/signin");
    }
    const { error: err, data } = await supabase
        .from("created_lib_with_count")
        .select("lib,total_snips");

    if (err) {
        throw error(500, { message: err.message });
    }
    setHeaders({
        "cache-control": "max-age=3600",
    })
    return {
        data,
    };
};
