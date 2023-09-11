import { join } from "path";
import { window } from "vscode";
import { getUserFolderPath, read, write } from "./read-write";
import { fetchlibs } from "./api";

export const deleteSnippet = async () => {
    const editor = window.activeTextEditor;
    if (editor) {
        const option = await window.showQuickPick(
            [
                { label: "Only one", id: 0 },
                { label: "library", id: 1 },
            ],
            {
                title: "Select method",
                placeHolder: "Select what type of delete you want to perform",
            }
        );
        if (!option) {
            return;
        }
        if (option.id == 0) {
            const prefix = await window.showInputBox({
                prompt: "Enter prefix that you want delete",
                placeHolder: "Enter prefix that you want delete",
            });
            if (!prefix) {
                window.showErrorMessage("Prefix is required");
                return;
            }
            const languageId = editor.document.languageId;
            const userSnippetFolderPath = getUserFolderPath();
            if (!userSnippetFolderPath) return;
            const filePath = join(userSnippetFolderPath, `${languageId}.json`);
            const content = read(filePath);
            if (!content) return;
            delete content[prefix];
            write(filePath, content);
            window.showInformationMessage(
                `Snippet deleted with prefix ${prefix}`
            );
        } else if (option.id == 1) {
            const langId = editor.document.languageId;
            const libs = await fetchlibs(langId);
            if (!libs) {
                window.showInformationMessage(
                    `No libs found with ${langId} language`
                );
                return;
            }
            const selectedLib = await window.showQuickPick(libs, {
                title: "Select a library",
                placeHolder: "Select a library to delete all its snips",
            });
            if (!selectedLib) {
                return;
            }
            const userSnippetFolderPath = getUserFolderPath();
            if (!userSnippetFolderPath) return;
            const filePath = join(userSnippetFolderPath, `${langId}.json`);
            const content = read(filePath);
            if (!content) return;
            content.forEach((s: any) => {
                if (s.prefix.include(selectedLib.description)) {
                    delete content[s.prefix];
                }
            });
            write(filePath, content);
            window.showInformationMessage(
                `All Snippet deleted from library ${selectedLib.label}`
            );
        }
    }
};
