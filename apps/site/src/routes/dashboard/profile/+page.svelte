<script lang="ts">
    import Avatar from "$lib/components/ui/Avatar.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import InputGroup from "$lib/components/ui/InputGroup.svelte";
    import InputHelper from "$lib/components/ui/InputHelper.svelte";
    import Label from "$lib/components/ui/Label.svelte";
    import Loader from "$lib/components/ui/Loader.svelte";
    import Icon from "@iconify/svelte";
    import { enhance } from "$app/forms";
    import Toggle from "$lib/components/ui/Toggle.svelte";
    import { useAlert } from "$lib/store/useAlert";
    import {
        publicAvatarUrl,
        whetherToShowAvatarUrl,
    } from "$lib/utils/string.js";

    export let data;
    export let form;

    const { show } = useAlert();

    $: ({ profile } = data);
    $: avatar = form?.avatar ?? profile?.avatar_url;
    $: avatar_url = whetherToShowAvatarUrl(form?.avatar ?? profile?.avatar_url);
    $: username = form?.username ?? profile?.username;
    $: name = form?.name ?? profile?.name;
    $: {
        if (form?.success) {
            show({
                title: "Update Successfull",
                description: "Profile updated successfully!",
            });
        }
        if (form?.error) {
            show({
                title: "Error",
                description: form.message,
                variant: "error",
            });
        }
    }

    let isSubmitting = false;
    let isAvatarUrl = true;
    let checkingUsername:
        | "initial"
        | "checking"
        | "taken"
        | "error"
        | "available" = "initial";

    let tempAvatar: string | null;

    const handleAvatarChange = (e: Event) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                tempAvatar = reader.result as string;
            };

            reader.readAsDataURL(file);
        }
    };
    const checkUsername = async (e: FocusEvent) => {
        const un = (e.target as HTMLInputElement).value;
        if (un == profile?.username) return;
        checkingUsername = "checking";
        const { data: available, error: err } = await data.supabase
            .from("profile")
            .select("username")
            .eq("username", un)
            .maybeSingle();
        if (err) {
            checkingUsername = "error";
            return;
        }
        if (available?.username) {
            checkingUsername = "taken";
        } else {
            checkingUsername = "available";
        }
    };
</script>

<div
    class="dark:text-white space-y-8 max-w-2xl mx-auto md:p-4 md:border dark:border-slate-600 md:rounded-md md:bg-slate-800/70 min-h-screen md:min-h-fit">
    <h2 class="text-xl">Profile Details</h2>
    <form
        action="?/update"
        method="post"
        enctype="multipart/form-data"
        class="space-y-8"
        use:enhance={() => {
            isSubmitting = true;
            return ({ update }) => {
                isSubmitting = false;
                update();
            };
        }}>
        <div class="flex items-center space-x-4">
            <Avatar
                className="shrink-0"
                src={publicAvatarUrl(tempAvatar ? tempAvatar : avatar)} />
            <div class="w-full">
                <Label
                    for="avatar"
                    className="flex items-center justify-between">
                    <span>Avatar</span>
                    <Toggle
                        size="small"
                        className="ml-2"
                        bind:checked={isAvatarUrl}>
                        Avatar Url
                    </Toggle>
                </Label>
                {#if isAvatarUrl}
                    <Input
                        type="text"
                        id="avatar"
                        name="avatar_url"
                        value={avatar_url}
                        placeholder="https://example.com/avatar.png" />
                {:else}
                    <Input
                        id="avatar"
                        inpType="file"
                        name="avatar"
                        accept=".jpg, .jpeg, .png, .webp"
                        on:change={handleAvatarChange} />
                {/if}
            </div>
        </div>
        <div>
            <Label for="username">Username</Label>
            <InputGroup>
                <svelte:fragment slot="icon">
                    {#if checkingUsername != "initial"}
                        {#if checkingUsername == "available"}
                            <Icon
                                icon="solar:user-check-bold-duotone"
                                class="text-green-400 w-4 h-4" />
                        {:else if checkingUsername == "checking"}
                            <Loader />
                        {:else if checkingUsername == "error"}
                            <Icon
                                icon="solar:user-cross-bold-duotone"
                                class="text-red-400 w-4 h-4" />
                        {:else if checkingUsername == "taken"}
                            <Icon
                                icon="solar:user-cross-rounded-broken"
                                class="text-yellow-400 w-4 h-4" />
                        {/if}
                    {:else}
                        <Icon
                            icon="solar:user-circle-bold-duotone"
                            class="text-white w-4 h-4" />
                    {/if}
                </svelte:fragment>
                <Input
                    type="text"
                    id="username"
                    name="username"
                    className="pl-10"
                    placeholder="johndoe"
                    on:blur={checkUsername}
                    value={username} />
            </InputGroup>
            <InputHelper>
                {#if checkingUsername != "initial"}
                    {#if checkingUsername == "available"}
                        <span class="text-green-400">Username available</span>
                    {:else if checkingUsername == "error"}
                        <span class="text-red-400"
                            >Failed checking username</span>
                    {:else if checkingUsername == "taken"}
                        <span class="text-yellow-400">Username taken</span>
                    {/if}
                {/if}
            </InputHelper>
        </div>
        <div>
            <Label for="name">Name</Label>
            <Input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={name} />
        </div>
        <div class="flex justify-end">
            <Button
                disabled={isSubmitting}
                type="submit"
                icon>
                <svelte:fragment slot="iconRight">
                    {#if isSubmitting}
                        <Loader />
                    {/if}
                </svelte:fragment>
                Update
            </Button>
        </div>
    </form>
</div>
