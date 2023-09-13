<script lang="ts">
    import Label from "$lib/components/ui/Label.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { slide } from "svelte/transition";
    import SnipCard from "$lib/components/SnipCard.svelte";
    import Icon from "@iconify/svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import { BUNDLED_LANGUAGES } from "shiki";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let data;

    let { snips, totalSnips } = data;
    $: ({ snips, totalSnips } = data);

    let filterOpen = false;
    let libs: any[] = [];
    let isFetchingLibs = false;

    $: lib_id = $page.url.searchParams.get("lib_id");
    $: lang = $page.url.searchParams.get("lang");

    const fetchLibs = async () => {
        isFetchingLibs = true;
        const res = await fetch("/api/libs");
        if (res.ok) {
            const l = await res.json();
            libs = l.libs;
        }
        isFetchingLibs = false;
    };
    const handleLibChange = async (e: Event) => {
        const searchParams = new URLSearchParams($page.url.search);
        searchParams.set("lib_id", (e.target as HTMLSelectElement).value);
        searchParams.delete("page");
        await goto(`/snips?${searchParams.toString()}`);
    };
    const handleLangChange = async (e: Event) => {
        const searchParams = new URLSearchParams($page.url.search);
        searchParams.set("lang", (e.target as HTMLSelectElement).value);
        searchParams.delete("page");
        await goto(`/snips?${searchParams.toString()}`);
    };
</script>

<svelte:head>
    <title>Snip It - Snips</title>
    <meta
        name="description"
        content="A collection of code snippets for various libraries" />
    <meta
        name="og:description"
        content="A collection of code snippets for various libraries" />
    <meta
        name="og:title"
        content="Snip It - Snips" />
    <meta
        name="twitter:title"
        content="Snip It - Snips" />
    <meta
        name="twitter:description"
        content="A collection of code snippets for various libraries" />
    <meta
        name="twitter:label2"
        content="Total Library" />
    <meta
        name="twitter:data2"
        content="16" />
</svelte:head>

<div class="max-w-7xl mx-auto min-h-screen px-4 dark:text-white">
    <div class="mb-3 flex items-center justify-end">
        <button
            on:click={() => {
                filterOpen = !filterOpen;
                if (libs.length == 0) {
                    fetchLibs();
                }
            }}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <Icon
                icon="lucide:sliders-horizontal"
                class="w-4 h-4" />
            <span class="sr-only">Filter</span>
        </button>
    </div>
    {#if filterOpen}
        <div
            transition:slide={{ axis: "y", duration: 300 }}
            class="max-w-7xl mx-auto p-4 text-center bg-white rounded-lg sm:p-8 dark:bg-gray-800">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Filter Snips by Language and Library
            </h5>

            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label for="lang">Language</Label>
                    <Select
                        value={lang}
                        id="lang"
                        on:change={handleLangChange}
                        placeholder="Select language">
                        {#each BUNDLED_LANGUAGES as lang}
                            <option value={lang.id}>{lang.id}</option>
                        {/each}
                    </Select>
                </div>
                <div>
                    <Label for="library">Library</Label>
                    <Select
                        on:change={handleLibChange}
                        value={lib_id}
                        disabled={isFetchingLibs}
                        id="library"
                        placeholder="Select library">
                        {#each libs as lib}
                            <option value={lib.id}>{lib.name}</option>
                        {/each}
                    </Select>
                </div>
            </div>
        </div>
    {/if}
    <main
        class="{snips.length > 0
            ? 'columns-1 md:columns-2 xl:columns-3 gap-3 '
            : 'mt-3'} ">
        {#each snips as snip (snip.id)}
            <SnipCard
                {snip}
                canEdit={data.session ? true : false} />
        {:else}
            <div
                class="max-w-xl mx-auto border border-dashed dark:border-slate-500 w-full h-60 flex items-center justify-center rounded-md dark:bg-slate-700">
                <Icon
                    icon="solar:notification-unread-lines-bold-duotone"
                    class="w-8 h-8 dark:text-slate-100 animate-bounce" />
                <p class="ml-2 md:ml-4 dark:text-slate-300">No Snips found</p>
            </div>
        {/each}
    </main>
    {#if snips.length > 0}
        <Pagination totalItems={totalSnips} />
    {/if}
</div>
