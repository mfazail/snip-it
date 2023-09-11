import fetch from "node-fetch";
import { window } from "vscode";

export const fetchlibs = async (langId: string) => {
    // console.log("fetching...");
    const baseUrl = new URL("https://snipit.mfazail.com/api/libs");
    baseUrl.searchParams.set("lang", langId);
    baseUrl.searchParams.set("limit", "10");
    try {
        const res = await fetch(baseUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
                "x-client": "@snip-it/vscode",
            },
        });
        if (res.status == 200) {
            const j: any = await res.json();
            const json: { id: number; name: string; short: string }[] =
                j.libs as {
                    id: number;
                    name: string;
                    short: string;
                }[];
            // console.log({ json });
            const options = json.map((item) => ({
                label: item.name,
                description: item.short,
                id: item.id,
            }));
            return options;
        } else {
            window.showErrorMessage(res.statusText);
            return null;
        }
    } catch (err) {
        window.showErrorMessage(
            "Something went wrong while connecting to server"
        );
        console.log(err);
    }
    return null;
};

export const fetchLibSnips = async (lib_id: number) => {
    const baseUrl = new URL("https://snipit.mfazail.com/api/snips");
    baseUrl.searchParams.set("lib_id", lib_id.toString());
    try {
        const res = await fetch(baseUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
                "x-client": "@snip-it/vscode",
            },
        });
        if (res.status == 200) {
            const j = await res.json();
            return j as {
                prefix: string;
                description: string;
                body: string;
            }[];
        } else {
            window.showErrorMessage(res.statusText);
            return null;
        }
    } catch (err) {
        console.log(err);
        window.showErrorMessage(
            "Something went wrong while connecting to server"
        );
    }
    return null;
};
