import { PUBLIC_SUPABASE_URL } from "$env/static/public";

/**
 * Path to storage public bucket
 * `Note: ` Dont work with private bucket
 * @param path
 * @returns
 */

export const publicAvatarUrl = (path: string | null | undefined) => {
    if (!path) return "";
    if (path.startsWith("https")) return path;
    if (path.startsWith("data")) return path;
    return `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${path}`;
};

export const whetherToShowAvatarUrl = (url: string | null | undefined) => {
    if (!url) return url;
    if (url.startsWith("https")) return url;
    return "";
};
