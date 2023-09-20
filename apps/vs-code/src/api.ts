import fetch from "node-fetch";
import { window } from "vscode";

export interface Lib {
    prefix: string;
    body: string | string[];
    description: string;
}

export interface LibMetadata {
    name: string;
    path: string;
    short: string;
    langs: string[];
}

const branch: "main" | "dev" = 'main';

const _baseUrl = `https://raw.githubusercontent.com/mfazail/snip-it/${branch}/snips`;

export const fetchlibs = async (langId: string) => {
    // console.log("fetching...");
    const baseUrl = new URL(`${_baseUrl}/_libs.json`);
    try {
        const res = await fetch(baseUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status == 200) {
            const json: LibMetadata[] | undefined =
                (await res.json()) as LibMetadata[];
            if (!json) throw new Error("Invalid response");
            // console.log({ json });
            const options = json
                .filter((item) => item.langs.includes(langId))
                .map((item) => ({
                    label: item.name,
                    path: item.path,
                    description: item.short,
                    langs: item.langs,
                }));
            return options;
        } else {
            window.showErrorMessage(res.statusText);
            return null;
        }
    } catch (err) {
        window.showErrorMessage(
            "Something went wrong while connecting to Internet!"
        );
        console.log(err);
    }
    return null;
};

export const fetchLibSnips = async (path: string, lang: string) => {
    if (!path || !lang) {
        window.showErrorMessage("Invalid path or language");
        return null;
    }
    const baseUrl = new URL(`${_baseUrl}${path}/${lang}.json`);
    try {
        const res = await fetch(baseUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status == 200) {
            const j = await res.json();
            return j as Lib[];
        } else {
            window.showErrorMessage(res.statusText);
            return null;
        }
    } catch (err) {
        console.log(err);
        window.showErrorMessage(
            "Something went wrong while connecting to Internet!"
        );
    }
    return null;
};
