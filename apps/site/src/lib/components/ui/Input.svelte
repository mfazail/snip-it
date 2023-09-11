<script lang="ts">
    export let className: string | null = "";
    export let value: string | null | undefined = "";
    export let inpType = "text";
</script>

{#if inpType == "file"}
    <input
        bind:value
        on:change
        class="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        {...$$restProps} />
{:else}
    <input
        bind:value
        on:change
        on:blur
        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 {className}"
        {...$$restProps} />
{/if}
