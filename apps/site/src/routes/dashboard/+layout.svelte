<script>
    import SidebarItem from "$lib/components/SidebarItem.svelte";
    import { page } from "$app/stores";
    import Icon from "@iconify/svelte";
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
</script>

<button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Icon icon="lucide:menu" class="w-5 h-5" />
</button>

<aside
    id="default-sidebar"
    class="fixed top-0 sm:top-[calc(100vh-90vh)] left-0 z-40 w-64 h-screen sm:h-[calc(100vh-75px)] transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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

<div class="p-4 sm:ml-64 sm:h-[calc(100vh-75px)] sm:overflow-y-scroll">
    <slot />
</div>
