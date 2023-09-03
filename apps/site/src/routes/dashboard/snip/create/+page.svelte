<script>
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import Label from "$lib/components/Label.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import Select from "$lib/components/Select.svelte";
    import Textarea from "$lib/components/Textarea.svelte";
    import { useAlert } from "$lib/store/useAlert";
    import { bundledLanguagesBase } from "shikiji/langs";

    let isSubmitting = false;
    const { show } = useAlert();
    export let form;
    $: form?.message &&
        show({ title: form?.message ?? "", variant: "destructive" });
</script>

<div class="max-w-7xl mx-auto">
    <form
        method="POST"
        use:enhance={() => {
            isSubmitting = true;
            return async ({ update }) => {
                isSubmitting = false;
                update();
            };
        }}>
        <div class="grid grid-cols-1 sm:grid-cols-2">
            <div>
                <Label for="lang">Lang</Label>
                <Select
                    id="lang"
                    name="lang"
                    value={form?.lang ?? ""}
                    placeholder="Select language">
                    {#each Object.entries(bundledLanguagesBase) as shikiLang}
                        <option value={shikiLang[0]}>{shikiLang[0]}</option>
                    {/each}
                </Select>
            </div>
            <div>
                <Label for="library">Library</Label>
                <Select
                    id="library"
                    name="library"
                    placeholder="Select library"
                    value={form?.library ?? ""}>
                    <option value="shadcn-svelte">Shadcn Svelte</option>
                    <option value="radix-vue">Radix Vue</option>
                </Select>
            </div>
            <div>
                <Label for="prefix">Prefix</Label>
                <Input
                    id="prefix"
                    type="text"
                    name="prefix"
                    placeholder="prefix"
                    value={form?.prefix ?? ""} />
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
        <div>
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
        <div class="flex items-center justify-end space-x-3 mt-2">
            <Button
                type="submit"
                disabled={isSubmitting}>
                {#if isSubmitting}
                    <Loader />
                {/if}
                Create
            </Button>
        </div>
    </form>
</div>
