<script lang="ts">
    import Label from "$lib/components/Label.svelte";
    import Select from "$lib/components/Select.svelte";
    import { slide } from "svelte/transition";
    import SnipCard from "$lib/components/SnipCard.svelte";
    import Icon from "@iconify/svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    
    export let data;
    
    let filterOpen = false;
</script>

<div class="max-w-7xl mx-auto min-h-screen px-4">
    <div class="mb-3 flex items-center justify-end">
        <button
            on:click={() => {
                filterOpen = !filterOpen;
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
                        id="lang"
                        placeholder="Select language">
                        <option value="js">JS</option>
                    </Select>
                </div>
                <div>
                    <Label for="library">Library</Label>
                    <Select
                        id="library"
                        placeholder="Select library">
                        <option value="svelte">Svelte</option>
                    </Select>
                </div>
            </div>
        </div>
    {/if}
    <main class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {#each data.snips as snip (snip.id)}
            <SnipCard {snip} />
        {/each}
    </main>
    <Pagination
        totalItems={data.totalSnips} />
</div>
