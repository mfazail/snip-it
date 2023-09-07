<script lang="ts">
    import Icon from "@iconify/svelte";
    import { page } from "$app/stores";
    import { joinSearchParams } from "$lib/utils/pagination";
    export let totalItems: number | null = 1;
    let currentPage = 1;
    let limit = 10;
    let totalPages = totalItems! / limit;
    $: currentPage = Number($page.url.searchParams.get("page") ?? "1");
    $: limit = Number($page.url.searchParams.get("limit") ?? "10");
</script>

<nav
    aria-label="Page navigation example"
    class="w-full flex items-center justify-center my-2">
    <ul class="flex items-center -space-x-px h-8 text-sm">
        <li>
            <button disabled={currentPage == 1}>
                <a
                    href="/snips?page={currentPage == 1
                        ? 1
                        : currentPage - 1}&{joinSearchParams(
                        $page.url.searchParams
                    )}"
                    class="link-pagination link-prev">
                    <span class="sr-only">Previous</span>
                    <Icon
                        icon="lucide:chevron-left"
                        class="w-2.5 h-2.5" />
                </a>
            </button>
        </li>
        {#each { length: totalPages / limit } as _, i}
            <li>
                <button disabled={currentPage == i + 1}>
                    {#if currentPage == i + 1}
                        <p class="link-pagination link-active">{currentPage}</p>
                    {:else}
                        <a
                            href="/snips?page={i + 1}{joinSearchParams(
                                $page.url.searchParams
                            )}"
                            aria-current="page"
                            class="link-pagination">
                            {i + 1}
                        </a>
                    {/if}
                </button>
            </li>
        {/each}
        <li>
            <button disabled={currentPage == totalPages}>
                <a
                    href="/snips?page={currentPage + 1}&{joinSearchParams(
                        $page.url.searchParams
                    )}"
                    class="link-pagination link-next">
                    <span class="sr-only">Next</span>
                    <Icon
                        icon="lucide:chevron-right"
                        class="w-2.5 h-2.5" />
                </a>
            </button>
        </li>
    </ul>
</nav>
<p class="text-white">
    {#each $page.url.searchParams.entries() as param}
        {JSON.stringify(param, null, 2)}
    {/each}
</p>

<style lang="postcss">
    .link-pagination {
        @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
    }
    .link-prev {
        @apply ml-0  rounded-l-lg;
    }
    .link-next {
        @apply rounded-r-lg;
    }
    .link-active {
        @apply z-10  text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white;
    }
</style>
