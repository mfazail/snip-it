<script lang="ts">
    import Icon from "@iconify/svelte";
    import Button from "./ui/Button.svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { slide } from "svelte/transition";
    import Logo from "./Logo.svelte";

    export let isSignedin: boolean;

    let navOpen = false;
    const handleKeydown = async (e: KeyboardEvent) => {
        if (e.code == "Enter") {
            $page.url.searchParams.set(
                "name",
                (e.target as HTMLInputElement).value
            );
            await goto(`/snips?${$page.url.searchParams.toString()}`);
        }
    };

    const toggleNav = () => {
        navOpen = !navOpen;
    };
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
        class:max-w-screen-xl={!$page.url.pathname.startsWith("/dashboard")}
        class="flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div class="flex md:order-2">
            <button
                on:click={toggleNav}
                type="button"
                class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                <Icon
                    icon="lucide:search"
                    class="w-5 h-5" />
                <span class="sr-only">Search</span>
            </button>
            <div class="relative hidden md:flex items-center">
                <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon
                        icon="lucide:search"
                        class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="sr-only">Search icon</span>
                </div>

                <input
                    on:keydown={handleKeydown}
                    type="text"
                    id="search-navbar-desktop"
                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..." />
                {#if !isSignedin}
                    <a href="/signin">
                        <Button className="ml-3">Login</Button>
                    </a>
                {:else}
                    <a href="/dashboard">
                        <Button className="ml-3">Dashboard</Button>
                    </a>
                    <a
                        href="/signout"
                        class="block ml-2 outline dark:outline-blue-500 hover:dark:bg-blue-500/70 p-2 rounded-md dark:text-white">
                        <Icon icon="solar:logout-bold-duotone" />
                    </a>
                {/if}
            </div>
            <Button
                on:click={toggleNav}
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open main menu</span>
                <Icon
                    icon="lucide:menu"
                    class="w-5 h-5 " />
            </Button>
            {#if isSignedin}
                <a
                    href="/signout"
                    title="Sign out"
                    class="md:hidden flex items-center justify-center hover:dark:bg-blue-500/70 w-10 h-10 rounded-md dark:text-white">
                    <Icon icon="solar:logout-bold-duotone" />
                </a>
            {/if}
        </div>
        <div
            class:block={navOpen}
            class:hidden={!navOpen}
            transition:slide={{ axis: "y" }}
            class="md:flex items-center justify-between w-full md:w-auto md:order-1 transition-all">
            <div class="relative mt-3 md:hidden">
                <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon
                        icon="lucide:search"
                        class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                    on:keydown={handleKeydown}
                    type="text"
                    id="search-navbar"
                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..." />
            </div>
            <ul
                class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a
                        href="/"
                        class={`block py-2 pl-3 pr-4 ${
                            $page.url.pathname == "/"
                                ? "nav-active"
                                : "nav-inactive"
                        }`}>Home</a>
                </li>
                <li>
                    <a
                        href="/snips"
                        class={`block py-2 pl-3 pr-4 ${
                            $page.url.pathname == "/snips"
                                ? "nav-active"
                                : "nav-inactive"
                        }`}>Snips</a>
                </li>
                <li class="md:hidden">
                    <a
                        href={isSignedin ? "/dashboard" : "/signin"}
                        class={`block py-2 pl-3 pr-4 ${
                            $page.url.pathname == "/dashboard" ||
                            $page.url.pathname == "/signin"
                                ? "nav-active"
                                : "nav-inactive"
                        }`}>
                        {isSignedin ? "Dashboard" : "Login"}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
