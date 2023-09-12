<script lang="ts">
    import { enhance } from "$app/forms";
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
    export let data;

    const { show } = useAlert();

    type Library =
        | {
              id: number;
              name: string | null;
              short: string | null;
              version: string | null;
          }
        | undefined;

    let { snip } = data;
    $: ({ snip } = data);

    let isSubmitting = false;
    let selectedLib: Library;
    let prefix: string = form?.prefix ?? snip.prefix;
    let lib_id = form?.lib_id ?? snip.lib_id;
    let description = form?.description ?? snip.description;
    let body = form?.body ?? snip.body;

    $: form?.message &&
        show({
            title: "Error",
            description: form.message ?? "",
            variant: "error",
        });
    $: form?.success &&
        show({
            title: "Update successfull",
            description: "Snip updated successfully",
            variant: "success",
        });

    onMount(() => {
        if (snip) {
            selectedLib = data.libs.find((l: Library) => l?.id == lib_id);
        }
    });

    const handleLibSaelect = (e: Event) => {
        if (data.libs) {
            selectedLib = data.libs.find(
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
                <Label for="lib_id">Library</Label>
                <Select
                    on:change={handleLibSaelect}
                    id="lib_id"
                    name="lib_id"
                    placeholder="Select library"
                    bind:value={lib_id}>
                    {#each data.libs as lib}
                        <option value={lib.id}>{lib.name} {lib.version}</option>
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
                    bind:value={description} />
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
                bind:value={body} />
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
                Update
            </Button>
        </div>
    </form>
</div>
