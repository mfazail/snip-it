import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { getPaginationFromTo } from "$lib/utils/pagination";
import { json, type RequestHandler } from "@sveltejs/kit";

export const prerender = false;

export const GET: RequestHandler = async ({ url, request }) => {
    const { searchParams } = url;
    const client = request.headers.get('x-client')
    console.log({client})
    const page = searchParams.get("page") || 0;
    const limit = Number(searchParams.get("limit"));
    const select = searchParams.get("select");
    const library = searchParams.get("library");
    const lib_id = searchParams.get("lib_id");
    const lang = searchParams.get("lang");
    const { from, to } = getPaginationFromTo(page, limit);

    const base = new URL(`${PUBLIC_SUPABASE_URL}/rest/v1/snip`);

    

    if (select) {
        base.searchParams.set("select", select);
    } else {
        base.searchParams.set(
            "select",
            "id,prefix,description,body,lib_id,lang,updated_at"
        );
    }

    if (lang) {
        base.searchParams.set("lang", lang);
    }
    if (lib_id) {
        base.searchParams.set("lib_id", lib_id);
    }
    const res = await fetch(base, {
        method: "GET",
        headers: {
            apikey: PUBLIC_SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
            range: `${from}-${to}`,
        },
    });

    if (!res.ok) {
        return json({ message: "Something went wrong!" }, { status: 500 });
    }
    const data = await res.json();
    console.log({ data });
    return json(data);
};
