import { ExtensionContext, commands } from "vscode";
import { createSnippet } from "./create";
import { deleteSnippet } from "./delete";
export function activate(ctx: ExtensionContext) {
  console.log("activate");

  let createDisposable = commands.registerCommand(
    "snip-it.create",
    async () => {
      await createSnippet();
    }
  );
  ctx.subscriptions.push(createDisposable);
  let deleteDisposable = commands.registerCommand(
    "snip-it.delete",
    async () => {
      await deleteSnippet();
    }
  );
  ctx.subscriptions.push(deleteDisposable);
}

export function deactivate() {
  console.log("deactivate");
}
