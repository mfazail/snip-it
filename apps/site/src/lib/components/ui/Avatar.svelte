<script lang="ts">
    export let src: string | null = "";
    export let alt: string | null = "";
    export let className = "";
</script>

<img
    class="w-10 h-10 object-cover object-center dark:bg-white rounded-full {className}"
    {src}
    {alt}
    {...$$restProps} />
