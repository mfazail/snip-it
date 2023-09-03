<script lang="ts">
    import { enhance } from "$app/forms";
    import { useAlert } from "$lib/store/useAlert";
    import Loader from "$lib/components/Loader.svelte";
    import Label from "$lib/components/Label.svelte";
    import Input from "$lib/components/Input.svelte";
    import Button from "$lib/components/Button.svelte";
    export let form;
    let isSubmitting = false;
    const { show } = useAlert();
    $: if (form?.error)
        show({ title: form?.error ?? "", variant: "destructive" });
</script>

<div
    class="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
    <div class="w-full border rounded-lg shadow md:mt-0 sm:max-w-sm xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
                class="text-xl font-bold leading-tight tracking-tight md:text-2xl mb-8">
                Sign in to your account
            </h1>
            <form
                class="space-y-4 flex flex-col"
                method="post"
                action="?/signin"
                use:enhance={({}) => {
                    isSubmitting = true;
                    return async ({ update }) => {
                        isSubmitting = false;
                        update();
                    };
                }}>
                <div>
                    <Label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={form?.email ?? ""}
                        id="email"
                        required
                        placeholder="name@company.com"
                        class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div />
                <div>
                    <div class="flex items-center justify-between pb-1">
                        <Label
                            for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >Password</Label>
                        <!-- <a
                            href="/forgot-password"
                            class="text-sm font-medium text-amber-600 hover:underline dark:text-amber-500"
                            >Forgot password?</a> -->
                    </div>
                    <div>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            required
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                </div>
                <Button
                    btnClass="self-end"
                    type="submit"
                    disabled={isSubmitting}>
                    {#if isSubmitting}
                        <Loader />
                    {/if}
                    Sign in
                </Button>
            </form>
        </div>
    </div>
</div>
