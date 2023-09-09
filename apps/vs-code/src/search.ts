import { window } from "vscode";
import axios from "axios";
import { getUserFolderPath, read, write } from "./read-write";
import path from "path";

export const searchSnips = async () => {
    const editor = window.activeTextEditor;
    const langId = editor?.document.languageId;
    if (!langId) {
        const langId = await window.showInputBox({
            prompt: "Enter language",
        });
        if (!langId) {
            return;
        }
    }
    let selectedLib:any;
    window.showInformationMessage("Fetching libraries")
    const libs = await fetchlibs(langId || "js");
    if (!libs) {
        window.showInformationMessage("Empty items");
        return;
    }

    selectedLib = await window.showQuickPick(libs, {
        placeHolder: "Select a library",
        canPickMany: false,
    });
    if (!selectedLib) {
        window.showInformationMessage("No library selected!");
        return;
    }
    const snips = await fetchLibSnips(selectedLib.id);
    if (!snips) {
        window.showInformationMessage("No snips related to this library");
        return;
    }
    console.log({snips})
    const userPath = getUserFolderPath();
    if (!userPath) return;
    const filePath = path.join(userPath, `${langId}.json`);
    if (!filePath) {
        window.showErrorMessage("User path not defined");
        return;
    } else {
        const existingContent = read(filePath);
        snips.forEach(({ prefix, body, description }) => {
            const p = `${selectedLib.description}:${prefix}`
            existingContent[p] = {
                prefix:p,
                body,
                description,
            };
        });
        write(filePath, existingContent);
        window.showInformationMessage("Snips added successfully");
    }
};


const fetchlibs = async (langId: string) => {
    console.log("fetching...");
    const baseUrl = new URL("https://snipit.mfazail.com/api/libs");
    baseUrl.searchParams.set("lang", langId);
    baseUrl.searchParams.set("limit", "10");
    try {
        const res = await axios.get(baseUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
                "x-client": "@snip-it/vscode",
            },
        });
        if (res.status == 200) {
            const json: { id: number; name: string; short: string }[] = res.data
                .libs as {
                id: number;
                name: string;
                short: string;
            }[];
            console.log({ json });
            const options = json.map((item) => ({
                label: item.name,
                description: item.short,
                id: item.id
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

const fetchLibSnips = async (lib_id:number) => {
    const baseUrl = new URL("https://snipit.mfazail.com/api/snips");
    baseUrl.searchParams.set("lib_id", lib_id.toString());
    try {
        const res = await axios.get(baseUrl.toString(), {
            headers: {
                "Content-Type": "application/json",
                "x-client": "@snip-it/vscode",
            },
        });
        if (res.status == 200) {
            return res.data as {
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
