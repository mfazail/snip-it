<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "../../src/app.postcss";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import "flowbite";
    import Navbar from "$lib/components/Navbar.svelte";
    import { page } from "$app/stores";

    export let data;

    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }
        });

        return () => data.subscription.unsubscribe();
    });
</script>

<svelte:head>
    <title>Snip It</title>
</svelte:head>

{#if $page.url.pathname != "/signin"}
    <Navbar isSignedin={session ? true : false} />
{/if}
<slot />
