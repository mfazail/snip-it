<script lang="ts">
    import { formatEditedAt } from "$lib/utils/date";
    import { shiki } from "$lib/store/shiki";
    import Icon from "@iconify/svelte";
    import type { Lang } from "shiki";
    interface Props {
        id: number;
        prefix: string;
        description: string | null;
        body: string | null;
        updated_at: string | null;
        lang: string | null;
        library: {
            name: string | null;
        } | null;
    }
    let bg: string = "#282A36";
    export let snip: Props;
    const renderHtml = async () => {
        if (!$shiki?.getLoadedLanguages().includes(snip.lang as Lang)) {
            await $shiki?.loadLanguage(snip.lang as Lang);
        }
        return $shiki!.codeToHtml(snip.body ?? "", {
            lang: snip.lang ?? "js",
            theme: "dracula",
        });
    };
    const getBodyLength = () => {
        if (!snip.body) {
            return 0;
        }

        return snip.body.split("\n").length;
    };
</script>

<div
    class="rounded-md min-w-[250px] mt-8 p-4 hover:shadow border dark:border-slate-700"
    class:md:row-span-1={getBodyLength() < 4}
    class:md:row-span-2={getBodyLength() > 4}>
    <div class="flex items-center justify-between w-full">
        <div>
            <h5 class="text-xl font-semibold dark:text-white">{snip.prefix}</h5>
            <p class="text-sm text-slate-600 dark:text-slate-300">
                {snip.description}
            </p>
            <p class="text-xs text-blue-600 dark:text-blue-400 underline underline-offset-1">
                {snip.library?.name}
            </p>
        </div>
        <Icon
            icon="vscode-icons:file-type-{snip.lang}"
            class="w-6 h-6" />
    </div>
    <div
        style="background-color: {bg ?? '#282A36'}"
        class="mt-2 overflow-y-auto custom-scroll scroll-track-bottom-rounded rounded-md text-sm w-full">
        {#if $shiki}
            <div class="p-2">
                {#await renderHtml() then co}
                    {@html co}
                {/await}
            </div>
        {:else}
            <div class="w-full h-60 bg-slate-400 animate-pulse rounded-md" />
        {/if}
    </div>
    <div class="flex items-center justify-between mt-1">
        <p class="text-xs dark:text-slate-400 text-slate-600">{snip.lang}</p>
        <p class="text-xs dark:text-slate-400 text-slate-600">
            Edited at: {formatEditedAt(snip.updated_at)}
        </p>
    </div>
</div>
