import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { validateSnip } from "$lib/schema/snip";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, fetch }) => {
    const accessToken = request.headers.get("authorization");
    if (!accessToken)
        return json({ message: "Not signed in" }, { status: 401 });
    const bStr = accessToken.replace(/^Bearer\s+/g, "");
    const [header, payload, signature] = bStr.split(".");

    const hStrip = header.replace(/(%..)/g, "");
    // // console.log("Header- ", hStrip);

    const sStrip = signature.replace(/%[^%]*/g, "");
    // // console.log("Signature- ", sStrip);
    const token = `${hStrip}.${payload}.${sStrip}`;
    // // console.log({ accessToken });
    // // console.log({ token });
    const { user_id, prefix, description, body, lang, library } =
        await request.json();

    // console.log({ user_id, prefix, description, body, lang, library });
    const result = validateSnip({
        body,
        description,
        lang,
        library,
        prefix,
        user_id,
    });
    if (result) {
        return json({ message: result.message }, { status: 400 });
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
            library,
        }),
    });
    // // console.log(res.status);
    // // console.log(res.statusText);

    if (res.status === 201)
        return json({ message: "Snip created successfully!" }, { status: 201 });
    else if (res.status !== 200) {
        return json({ message: "Something went wrong" }, { status: 500 });
    }
    return json({ message: "Something went wrong" }, { status: 500 });
};
