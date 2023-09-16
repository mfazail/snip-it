<script lang="ts">
    import "../app.postcss";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
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

<Navbar />
<div class="dark:bg-slate-900 custom-scroll">
    <slot />
</div>
<Footer />