<script lang="ts">
    export let className: string | null = "";
    export let value =""
</script>

<input
    bind:value
    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 {className}"
    {...$$restProps} />
