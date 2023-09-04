import { json, type RequestHandler } from "@sveltejs/kit";
import {
    PUBLIC_SUPABASE_ANON_KEY,
    PUBLIC_SUPABASE_URL,
} from "$env/static/public";
export const POST: RequestHandler = async ({ fetch, request }) => {
    const accessToken = request.headers.get("authorization");
    if (!accessToken)
        return json({ message: "Not signed in" }, { status: 401 });
    const res = await fetch(`${PUBLIC_SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: {
            apikey: PUBLIC_SUPABASE_ANON_KEY,
            authorization: accessToken,
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200)
        return json({ message: "Sign out failed" }, { status: 400 });
    const j = await res.json();
    // console.log({ j });

    return json({ message: "Signed out" }, { status: 200 });
};
