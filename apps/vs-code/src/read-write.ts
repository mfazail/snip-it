import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { window } from "vscode";

export const read = (filePath: string) => {
    if (existsSync(filePath)) {
        const existingContentRaw = readFileSync(filePath, "utf-8");
        const contentWithoutComments = existingContentRaw.replace(
            /(?:\n|^)\/\/\s*\s*([\s\S]*?)\n/g,
            ""
        );
        const contentWithoutMultiComments = contentWithoutComments.replace(
            /\/\*[\s\S]*?\*\//g,
            ""
        );
        const removedTrailingComma = contentWithoutMultiComments.replace(/\,(?!\s*?[\{\[\"\'\w])/g,'')
        try {
            return JSON.parse(removedTrailingComma) ?? [];
        } catch (error) {
            console.error(`Error parsing existing snippet content: ${error}`);
            window.showErrorMessage(
                `Error parsing existing snippet content: ${error}`
            );
            window.showErrorMessage(
                `Check comments on file: ${filePath}`
            );
        }
        return null;
    } else {
        window.showInformationMessage(
            `Snippet file dosen't exists \npath: ${filePath}`
        );
        return null;
    }
};

export const write = (filePath: string, content: string) => {
    const parsed = JSON.stringify(content, null, 4);
    const removedTrailingComma = parsed.replace(/\,(?!\s*?[\{\[\"\'\w])/g,'')
    if (existsSync(filePath)) {
        try {
            writeFileSync(filePath, removedTrailingComma);
            return true;
        } catch (error) {
            window.showErrorMessage(`Error saving snippet content: ${error}`);
        }
        return false;
    } else {
        window.showInformationMessage(
            `Snippet file dosen't exists \npath: ${filePath}`
        );
        return false;
    }
};

export const getUserFolderPath = () => {
    let userSnippetFolderPath = "";
    if (process.platform === "win32") {
        if (process.env.APPDATA === undefined) {
            return;
        }
        userSnippetFolderPath = join(
            process.env.APPDATA,
            "Code",
            "User",
            "snippets"
        );
    } else if (process.platform === "darwin") {
        if (process.env.HOME === undefined) {
            return;
        }
        userSnippetFolderPath = join(
            process.env.HOME,
            "Library",
            "Application Support",
            "Code",
            "User",
            "snippets"
        );
    } else {
        if (process.env.HOME === undefined) {
            return;
        }
        userSnippetFolderPath = join(
            process.env.HOME,
            ".config",
            "Code",
            "User",
            "snippets"
        );
    }
    return userSnippetFolderPath;
};
