<script lang="ts">
    import Pagination from "$lib/components/Pagination.svelte";
    import SnipCard from "$lib/components/SnipCard.svelte";

    export let data;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
    {#each data.snips as snip (snip.id)}
        <a href="/dashboard/snip/{snip.id}/edit">
            <SnipCard {snip} />
        </a>
    {/each}
</div>
{#if data.snips.length > 0}
    <Pagination
        depends="dashboard:snips"
        totalItems={data.totalSnips} />
{/if}
