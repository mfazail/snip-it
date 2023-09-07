import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({
    locals: { supabase },
    url,
    request,
}) => {
    const { searchParams } = url;
    const client = request.headers.get("x-client");
    console.log({ client });
    const name = searchParams.get("name");
    const lang = searchParams.get("lang");

    const query = supabase.from("library").select("id,name,short");

    if (name) query.textSearch("name", name);

    const { data, error } = await query;
    if (error) return json({ message: error.message }, { status: 500 });
    return json({ libs: data }, { status: 200 });
};
