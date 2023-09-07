import { redirect } from "@sveltejs/kit";

export const prerender = false;

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
        throw redirect(302, `/signin`);
    }
    const { data, error } = await supabase.from("snip").select("id,body,prefix,description,updated_at,lang,library (name)").limit(10);
    if (error) {
        throw redirect(302, `/dashboard`);
    }
    return {
        snips: data,
    };
};
