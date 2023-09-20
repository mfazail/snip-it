import { ExtensionContext, commands } from "vscode";
import { createSnippet } from "./create";
import { deleteSnippet } from "./delete";
import { searchSnips } from "./search";
export function activate(ctx: ExtensionContext) {

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
    let searchDisposable = commands.registerCommand(
        "snip-it.search",
        async () => {
            await searchSnips();
        }
    );
    ctx.subscriptions.push(searchDisposable);
}

export function deactivate() {
    // console.log("deactivate");
}
