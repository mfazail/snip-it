import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase,getSession } }) => {
    const session = await getSession();
    if(!session){
        throw redirect(302, `/signin`);
    }
    const { data, error } = await supabase.from("snip").select("*");
    if (error) {
        throw redirect(302, `/dashboard`);
    }
    return {
        snips: data,
    }
}