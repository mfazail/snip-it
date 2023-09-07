<script lang="ts">
    export let className:string|undefined = "";
</script>
<button
    on:click
    class={`primary-btn ${className}`}
    {...$$restProps}>
    <slot />
</button>
