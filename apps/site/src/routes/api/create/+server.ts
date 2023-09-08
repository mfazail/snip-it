import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
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

export const POST: RequestHandler = async ({ request, url,fetch }) => {
    const accessToken = request.headers.get("authorization");
    if (!accessToken) {
        return json(
            {
                message: "Not authorized",
            },
            { status: 403 }
        );
    }

    const token = getToken(accessToken);

    console.log(url.origin);
    console.log(url.host);
    console.log(url.port);

    const { user_id, prefix, description, body, lang, lib_id } =
        await request.json();

    const result = validateSnip({
        body,
        description,
        lang,
        prefix,
        lib_id: parseInt(lib_id),
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

    if (!res.ok) {
        const j = await res.json()
        console.log(j)
        return json({
            message: "Something went wrong!"
        },{
            status:500
        });
    }
    return json({ message: "Snip created successfully!" }, { status: 201 });
};
