<script lang="ts">
    interface Props {
        href: string;
        title: string;
        active: boolean;
    }
    export let item: Props;
</script>

<li>
    <a
        href={item.href}
        class="flex items-center p-2  rounded-lg dark:text-white  {item.active
            ? 'bg-blue-500 text-white hover:bg-blue-700'
            : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'}  group">
        <span
            class=" transition duration-75  {item.active
                ? ' text-white group-hover:text-white'
                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}">
            <slot />
        </span>
        <span class="ml-3">{item.title}</span>
    </a>
</li>
