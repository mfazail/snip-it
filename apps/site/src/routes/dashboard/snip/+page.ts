import { getPaginationFromTo } from "$lib/utils/pagination.js";
import { redirect } from "@sveltejs/kit";

export const prerender = false;

export const load = async ({
    parent,
    url,
    depends
}) => {
    depends('dashboard:snips')
    const { session,supabase } = await parent()
    if (!session) {
        throw redirect(302, `/signin`);
    }
    const { searchParams } = url;
    const page = searchParams.get("page");

    const query = supabase
        .from("snip")
        .select("id,body,prefix,description,updated_at,library (name,lang)", {
            count: "exact",
        })
        .limit(10);

    if (page) {
        const { from, to } = getPaginationFromTo(page, 10);
        query.range(from, to);
    }
    const { data, error, count } = await query;
    if (error) {
        throw redirect(302, `/dashboard`);
    }
    return {
        snips: data,
        totalSnips: count,
    };
};
