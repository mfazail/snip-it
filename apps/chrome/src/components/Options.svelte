<script lang="ts">
    import jwt_decode from "jwt-decode";
    import { onMount } from "svelte";
    export let hasSession = false;
    export let jwtToken: null | string = null;
    let user_id: null | string = null;
    let email: null | string = null;
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("From Option comp", { message });
    });

    $: decode(jwtToken);

    onMount(() => {
        decode(jwtToken);
    });

    const decode = (token: string | null) => {
        if (token) {
            try {
                const decodedToken: { [key: string]: any } = jwt_decode(token);
                user_id = decodedToken.sub; // user_id
                email = decodedToken.email; // email
            } catch (err) {
                console.log({ err });
            }
        }
    };
</script>

<div>
    {#if hasSession}
        <h2>Welcome Back {email}</h2>
    {:else}
        <div class="guest-wrap">
            <h3>Please sign in to continue creating snips</h3>
            <a
                class="sign-in-btn"
                target="_blank"
                href="http://localhost:5173/signin">Sign in</a>
        </div>
    {/if}
</div>

<style>
    .guest-wrap {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
    }
    .guest-wrap h3 {
        white-space: pre;
        width: min-content;
    }
    .sign-in-btn {
        display: block;
        background-color: #6366f1;
        color: white;
        padding: 5px 8px;
        border-radius: 5px;
        appearance: none;
        text-decoration: none;
        white-space: pre;
    }
    .sign-in-btn:hover {
        background-color: #5456cc;
    }
</style>
