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
        library: {
            name: string | null;
            lang: string[] | null;
        } | null;
    }
    let bg: string = "#282A36";
    export let snip: Props;
    const renderHtml = async () => {
        if (!snip.library) return "";
        var lang = snip.library.lang![0] as Lang;
        if (lang == "vue") {
            lang = "vue-html";
        }
        if (!$shiki?.getLoadedLanguages().includes(lang)) {
            await $shiki?.loadLanguage(lang);
        }
        return $shiki!.codeToHtml(snip.body ?? "", {
            lang: lang ?? "js",
            theme: "dracula",
        });
    };
    const getBodyLength = () => {
        if (!snip.body) {
            return 0;
        }
        return snip.body.split("\n").length;
    };
    const fileicon = () => {
        const lang = snip.library?.lang![0];
        if (lang == "jsx") {
            return "reactjs";
        } else if (lang == "tsx") {
            return "reactts";
        }
        return lang;
    };
</script>

<div
    class="rounded-md min-w-[250px] mt-8 p-4 hover:shadow border dark:border-slate-700"
    class:md:row-span-1={getBodyLength() < 5}
    class:md:row-span-2={getBodyLength() > 5}>
    <div class="flex items-center justify-between w-full">
        <div>
            <h5 class="text-xl font-semibold dark:text-white">{snip.prefix}</h5>
            <p class="text-sm text-slate-600 dark:text-slate-300">
                {snip.description}
            </p>
            <p
                class="text-xs text-blue-600 dark:text-blue-400 underline underline-offset-1">
                {snip.library?.name}
            </p>
        </div>
        <div
            class="bg-slate-50 rounded-full p-2 flex items-center justify-center">
            <Icon
                icon="vscode-icons:file-type-{fileicon()}"
                class="w-5 h-5" />
        </div>
    </div>
    <div
        style="background-color: {bg ?? '#282A36'}"
        class="mt-2 overflow-auto max-h-80 custom-scroll scroll-track-bottom-rounded rounded-md text-sm w-full">
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
        <p class="text-xs dark:text-slate-400 text-slate-600">
            {snip.library?.lang}
        </p>
        <p class="text-xs dark:text-slate-400 text-slate-600">
            Edited at: {formatEditedAt(snip.updated_at)}
        </p>
    </div>
</div>
