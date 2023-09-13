<script lang="ts">
    import Icon from "@iconify/svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { paginate, PaginationNav } from "svelte-paginate";
    import { value } from "valibot";
    export let totalItems: number | undefined = 1;

    let currentPage = 1;
    let perPage = 10;
    $: totalPages = Math.floor(totalItems! / perPage);
    $: currentPage = Number($page.url.searchParams.get("page") ?? "1");

    $: items = Array.from(Array(totalItems));
    let pageSize = 4;
    $: paginatedItems = paginate({ items, pageSize, currentPage });
    const prev = async () => {
        if (currentPage == 1) return;
        const p = currentPage == 1 ? 1 : currentPage - 1;
        const searchParams = new URLSearchParams($page.url.search);
        searchParams.set("page", p.toString());
        const url = $page.url.pathname;
        await goto(`${url}?${searchParams.toString()}`);
    };
    const next = async () => {
        if (currentPage == Math.ceil(totalPages)) return;
        const p = currentPage + 1;
        const searchParams = new URLSearchParams($page.url.search);
        searchParams.set("page", p.toString());
        const url = $page.url.pathname;
        await goto(`${url}?${searchParams.toString()}`);
    };
    const toPage = async (i: number) => {
        const searchParams = new URLSearchParams($page.url.search);
        searchParams.set("page", i.toString());
        const url = $page.url.pathname;
        await goto(`${url}?${searchParams.toString()}`);
    };
</script>


<PaginationNav
    showStepOptions
    {currentPage}
    limit={1}
    pageSize={10}
    {totalItems}>
    <button
        slot="prev"
        class="link-pagination link-prev"
        disabled={currentPage == 1}
        on:click={prev}>
        <span class="sr-only">Previous</span>
        <Icon
            icon="lucide:chevron-left"
            class="w-2.5 h-2.5" />
    </button>
    <button
        let:value={number}
        slot="number"
        on:click={() => {
            toPage(number);
        }}
        disabled={currentPage == number}>
        <p
            class:link-active={currentPage == number}
            class="link-pagination a">
            {number}
        </p>
    </button>
    <p
        slot="ellipsis"
        class="link-pagination">
        ...
    </p>
    <button
        slot="next"
        class="link-pagination link-next"
        on:click={next}
        disabled={currentPage == Math.ceil(totalPages)}>
        <span class="sr-only">Next</span>
        <Icon
            icon="lucide:chevron-right"
            class="w-2.5 h-2.5" />
    </button>
</PaginationNav>

<style lang="postcss">
    :global(.pagination-nav){
        @apply w-full flex items-center justify-center py-10 ;
    }
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
