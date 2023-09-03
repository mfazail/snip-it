<script lang="ts">
    // @ts-ignore
    import { get_current_component } from "svelte/internal";
    const THISComponent = get_current_component();
    export let snip = "demo";
    export let isSignedIn = false;

    let loading = false;
    let error: any = null;

    const destroyThisComp = () => {
        THISComponent.$destroy();
    };

    const handleSubmit = async (e: Event) => {
        console.log({ e });
        destroyThisComp();
    };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="overlay"
    tabindex="-1"
    on:click|self={() => destroyThisComp()}>
    <div class="card">
        {#if isSignedIn}
            <form on:submit|preventDefault={handleSubmit}>
                <div>
                    <label for="prefix">Prefix</label>
                    <input
                        class:error={error && error.prefix}
                        id="prefix"
                        type="text" />
                    {#if error && error.prefix}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                <div>
                    <label for="lang">Lang</label>
                    <input
                        class:error={error && error.lang}
                        id="lang"
                        type="text" />
                    {#if error && error.lang}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                <div>
                    <label for="library">Library</label>
                    <input
                        class:error={error && error.library}
                        id="library"
                        type="text" />
                    {#if error && error.library}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                <div>
                    <label for="description">Description</label>
                    <input
                        class:error={error && error.description}
                        id="description"
                        type="text" />
                    {#if error && error.description}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                <div>
                    <label for="body">Snippet</label>
                    <textarea
                        class:error={error && error.body}
                        id="body"
                        value={snip}
                        rows={10} />
                    {#if error && error.body}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                <button
                    class="btn"
                    type="submit">Save</button>
            </form>
        {:else}
            <div class="guest-wrap">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-scan-line"
                    ><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path
                        d="M17 3h2a2 2 0 0 1 2 2v2" /><path
                        d="M21 17v2a2 2 0 0 1-2 2h-2" /><path
                        d="M7 21H5a2 2 0 0 1-2-2v-2" /><line
                        x1="7"
                        x2="17"
                        y1="12"
                        y2="12" /></svg>
                <h3>Sign in to continue</h3>
                <a
                    class="btn"
                    target="_blank"
                    href="http://localhost:5173/signin">Sign in</a>
            </div>
        {/if}
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(37, 37, 37, 0.431);
    }
    .card {
        min-width: 300px;
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
    }
    .guest-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .guest-wrap h3 {
        font-size: 18px;
        font-weight: 600;
        white-space: pre;
        width: min-content;
        margin-bottom: 10px;
    }
    input,
    textarea {
        display: block;
        padding: 6px 10px;
        border-radius: 0.5rem;
        border-width: 1px;
        border-color: #d1d5db;
        width: 100%;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #111827;
        background-color: #f9fafb;
    }
    input.error,
    textarea.error {
        color: #dc2626;
        border-width: 1px;
        border-color: #ef4444;
        background-color: #fef2f2;
    }
    .error {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #dc2626;
    }
    .btn {
        display: block;
        background-color: #6366f1;
        color: white;
        padding: 5px 8px;
        border-radius: 5px;
        appearance: none;
        text-decoration: none;
        white-space: pre;
    }
    .btn:hover {
        background-color: #5456cc;
    }
</style>
