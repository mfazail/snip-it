import { checkProfileFields } from "$lib/schema/profile.js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
    updateProfile: async ({ locals: { getSession, supabase }, request }) => {
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

        const { error: err } = await supabase
            .from("profile")
            .update(dataToUpdate)
            .eq("user_id", session.user.id);
        const { error: userNameErr } = await supabase.auth.updateUser({
            data: {
                username: username,
            },
        });
        if (userNameErr) {
            return fail(500, {
                avatar: avatar_url || null,
                username,
                name,
                message: userNameErr.message,
                error: true,
            });
        }
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
            name: name,
            avatar: avatar_url,
            username: username,
            success: true,
        };
    },
    updateUser: async ({ locals: { supabase, getSession }, request }) => {
        const session = await getSession();
        if (!session) {
            throw redirect(302, "/signin");
        }
        const data = await request.formData();
        const email = String(data.get("email"));
        const password = String(data.get("password"));
        const new_password = String(data.get("new_password"));

        if (!password) {
            return fail(401, {
                email,
                message: "Password is required!",
                error: true,
            });
        }

        const { error, data: isValid } = await supabase.rpc(
            "verify_user_password",
            {
                password: password,
            }
        );
        if (error) {
            return fail(500, {
                email,
                message: error.message,
                error: true,
            });
        }
        if (!isValid) {
            return fail(401, {
                email,
                message: "Invalid password!",
                error: true,
            });
        }
        if (new_password) {
            const { error: err } = await supabase.auth.updateUser({
                password: new_password,
            });
            if (err) {
                return fail(500, {
                    email,
                    message: err.message,
                    error: true,
                });
            }
        } else {
            if (!email) {
                return fail(401, {
                    email,
                    message: "Email is required!",
                    error: true,
                });
            }
            const { error: err } = await supabase.auth.updateUser({
                email,
                password,
            });
            if (err) {
                return fail(500, {
                    email,
                    message: err.message,
                    error: true,
                });
            }
        }
        return {
            email,
            success: true,
        };
    },
};
