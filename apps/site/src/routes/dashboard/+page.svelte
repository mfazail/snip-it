<script lang="ts">
    export let data;
</script>

<div class="min-h-screen sm:min-h-fit dark:text-white">
    <h2 class="text-xl font-bold mb-5">Total snips created: </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.data as lib}
            <div
                class="flex justify-between items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <p class="font-normal text-gray-700 dark:text-gray-400">
                    {lib.lib}
                </p>
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {lib.total_snips}
                </h5>
            </div>
        {/each}
    </div>
</div>
