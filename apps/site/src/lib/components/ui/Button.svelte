<script lang="ts">
    export let className: string | undefined = "";
    export let icon = false;
</script>

<button
    on:click
    class={`primary-btn disabled:bg-blue-500/60 disabled:hover:bg-blue-600/70 ${className}`}
    class:space-x-2={icon}
    class:inline-flex={icon}
    {...$$restProps}>
    <slot name="iconLeft" />
    <span>
        <slot />
    </span>
    <slot name="iconRight" />
</button>
