import { window } from "vscode";
import { getUserFolderPath, read, write } from "./read-write";
import { join } from "path";
import { LibMetadata, fetchLibSnips, fetchlibs } from "./api";

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
    let selectedLib:
        | { label: string; path: string; description: string; langs: string[] }
        | undefined;
    window.showInformationMessage("Fetching libraries");
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
    selectedLib.langs.forEach(async (lang) => {
        const snips = await fetchLibSnips(selectedLib!.path, lang);
        if (!snips || snips.length == 0) {
            window.showInformationMessage("No snips related to this library");
            return;
        }
        // console.log({ snip: snips[0] });
        const userPath = getUserFolderPath();
        if (!userPath) return;
        const filePath = join(userPath, `${lang}.json`);
        if (!filePath) {
            window.showErrorMessage("User path not defined");
            return;
        } else {
            const existingContent = read(filePath);
            snips.forEach(({ prefix, body, description }) => {
                const p = `${selectedLib!.description}:${prefix}`;
                existingContent[p] = {
                    prefix: p,
                    body,
                    description,
                };
            });
            write(filePath, existingContent);
            window.showInformationMessage("Snips added successfully");
        }
    });
};
