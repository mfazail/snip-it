import { window } from "vscode";
import { getUserFolderPath, read, write } from "./read-write";
import path from "path";

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

    const snippetObject = {
      prefix: prefix,
      body: [selectedText],
      description: description ?? defaultDescription,
    };
    const languageId = editor.document.languageId;
    const snippetFolderPath = getUserFolderPath();
    if (!snippetFolderPath) return;
    const snippetFilePath = path.join(snippetFolderPath, `${languageId}.json`);
    const content = read(snippetFilePath);
    if (!content) return;
    content[prefix] = snippetObject;
    write(snippetFilePath, content);
    window.showInformationMessage(
      `Snippet created and can be accessed with \`${prefix}\``
    );
  }
};
