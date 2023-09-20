import { window } from "vscode";
import { getUserFolderPath, read, write } from "./read-write";
import { join } from "path";

export const createSnippet = async () => {
    const editor = window.activeTextEditor;
    if (editor) {
        const selection = editor.selection;
        if (selection.isEmpty) {
            window.showInformationMessage("Select to create snippet");
            return;
        }
        const selectedText = editor.document.getText(selection);
        let defaultDescription = "My snippet description";
        const prefix = await window.showInputBox({
            prompt: "Enter the snippet prefix",
            title: "Enter the snippet prefix",
            placeHolder: "Enter the snippet prefix",
        });
        const description = await window.showInputBox({
            prompt: "Enter the snippet description",
            title: "Enter the snippet description",
            placeHolder: "Enter the snippet description",
        });

        if (prefix === undefined) {
            window.showInformationMessage("Prefix is required");
            return;
        }

        const body = sanitizeBody(selectedText);

        const snippetObject = {
            prefix: prefix,
            body,
            description: description ?? defaultDescription,
        };
        const languageId = editor.document.languageId;
        const snippetFolderPath = getUserFolderPath();
        if (!snippetFolderPath) return;
        const snippetFilePath = join(snippetFolderPath, `${languageId}.json`);
        const content = read(snippetFilePath);
        if (!content) return;
        if (content[prefix]) {
            await window.showErrorMessage(
                `There is already a snippet with ${prefix} prefix`
            );
            return;
        }
        content[prefix] = snippetObject;
        write(snippetFilePath, content);
        window.showInformationMessage(
            `Snippet created and can be accessed with \`${prefix}\``
        );
    }
};

const sanitizeBody = (body: string) => {
    if (body.includes("\n")) {
        const tabSize = Number(window.activeTextEditor?.options.tabSize) || 4;
        const arr = body.split("\n");
        return arr.map((line: string) => {
            const leadingSpaces = line.match(/^\s+/);
            if (leadingSpaces) {
                const spaceCount = leadingSpaces[0].length;
                const tabCount = Math.floor(spaceCount / tabSize);
                const tabs = "\t".repeat(tabCount);
                const trimmedStr = line.trim();
                return tabs + trimmedStr;
            }
            return line;
        });
    } else {
        return body;
    }
};
