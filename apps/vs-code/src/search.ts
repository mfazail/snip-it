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
    const processChanges = debounce((v) => fetchlibs(v, langId || "js"));
    const p = window.createQuickPick();
    p.placeholder = "e.g. shadcn/ui, vuetify, etc";
    p.show();
    p.onDidChangeSelection(async (e) => {
        if (e[0] && e[0].label) {
            console.log("selection", e[0].label);
            // hide it
            p.hide();
            // fetch all snippet with selectedLib
            const snips = await fetchLibSnips(e[0].label);
            // then write to snippet file
            if (snips) {
                const userPath = getUserFolderPath();
                if (!userPath) return;
                const filePath = path.join(userPath, `${langId}.json`);
                if (!filePath) {
                    window.showErrorMessage("User path not defined");
                    return;
                } else {
                    const existingContent = read(filePath);
                    snips.forEach(({ prefix, body, description }) => {
                        existingContent[prefix] = {
                            prefix,
                            body,
                            description,
                        };
                    });
                    write(filePath, existingContent);
                    window.showInformationMessage("Snips added successfully");
                }
            }
        }
    });
    p.onDidChangeValue(async (v) => {
        p.busy = true;
        console.log("value", v);
        if (v) {
            const options = await processChanges(v);
            console.log({options})
            if (!options) {
                window.showInformationMessage("No results found");
            }
            p.items = options||[];
        }
        p.busy = false;
    });

    p.onDidAccept(() => {
        console.log("accepted");
        p.hide();
        // fetch all snippet with selectedLib
        // then write to snippet file
    });
    p.onDidHide(() => {
        p.dispose();
    });
    // console.log("finished");
};

function debounce(
    func: (e: string) => Promise<any>,
    timeout: number = 300
): (e: string) => Promise<any> {
    let timer: any;
    return (...args: []): any => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
        }, timeout);
    };
}

const fetchlibs = async (search: string, langId: string) => {
    const baseUrl = new URL("https://snipit.mfazail.com/api/libs");
    baseUrl.searchParams.set("name", search);
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
            const json: { id: number; name: string; short: string }[] =
                res.data as {
                    id: number;
                    name: string;
                    short: string;
                }[];
            const options = json.map((item) => ({
                label: item.name,
                description: item.short,
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

const fetchLibSnips = async (lib: string) => {
    const baseUrl = new URL("https://snipit.mfazail.com/api/snips");
    baseUrl.searchParams.set("select", "prefix,description,body");
    baseUrl.searchParams.set("lib_id", lib);
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
