import { join } from "path";
import { window } from "vscode";
import { getUserFolderPath, read, write } from "./read-write";

export const deleteSnippet = async () => {
  const editor = window.activeTextEditor;
  if (editor) {
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
    window.showInformationMessage(`Snippet deleted with prefix ${prefix}`);
  }
};
