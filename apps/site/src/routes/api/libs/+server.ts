import { json, type RequestHandler } from "@sveltejs/kit";

export const prerender = false

export const GET: RequestHandler = async ({
    locals: { supabase },
    url,
    request,setHeaders,
}) => {
    const { searchParams } = url;
    const client = request.headers.get("x-client");
    console.log({ client });
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const lang = searchParams.get("lang");

    const query = supabase.from("library").select("id,name,short,lang");

    if (id) query.ilike("id", id);
    if (name) query.ilike("name", `%${name}%`);
    if (lang) {
        const l = lang.split(',')
        query.contains('lang',l)
    }

    const { data, error } = await query;
    if (error) return json({ message: error.message }, { status: 500 });

    setHeaders({
        age: "100",
        'cache-control':"max-age=3600" 
    })

    return json({ libs: data }, { status: 200 });
};
