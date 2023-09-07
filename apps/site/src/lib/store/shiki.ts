import { type Highlighter, setCDN } from "shiki";
import { writable } from "svelte/store";
export let shiki = writable<Highlighter | undefined>();

export const initShiki = async () => {
    setCDN("https://unpkg.com/shiki/")
    shiki.set(
        await (
            await import("shiki")
        ).getHighlighter({
            themes: ["dracula"],
            langs: ["js", "javascript"],
        })
    );
};
