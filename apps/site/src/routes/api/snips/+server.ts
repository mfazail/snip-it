import { getPaginationFromTo } from "$lib/utils/pagination";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals: { supabase }, url }) => {
    const { searchParams } = url;
    const page = searchParams.get("page") || 0;
    const limit = Number(searchParams.get("limit"));
    const select = searchParams.get("select");
    const library = searchParams.get("library");
    const prefix = searchParams.get("prefix");
    const lang = searchParams.get("lang");
    const { from, to } = getPaginationFromTo(page, limit);
    const query = supabase
        .from("snip")
        .select(select || "id,prefix,description,body,library,lang,updated_at");
    if (lang) {
        query.eq("lang", lang);
    }
    if (library) {
        query.textSearch("library", library);
    }
    if (prefix) {
        query.eq("prefix", prefix);
    }
    query.limit(limit);
    // console.log("Fetching...");
    const { data, error } = await query;
    // console.log("Fetched");
    if (error) return json({ message: error.message }, { status: 400 });

    return json(data);
};
