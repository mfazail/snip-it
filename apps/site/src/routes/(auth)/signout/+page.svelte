<script lang="ts">
    import { goto } from "$app/navigation";

    export let data;
</script>

<div class="flex items-center justify-center h-screen w-full">
    <div class="flex flex-col items-center justify-center">
        {#await data.supabase.auth.signOut()}
            <h1 class="text-4xl font-bold">Signing out...</h1>
        {:then res}
            {#if res.error}
                <p class="text-red-500">{res.error.message}</p>
            {/if}
            {goto("/")}
        {:catch}
            <p class="text-red-500">Something went wrong</p>
        {/await}
    </div>
</div>
