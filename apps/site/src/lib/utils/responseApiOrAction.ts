import { fail, json } from "@sveltejs/kit";

/**
 * Returns response whether it api call or actions
 *
 * @param type
 * @param status
 * @param data
 * @returns
 */
export const res = (type: "action" | "api", status: number, data: any) => {
    if (type == "action") {
        return fail(status, data);
    } else {
        return json({ message: data.message }, { status });
    }
};
