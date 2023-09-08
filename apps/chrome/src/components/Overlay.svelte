<script lang="ts">
    // @ts-ignore
    import { get_current_component } from "svelte/internal";
    import jwt_decode from "jwt-decode";
    import { APP_URL, langs } from "../utils";
    import { onMount } from "svelte";
    const THISComponent = get_current_component();
    export let snip = "demo";
    export let isSignedIn = false;
    export let token = "";

    let loading = false;
    let error: any = null;
    let libs: any[] = [];
    let short = "";
    const destroyThisComp = () => {
        THISComponent.$destroy();
    };
    onMount(async () => {
        const res = await fetch(`${APP_URL}/api/libs`, {
            headers: {
                "x-client": "@snip-it/chrome",
            },
        });
        if (res.status == 200) {
            const j = await res.json();
            libs = j.libs;
            short = libs[0].short;
        } else {
            error = {
                libs: "Failed to get libraries from server",
            };
        }
    });

    const handleSubmit = async (e: Event) => {
        // console.log({ e });
        loading = true;
        if (!token) {
            loading = false;
            return;
        }
        const user_id = jwt_decode<{ sub: string }>(token).sub;
        console.log(APP_URL);

        const res = await fetch(`${APP_URL}/api/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                "x-client": "@snip-it/chrome",
            },
            body: JSON.stringify({
                user_id,
                prefix: (e.target as any).prefix.value,
                lang: (e.target as any).lang.value,
                lib_id: (e.target as any).library.value,
                description: (e.target as any).description.value,
                body: (e.target as any).body.value,
            }),
        });
        if (res.status === 201) {
            destroyThisComp();
        } else {
            error = await res.json();
        }
        loading = false;
        // destroyThisComp();
    };
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code == "Tab") {
            e.preventDefault();
            const t = e.target as HTMLTextAreaElement;

            var start = t.selectionStart;
            var end = t.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            t.value =
                t.value.substring(0, start) + "\t" + t.value.substring(end);

            // put caret at right position again
            t.selectionStart = t.selectionEnd = start + 1;
        }
    };
    const handleSelect = (e: Event) => {
        const v = (e.target as HTMLSelectElement).value;
        const lib = libs.filter((l) => l.id == Number(v));
        if (lib && lib[0]) {
            short = lib[0].short;
        }
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
            <h3 style="font-size: 20px; font-weight: 500;margin-bottom: 5px;">
                Create Snippet
            </h3>
            <form on:submit|preventDefault={handleSubmit}>
                <div>
                    <label for="prefix">Prefix</label>
                    <div class="input-group">
                        <div class="icon">
                            <p>{short}</p>
                        </div>
                        <input
                            style="padding-left: 2.5rem; "
                            class:error={error && error.prefix}
                            id="prefix"
                            type="text" />
                    </div>
                    {#if error && error.prefix}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                <div>
                    <label for="lang">Lang</label>
                    <select
                        class:error={error && error.lang}
                        id="lang">
                        {#each langs as lang}
                            <option value={lang}>{lang}</option>
                        {/each}
                    </select>
                    {#if error && error.lang}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                <div>
                    <label for="library">Library</label>
                    <select
                        on:change={handleSelect}
                        class:error={error && error.library}
                        id="library">
                        {#each libs as lib (lib.id)}
                            <option value={lib.id}>{lib.name}</option>
                        {:else}
                            <option value="null">No Libs</option>
                        {/each}
                    </select>
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
                        on:keydown={handleKeydown}
                        class:error={error && error.body}
                        id="body"
                        value={snip}
                        rows={10} />
                    {#if error && error.body}
                        <p class="error">{error.message}</p>
                    {/if}
                </div>
                {#if error}
                    {#if error.libs}
                        <p class="error">{error.libs}</p>
                    {:else}
                        <p class="error">{error.message}</p>
                    {/if}
                {/if}
                <div
                    style="display:flex;justify-content: end; margin-top: 5px;">
                    <button
                        on:click={() => destroyThisComp()}
                        class="cancel-btn"
                        type="button">Cancel</button>
                    <button
                        disabled={loading || error}
                        class="btn"
                        type="submit">
                        Save
                    </button>
                </div>
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
                    href="{APP_URL}/signin">Sign in</a>
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
        min-width: 80%;
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
    .cancel-btn {
        background-color: #fff;
        color: #111827;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        padding: 6px 10px;
        font-size: 0.875rem;
        line-height: 1.25rem;
        cursor: pointer;
        margin-right: 5px;
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
    select {
        display: block;
        padding: 0.5rem;
        margin-bottom: 1.5rem;
        border-radius: 0.5rem;
        border-width: 1px;
        border-color: #d1d5db;
        width: 100%;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #111827;
        background-color: #f9fafb;
    }
    .input-group {
        position: relative;
    }
    .icon {
        display: flex;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        align-items: center;
        border-top-left-radius: 0.375rem;
        border-bottom-left-radius: 0.375rem;
        font-size: 0.75rem;
        line-height: 1rem;
        color: #6b7280;
        pointer-events: none;
    }
    @media (prefers-color-scheme: dark) {
        h3,
        label,
        input {
            color: #111827;
        }
    }
    @media (min-width: 768px) {
        .card {
            min-width: 500px;
        }
    }
</style>
