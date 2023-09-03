import { json, type RequestHandler } from "@sveltejs/kit";
import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";

export const POST: RequestHandler = async ({ fetch, request }) => {
    const { email, password } = await request.json();
    if (!email || !password)
        return json(
            { message: "Email and password are required" },
            { status: 400 }
        );

    const res = await fetch(
        `${PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                apikey: PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json",
            },
        }
    );
    if (res.status !== 200)
        return json({ message: "Sign in failed" }, { status: 400 });

    const {
        access_token,
        refresh_token,
        user: { id },
    } = await res.json();
    return json(
        {
            message: "Sign in successful!",
            access_token,
            refresh_token,
            user_id: id,
        },
        { status: 200 }
    );
};
