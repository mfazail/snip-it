import {
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    if(event.url.pathname.startsWith('/api')){
        if(event.request.method === 'OPTIONS'){
            return new Response(null,{
                headers:{
                    'Access-Control-Allow-Methods':'GET, POST',
                    'Access-Control-Allow-Origin':"*",
                    'Access-Control-Allow-Headers':'*',
                }
            })
        }
    }

    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    });

    /**
     * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
     */
    event.locals.getSession = async () => {
        try {
            const {
                data: { session },
            } = await event.locals.supabase.auth.getSession();
            // // console.log('getSession', session)
            return session;
        } catch (e) {
            // console.log('getSession', e)
            return null;
        }
    };

    const res = await  resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === "content-range";
        },
    });
    if(event.url.pathname.startsWith('/api')){
        res.headers.append('Access-Control-Allow-Origin', `*`);
    }
    return res
};
