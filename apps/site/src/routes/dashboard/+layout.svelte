<script>
    import SidebarItem from "$lib/components/SidebarItem.svelte";
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import Icon from "@iconify/svelte";
    import { onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    const sidebarItems = [
        {
            href: "/dashboard",
            title: "Dashboard",
            icon: "lucide:layout-template",
        },
        {
            href: "/dashboard/profile",
            title: "Profile",
            icon: "lucide:user",
        },
        {
            href: "/dashboard/snip",
            title: "Snips",
            icon: "lucide:scan-line",
        },
        {
            href: "/dashboard/snip/create",
            title: "Create Snip",
            icon: "lucide:plus",
        },
    ];

    let isSidebarOpen = false;

    onMount(() => {
        if (browser) document.body.classList.add("sm:overflow-hidden");
    });
    onDestroy(() => {
        if (browser) document.body.classList.remove("sm:overflow-hidden");
    });
</script>

<button
    on:click={() => {
        isSidebarOpen = true;
    }}
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Icon
        icon="lucide:menu"
        class="w-5 h-5" />
</button>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    transition:fade
    on:click={() => {
        isSidebarOpen = false;
    }}
    class:block={isSidebarOpen}
    class:hidden={!isSidebarOpen}
    class="w-full h-screen dark:bg-slate-800/50 fixed top-0 left-0 z-10 transition" />
<aside
    class:translate-x-0={isSidebarOpen}
    class:-translate-x-full={!isSidebarOpen}
    class="fixed top-0 sm:top-[calc(100vh-90vh)] left-0 z-40 w-64 h-screen sm:h-[calc(100vh-75px)] transition-transform sm:translate-x-0"
    aria-label="Sidebar">
    <div
        class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-800 sm:dark:bg-slate-900 md:border-r dark:border-slate-700">
        <ul class="space-y-2 font-medium">
            {#each sidebarItems as item}
                <SidebarItem
                    item={{
                        active: $page.url.pathname == item.href,
                        href: item.href,
                        title: item.title,
                    }}>
                    <Icon
                        icon={item.icon}
                        class="w-5 h-5" />
                </SidebarItem>
            {/each}
        </ul>
    </div>
</aside>
<div class="p-4 sm:ml-64 sm:h-[calc(100vh-70px)] sm:overflow-y-scroll">
    <slot />
</div>
