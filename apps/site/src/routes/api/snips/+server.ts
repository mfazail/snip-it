import { getPaginationFromTo } from "$lib/utils/pagination";
import { json, type RequestHandler } from "@sveltejs/kit";
import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";

export const GET: RequestHandler = async ({ url, fetch, request }) => {
    const { searchParams } = url;
    const accessToken = request.headers.get("authorization");
    const page = searchParams.get("page") || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    const library = searchParams.get("library");
    const lang = searchParams.get("lang");
    const { from, to } = getPaginationFromTo(page, limit);
    if (!accessToken) {
        return json({ message: "Not signed in" }, { status: 401 });
    }
    const baseUrl = `${PUBLIC_SUPABASE_URL}/rest/v1/snip?`;
    const select =
        "select=id,prefix,description,created_at,body,updated_at,lang,library";
    var query = "";

    if (library) query += `library=eq.${library}&`;
    if (lang) query += `lang=eq.${lang}&`;
    console.log(`${baseUrl}${query}${select}`)
    const res = await fetch(`${baseUrl}${query}${select}`, {
        headers: {
            apikey: PUBLIC_SUPABASE_ANON_KEY,
            authorization: accessToken,
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200)
        return json({ message: "Something went wrong" }, { status: 400 });
    const data = await res.json();

    return json(data);
};
