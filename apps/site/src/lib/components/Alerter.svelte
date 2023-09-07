<script lang="ts">
    import { alerts, useAlert } from "$lib/store/useAlert";
    import Icon from "@iconify/svelte";
    import { fly } from "svelte/transition";
    const { remove } = useAlert();
</script>

<div class="dark:text-white fixed bottom-4 right-4 space-y-3">
    {#if $alerts}
        {#each $alerts as alert (alert.id)}
            <div
                transition:fly={{ x: 100 }}
                class="min-w-[300px] relative px-5 py-3 border border-slate-700 rounded-md"
                class:border-red-500={alert.variant == "error"}
                class:border-green-500={alert.variant == "success"}>
                <h3
                    class:text-red-600={alert.variant == "error"}
                    class:text-green-600={alert.variant == "success"}>
                    Hello
                </h3>
                <p
                    class="text-sm"
                    class:text-slate-400={alert.variant == "info"}
                    class:text-red-500={alert.variant == "error"}
                    class:text-green-500={alert.variant == "success"}>
                    Some cute little message
                </p>
                <button
                    class="absolute right-2 top-3"
                    on:click={() => {
                        remove(alert.id ?? "");
                    }}
                    ><Icon
                        icon="lucide:x"
                        class="{alert.variant == 'error'
                            ? 'text-red-500'
                            : ''} {alert.variant == 'success'
                            ? 'text-green-500'
                            : ''}" /></button>
            </div>
        {/each}
    {/if}
</div>
