<script lang="ts">
    import "../../src/app.postcss";
    import { invalidate, afterNavigate, beforeNavigate } from "$app/navigation";
    import { onMount } from "svelte";
    import NProgress from "nprogress";
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
    beforeNavigate(() => {
        NProgress.start();
    });
    afterNavigate(() => {
        NProgress.done();
    });
</script>

<svelte:head>
    <title>Snip It</title>
    <meta
        name="description"
        content="Snip It is a VSCode extension to save code snippets and use them later. There are collection of code snippets for various libraries" />
    <meta
        name="keywords"
        content="snip it, vscode, extension, snippets, code, code snippets, code library, code manager, code saver, code snippets manager, code snippets saver, code snippets library, code library manager" />
    <meta
        name="twitter:image"
        content="https://snipit.mfazail.com/assets/og-image.png" />
    <meta
        name="og:image"
        content="https://snipit.mfazail.com/assets/og-image.png" />
    <meta
        name="og:url"
        content="https://snipit.mfazail.com" />
    <meta
        name="twitter:url"
        content="https://snipit.mfazail.com" />
    <meta
        name="twitter:card"
        content="summary_large_image" />
    <meta
        name="twitter:site"
        content="@mfazail_alam" />
    <meta
        name="twitter:creator"
        content="@mfazail_alam" />
    <meta
        name="og:site_name"
        content="Snip It" />
    <meta
        name="og:type"
        content="website" />
    <meta
        name="twitter:domain"
        content="snipit.mfazail.com" />
    <meta
        name="theme-color"
        content="#0f172a" />
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
