import { checkProfileFields } from "$lib/schema/profile.js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    update: async ({ locals: { getSession, supabase }, request }) => {
        const session = await getSession();
        if (!session) {
            throw redirect(302, "/signin");
        }
        const data = await request.formData();
        const avatar = data.get("avatar") as File;
        const avatar_url = String(data.get("avatar_url"));
        const username = String(data.get("username"));
        const name = String(data.get("name"));
        const fieldErr = checkProfileFields({ name, username });
        if (fieldErr) {
            return fail(401, {
                avatar: null,
                username,
                name,
                message: fieldErr.message,
                error: true,
            });
        }
        let dataToUpdate: {
            avatar_url?: string | null;
            username?: string | null;
            name?: string | null;
        } = {};
        if (username) {
            const { data: un, error: err } = await supabase
                .from("profile")
                .select("user_id,username")
                .eq("username", username)
                .maybeSingle();
            if (err) {
                return fail(500, {
                    avatar: null,
                    username,
                    name,
                    message: err.message,
                    error: true,
                });
            }
            if (un?.username) {
                if (un.user_id != session.user.id)
                    return fail(403, {
                        avatar: null,
                        username,
                        name,
                        message: "Username already taken!",
                        error: true,
                    });
            }
            dataToUpdate["username"] = username;
        }
        if (avatar_url) {
            dataToUpdate.avatar_url = avatar_url;
        }
        if (avatar) {
            console.log("uploading avatar");
            const ext = avatar.name.split(".").pop();
            const filename = `${new Date().toISOString()}-avatar.${ext}`;
            const { data: upload, error: uploadErr } = await supabase.storage
                .from("avatars")
                .upload(`${session.user.id}/${filename}`, avatar);
            if (uploadErr) {
                return fail(500, {
                    avatar: null,
                    username,
                    name,
                    message: uploadErr.message,
                    error: true,
                });
            }
            dataToUpdate["avatar_url"] = upload.path;
            console.log("uploaded avatar");
        }
        if (name) dataToUpdate["name"] = name;

        const { error: err, data: profile } = await supabase
            .from("profile")
            .update(dataToUpdate)
            .eq("user_id", session.user.id)
            .select("avatar_url,name,username")
            .maybeSingle();
        if (err) {
            return fail(500, {
                avatar: null,
                name,
                username,
                message: err.message,
                error: true,
            });
        }
        return {
            name: profile?.name,
            avatar: profile?.avatar_url,
            username: profile?.username,
            success: true,
        };
    },
};
