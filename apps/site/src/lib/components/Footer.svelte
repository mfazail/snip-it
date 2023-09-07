<script>
    import Logo from "./Logo.svelte";
</script>
<footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-slate-900">
    <div class="mx-auto max-w-screen-xl text-center">
        <div class="flex items-center justify-center">
            <Logo /> 
        </div>
        
        <p class="my-6 text-slate-500 dark:text-slate-400">Quickly create your own snips or use the snips made for your next project library.</p>
        <ul class="flex flex-wrap justify-center items-center mb-6 text-slate-900 dark:text-white">
            <li>
                <a href="/" class="mr-4 hover:underline md:mr-6 ">Home</a>
            </li>
            <li>
                <a href="/snips" class="mr-4 hover:underline md:mr-6 ">Snips</a>
            </li>
            <li>
                <a href="https://mfazail.com" class="mr-4 hover:underline md:mr-6">Me</a>
            </li>
        </ul>
        <span class="text-sm text-slate-500 sm:text-center dark:text-slate-400">© 2023 <a href="/" class="hover:underline">Snip It</a>. All Rights Reserved.</span>
    </div>
  </footer>