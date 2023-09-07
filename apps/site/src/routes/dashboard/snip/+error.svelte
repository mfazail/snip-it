<script lang="ts">
    import { page } from '$app/stores'
</script>
<div>
    {$page.error?.message}
</div>