<script>
    import Icon from "@iconify/svelte";
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
                <a href="https://mfazail.com" class="mr-4 hover:underline md:mr-6">Me</a>
            </li>
            <li>
                <a href="https://github.com/mfazail/snip-it" class="block mr-4 hover:underline md:mr-6"><Icon icon="mdi:github" class="w-5 h-5 "/>  </a>
            </li>
        </ul>
        <span class="text-sm text-slate-500 sm:text-center dark:text-slate-400">Made by <a href="https://github.com/mfazail" target="_blank" class="underline underline-offset-2 text-blue-500">mfazail</a></span>
    </div>
  </footer>