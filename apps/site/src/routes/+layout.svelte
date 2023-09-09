<script lang="ts">
    import "../../src/app.postcss";
    import { invalidate,afterNavigate,beforeNavigate } from "$app/navigation";
    import { onMount } from "svelte";
    import NProgress  from 'nprogress'
    import "flowbite";
    import Navbar from "$lib/components/Navbar.svelte";
    import { page } from "$app/stores";
    import Alerter from "$lib/components/Alerter.svelte";
    import Footer from "$lib/components/Footer.svelte";

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
    beforeNavigate(()=>{
        NProgress.start()
    })
    afterNavigate(()=>{
        NProgress.done()
    })
</script>

<svelte:head>
    <title>Snip It</title>
</svelte:head>

{#if $page.url.pathname != "/signin"}
    <Navbar isSignedin={session ? true : false} />
{/if}
<div class="dark:bg-slate-900 custom-scroll">
    <slot />
</div>
<Alerter />
{#if !$page.url.pathname.startsWith("/dashboard")}
    <Footer />
{/if}
