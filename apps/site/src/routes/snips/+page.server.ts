import { getPaginationFromTo } from "$lib/utils/pagination";

export const prerender = false;

export const load = async ({ locals: { supabase }, url }) => {
    const { searchParams } = url;
    
    const page = searchParams.get("page") || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    const library = searchParams.get("library");
    const lang = searchParams.get("lang");
    const { from, to } = getPaginationFromTo(page, limit);
    console.log({ from, to });
    const query = supabase.from("snip").select('id,body,prefix,description,updated_at,lang,library (name)', {
        count: "exact",
    });

    if (library) query.eq("library", library);
    if (lang) query.eq("lang", lang);

    query.order("created_at", { ascending: false });
    query.range(from, to);
    query.limit(limit);
    const { error, data, count } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return {
        snips: data,
        totalSnips: count,
    };
};
