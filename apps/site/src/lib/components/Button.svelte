<script lang="ts">
    export let btnClass:string|undefined = "";
</script>
<button
    class={`primary-btn ${btnClass}`}
    {...$$restProps}>
    <slot />
</button>
