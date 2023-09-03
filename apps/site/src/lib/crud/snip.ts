import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../../supabase/types";
import { redirect } from "@sveltejs/kit";
import { validateSnip } from "$lib/schema/snip";
import { res } from "$lib/utils/responseApiOrAction";

interface SnipCreateParams {
    supa: SupabaseClient<Database>;
    request: Request;
    type: "api" | "action";
    session: Session | null;
}
interface SnipUpdateParams extends SnipCreateParams {
    id: string | undefined;
}

export const createSnip = async ({
    supa,
    request,
    type,
    session,
}: SnipCreateParams) => {
    if (!session) {
        return res(type, 403, { message: "Not authorized" });
    }
    const user_id = session.user.id;
    const data = await request.formData();
    const prefix = String(data.get("prefix"));
    const body = String(data.get("body"));
    const description = String(data.get("description"));
    const lang = String(data.get("lang"));
    const library = String(data.get("library"));
    const result = validateSnip({
        user_id,
        prefix,
        body,
        description,
        lang,
        library,
    });
    if (result) {
        return res(type, 400, {
            prefix,
            body,
            description,
            lang,
            library,
            message: result.message,
        });
    }

    const { error } = await supa.from("snip").insert({
        user_id,
        prefix,
        body,
        description,
        lang,
        library,
    });
    if (error) {
        return res(type, 500, {
            prefix,
            body,
            description,
            lang,
            library,
            message: error.message,
        });
    }
    if (type == "action") throw redirect(302, `/dashboard/snip`);
    else return res(type, 201, { messgae: "Snip created successfully!" });
};

export const updateSnip = async ({
    request,
    session,
    supa,
    type,
    id,
}: SnipUpdateParams) => {
    if (!session) {
        return res(type, 403, { message: "Not authorized" });
    }
    const data = await request.formData();
    const prefix = String(data.get("prefix"));
    const body = String(data.get("body"));
    const description = String(data.get("description"));
    const lang = String(data.get("lang"));
    const library = String(data.get("library"));
    const result = validateSnip({
        user_id: session.user.id,
        prefix,
        body,
        description,
        lang,
        library,
    });
    if (result) {
        return res(type, 400, {
            prefix,
            body,
            description,
            lang,
            library,
            message: result.message,
        });
    }

    if (!id) {
        return res(type, 400, {
            prefix,
            body,
            description,
            lang,
            library,
            message: "id is required",
        });
    }
    const { error } = await supa
        .from("snip")
        .update({ prefix, body, description, lang, library })
        .eq("id", id);

    if (error) {
        return res(type, 500, {
            prefix,
            body,
            description,
            lang,
            library,
            message: error.message,
        });
    }
    if (type == "action") throw redirect(302, `/dashboard/snip`);
    else return res(type, 201, { messgae: "Snip updated successfully!" });
};
