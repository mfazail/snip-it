import { getPaginationFromTo } from "$lib/utils.js";

export const load = async ({ locals: { supabase }, url }) => {
    const { searchParams } = url;
    const page = searchParams.get("page") || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    const library = searchParams.get("library");
    const lang = searchParams.get("lang");
    const q = searchParams.get("q");
    const { from, to } = getPaginationFromTo(page, limit);
    // console.log({ from, to });
    const query = supabase
        .from("snip")
        .select(
            `id, prefix, description, created_at,body, updated_at, lang, library`,
            {
                count: "exact",
            }
        );

    if (library) query.eq("library", library);
    if (lang) query.eq("lang", lang);
    if (q) {
        query.textSearch("description", q);
        query.textSearch("prefix", q);
    }

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
