<script lang="ts">
    import Pagination from "$lib/components/Pagination.svelte";
    import SnipCard from "$lib/components/SnipCard.svelte";

    export let data;

    let { snips, totalSnips } = data;
    $: ({ snips, totalSnips } = data);
</script>

<div class="columns-1 md:columns-2 xl:columns-3 gap-3">
    {#each snips as snip (snip.id)}
        <SnipCard {snip} canEdit />
    {/each}
</div>
{#if snips.length > 0}
    <Pagination totalItems={totalSnips} />
{/if}
