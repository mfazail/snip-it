<script lang="ts">
  import { alerts } from "$lib/store/useAlert";
</script>

<div class="fixed bottom-4 right-4">
  {#if $alerts}
    {#each $alerts as alert (alert.id)}
      <div>
        <h1>{alert.title}</h1>
        <p>{alert.description}</p>
      </div>
    {/each}
  {/if}
</div>
