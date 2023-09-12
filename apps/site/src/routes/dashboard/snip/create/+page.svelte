<script lang="ts">
    import { enhance } from "$app/forms";
    import { PUBLIC_APP_URL } from "$env/static/public";
    import Button from "$lib/components/ui/Button.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import InputGroup from "$lib/components/ui/InputGroup.svelte";
    import InputHelper from "$lib/components/ui/InputHelper.svelte";
    import Label from "$lib/components/ui/Label.svelte";
    import Loader from "$lib/components/ui/Loader.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Textarea from "$lib/components/ui/Textarea.svelte";
    import { useAlert } from "$lib/store/useAlert";
    import { onMount } from "svelte";

    export let form;

    type Library =
        | {
              id: number;
              name: string | null;
              short: string | null;
              version: string | null;
          }
        | undefined;

    let isSubmitting = false;
    let selectedLib: Library;
    let libs: Library[] = [];
    let prefix: string = form?.prefix ?? "";
    const { show } = useAlert();
    $: form?.message &&
        show({
            title: "Error",
            description: form?.message ?? "",
            variant: "error",
        });
    $: form?.success &&
        show({
            title: "Success",
            description: "Snip created successfully!",
            variant: "error",
        });

    onMount(async () => {
        try {
            const res = await fetch(`${PUBLIC_APP_URL}/api/libs`);
            const d = await res.json();
            libs = d.libs;
        } catch (e) {
            console.log(e);
        }
    });

    const handleLibSaelect = (e: Event) => {
        if (libs) {
            selectedLib = libs.find(
                (lib: Library) =>
                    Number((e.target as HTMLSelectElement).value) == lib?.id
            );
        }
    };
</script>

<div class="max-w-3xl mx-auto">
    <form
        method="POST"
        use:enhance={() => {
            isSubmitting = true;
            return async ({ update }) => {
                isSubmitting = false;
                update();
            };
        }}>
        <div class="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <Label for="library">Library</Label>
                <Select
                    on:change={handleLibSaelect}
                    id="library"
                    disabled={libs.length == 0}
                    name="library"
                    placeholder="Select library"
                    value={form?.lib_id}>
                    {#each libs as lib}
                        <option value={lib?.id}>{lib?.name}</option>
                    {/each}
                </Select>
            </div>
            <div>
                <Label for="prefix">Prefix</Label>
                <InputGroup>
                    <p slot="icon">
                        {#if selectedLib}
                            {selectedLib.short}
                        {:else}
                            NA
                        {/if}
                    </p>
                    <Input
                        className="pl-10"
                        id="prefix"
                        type="text"
                        name="prefix"
                        placeholder="prefix"
                        bind:value={prefix} />
                </InputGroup>
                <InputHelper>
                    {#if selectedLib}
                        <span class="dark:text-white font-semibold">
                            `{selectedLib.short}:{prefix}`
                        </span>
                        will be prefix for this snip
                    {:else}
                        e.g. `scn:popover`
                    {/if}
                </InputHelper>
            </div>
            <div>
                <Label for="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    name="description"
                    placeholder="description"
                    value={form?.description ?? ""} />
            </div>
        </div>
        <div class="mt-5">
            <Label
                for="body"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Body</Label>
            <Textarea
                id="body"
                rows="8"
                placeholder="Body"
                name="body"
                value={form?.body ?? ""} />
        </div>
        <div class="flex items-center justify-end space-x-3 mt-3">
            <Button
                icon
                type="submit"
                disabled={isSubmitting}>
                <svelte:fragment slot="iconLeft">
                    {#if isSubmitting}
                        <Loader />
                    {/if}
                </svelte:fragment>
                Create
            </Button>
        </div>
    </form>
</div>
