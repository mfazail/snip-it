<script lang="ts">
    import { initShiki, shiki } from "$lib/store/shiki";
    import { onMount } from "svelte";
    onMount(() => {
        if (!$shiki) initShiki();
    });
</script>
<slot />