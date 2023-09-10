import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { window } from "vscode";

export const read = (filePath: string) => {
    if (existsSync(filePath)) {
        const existingContentRaw = readFileSync(filePath, "utf-8");
        const contentWithoutComments = existingContentRaw.replace(
            /\/\/[^\n]*\n/g,
            ""
        );
        try {
            return JSON.parse(contentWithoutComments);
        } catch (error) {
            console.error(`Error parsing existing snippet content: ${error}`);
            window.showErrorMessage(
                `Error parsing existing snippet content: ${error}`
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
    if (existsSync(filePath)) {
        try {
            writeFileSync(filePath, JSON.stringify(content, null, 4));
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
