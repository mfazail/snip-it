<script>
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import Label from "$lib/components/Label.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import Select from "$lib/components/Select.svelte";
    import Textarea from "$lib/components/Textarea.svelte";

    import { useAlert } from "$lib/store/useAlert";
    import { onMount } from "svelte";

    $: isSubmitting = false;
    const { show } = useAlert();
    export let data;
    export let form;
    $: form?.message &&
        show({ title: form?.message ?? "", variant: "destructive" });
    $: prefix = form?.prefix ?? "";
    $: lang = form?.lang ?? "";
    $: library = form?.library ?? "";
    $: description = form?.description ?? "";
    $: body = form?.body ?? "";
    onMount(() => {
        lang = data.snip.lang;
        library = data.snip.library;
        description = data.snip.description;
        prefix = data.snip.prefix;
        body = data.snip.body;
    });
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
                    value={lang}>
                    <option value="js">JS</option>
                </Select>
            </div>
            <div>
                <Label for="library">library</Label>
                <Select
                    id="library"
                    name="library"
                    value={library}>
                    <option value="svelte">Svelte</option>
                </Select>
            </div>
            <div>
                <Label for="prefix">Prefix</Label>
                <Input
                    id="prefix"
                    type="text"
                    name="prefix"
                    placeholder="prefix"
                    value={prefix} />
            </div>
            <div>
                <Label for="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    name="description"
                    placeholder="description"
                    value={description} />
            </div>
        </div>
        <div>
            <Label for="body">Body</Label>
            <Textarea
                id="body"
                rows="8"
                placeholder="Body"
                name="body"
                value={body} />
        </div>
        <div class="flex items-center justify-end mt-2">
            <Button
                type="submit"
                disabled={isSubmitting}>
                {#if isSubmitting}
                    <Loader />
                {/if}
                Update
            </Button>
        </div>
    </form>
</div>
