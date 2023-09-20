<script>
    import Icon from "@iconify/svelte";
    export let title = "";
    export let icon = "";
    export let className = "";
    export let light = false;
</script>

<div
    class="absolute w-full {className}"
    {...$$restProps}>
    <div
        class="pt-4 shadow-lg text-sm font-mono subpixel-antialiased pb-6 rounded-lg leading-normal overflow-hidden"
        class:bg-gray-800={!light}
        class:bg-white={light}
        class:text-gray-100={!light}
        class:text-gray-800={light}>
        <div
            class="window-header flex justify-between items-center border-b px-5"
            class:border-gray-700={!light}>
            <div class="top mb-2 flex">
                <div class="h-3 w-3 bg-red-500 rounded-full" />
                <div class="ml-2 h-3 w-3 bg-orange-300 rounded-full" />
                <div class="ml-2 h-3 w-3 bg-green-500 rounded-full" />
            </div>
            <h3 class="window-title font-semibold">{title}</h3>
            <Icon {icon} />
        </div>
        <div class="mt-4 flex flex-col px-5">
            <slot />
        </div>
    </div>
</div>
