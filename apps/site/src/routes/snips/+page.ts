import { getPaginationFromTo } from "$lib/utils/pagination";
import { error } from "@sveltejs/kit";

export const prerender = false;

export const load = async ({ url,parent, setHeaders,depends }) => {
    depends('snips')
    const { supabase } = await parent()
    const { searchParams } = url;
    const page = searchParams.get("page") || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const lib_id = searchParams.get("lib_id");
    const name = searchParams.get("name");
    const lang = searchParams.get("lang");
    const { from, to } = getPaginationFromTo(page, limit);
    console.log({ from, to });
    const query = supabase
        .from("snip")
        .select(
            "id,body,prefix,description,lib_id,updated_at,library (name,lang)",
            {
                count: "exact",
            }
        );

    if (lib_id) query.eq("lib_id", lib_id);
    if (lang) {
        const l = lang.split(",");
        query.contains("library.lang", l);
    }
    if (name) {
        query.ilike("library.name",`%${name}%`);
    }

    query.order("created_at", { ascending: false });
    query.range(from, to);
    query.limit(limit);
    const { error: err, data: snips, count } = await query;
    if (err) {
        throw error(500, { message: err.message });
    }

    setHeaders({
        age: "100",
        'cache-control':'max-age=3600'
    })

    // console.log("called1");
    return {
        snips,
        totalSnips: count,
    };
};
