<script lang="ts">
    import SnipCard from "$lib/components/SnipCard.svelte";

    export let data;
</script>

<div class="grid grid-cols-1 lg:grid-cols-2">
    {#each data.snips as snip (snip.id)}
        <a href="/dashboard/snip/{snip.id}/edit">
            <SnipCard {snip} />
        </a>
    {/each}
</div>
