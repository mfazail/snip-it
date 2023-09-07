<script lang="ts">
    export let data
</script>
<form
    action="?/signout"
    method="POST">
    <button type="submit">Logout</button>
</form>
{JSON.stringify(data.profile,null,2)}

