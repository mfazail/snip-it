import { getPaginationFromTo } from "$lib/utils/pagination";
import { json, type RequestHandler } from "@sveltejs/kit";

export const prerender = false;

export const GET: RequestHandler = async ({
    locals: { supabase },
    url,
    request,
    setHeaders,
}) => {
    const { searchParams } = url;
    const client = request.headers.get("x-client");
    console.log({ client });
    const page = searchParams.get("page") || 0;
    const limit = searchParams.get("limit");
    const lib_id = searchParams.get("lib_id");

    const query = supabase.from("snip").select("id,prefix,body,description");

    if (lib_id) {
        query.eq("lib_id", lib_id);
    }
    if (limit) {
        const { from, to } = getPaginationFromTo(page, parseInt(limit));
        query.range(from, to);
    }

    const { data, error } = await query;
    if (error) {
        return json({ message: error.message }, { status: 500 });
    }
    setHeaders({
        age: "100",
        'cache-control':"max-age=3600" 
    })
    return json(data);
};
