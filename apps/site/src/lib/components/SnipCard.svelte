<script lang="ts">
    import { formatEditedAt } from "$lib/utils/date";
    import { codeToHtml } from "shikiji";
    import type { SpecialLanguage } from "shikiji/core";
    import Icon from "@iconify/svelte";
    interface Props {
        id: number;
        prefix: string;
        description: string | null;
        created_at: string | null;
        body: string | null;
        updated_at: string | null;
        lang: string | null;
        library: string | null;
    }
    let bg: string ='#282A36';
    export let snip: Props;
    const ht = async () => {
        return codeToHtml(snip.body ?? "", {
            lang: (snip.lang ?? "text") as SpecialLanguage,
            theme: "dracula",
        });
    };

</script>

<div class="rounded-md p-4 hover:shadow border">
    <div class="flex items-center justify-between w-full">
        <div>
            <h5 class="text-xl font-semibold">{snip.prefix}</h5>
            <p class="text-sm text-slate-600">{snip.description}</p>
        </div>
        <Icon
            icon="vscode-icons:file-type-{snip.lang}"
            class="w-6 h-6" />
    </div>
    <div
        style="background-color: {bg ?? '#282A36'}"
        class="mt-2 overflow-y-auto custom-scroll rounded-md text-sm w-full">
        {#await ht()}
            <div
                class="h-40 animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 w-full" />
        {:then v}
            <div class="p-2">
                {@html v}
            </div>
        {/await}
    </div>
    <div class="flex items-center justify-between mt-1">
        <p class="text-xs text-slate-600">{snip.lang}</p>
        <p class="text-xs text-slate-600">
            Edited at: {formatEditedAt(snip.updated_at)}
        </p>
    </div>
</div>
