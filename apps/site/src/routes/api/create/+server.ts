import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { validateSnip } from "$lib/schema/snip";
import { json, type RequestHandler } from "@sveltejs/kit";

export const prerender = false;

const getToken = (accessToken: string) => {
    const bStr = accessToken.replace(/^Bearer\s+/g, "");
    const [header, payload, signature] = bStr.split(".");

    const hStrip = header.replace(/(%..)/g, "");
    const sStrip = signature.replace(/%[^%]*/g, "");

    return `${hStrip}.${payload}.${sStrip}`;
};

export const POST: RequestHandler = async ({ request, fetch }) => {
    const accessToken = request.headers.get("authorization");
    if (!accessToken)
        return json({ message: "Not signed in" }, { status: 401 });
    const token = getToken(accessToken);

    const { user_id, prefix, description, body, lang, lib_id } =
        await request.json();

    const result = validateSnip({
        body,
        description,
        lang,
        lib_id,
        prefix,
        user_id,
    });
    if (result) {
        return json({ message: result.message }, { status: 403 });
    }
    const res = await fetch(`${PUBLIC_SUPABASE_URL}/rest/v1/snip`, {
        method: "POST",
        headers: {
            apikey: PUBLIC_SUPABASE_ANON_KEY,
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            prefer: "return=minimal",
        },
        body: JSON.stringify({
            user_id,
            prefix,
            description,
            body,
            lang,
            lib_id,
        }),
    });

    if (res.status === 201)
        return json({ message: "Snip created successfully!" }, { status: 201 });
    else if (res.status !== 200) {
        return json({ message: "Something went wrong" }, { status: 500 });
    }
    return json({ message: "Something went wrong" }, { status: 500 });
};
