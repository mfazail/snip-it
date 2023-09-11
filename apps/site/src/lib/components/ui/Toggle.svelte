<script lang="ts">
    export let checked = false;
    export let size:'default'|'small' = 'default';
    export let className =""
</script>

<label class="relative inline-flex items-center cursor-pointer {className}">
    <input
        type="checkbox"
        class="sr-only peer"
        value=""
        {...$$restProps}
        bind:checked />
    <div
        class="mr-2 {size=='small'?'w-9 h-5 after:h-4 after:w-4':'w-11 h-6 after:h-5 after:w-5'}  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
    <slot />
</label>

