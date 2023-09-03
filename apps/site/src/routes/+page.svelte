<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

{#if !data.session}
  <a href="/signin">Sign in</a>
{/if}
