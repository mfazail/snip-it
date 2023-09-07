<script lang="ts">
    import { initShiki, shiki } from "$lib/store/shiki";
    import { onMount } from "svelte";
    onMount(async () => {
        if (!$shiki) await initShiki();
    });
</script>
<slot />