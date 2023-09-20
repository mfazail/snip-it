<script lang="ts">
    import Icon from "@iconify/svelte";
import Logo from "./Logo.svelte";
</script>

<nav class="dark:text-white dark:bg-gray-900">
    <div
        class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <a href="https://github.com/mfazail/snip-it" target="_blank">
            <Icon icon="mdi:github" class="w-5 h-5" />
        </a>
    </div>
</nav>
