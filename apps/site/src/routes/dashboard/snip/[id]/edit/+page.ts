import { redirect } from "@sveltejs/kit";

export const load = async ({ parent, params: { id } }) => {
    const { session, supabase } = await parent();
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
