<div class="dark:bg-slate-900 w-full">
    <main class=" dark:prose-invert prose max-w-6xl mx-auto px-4">
        <section id="installation">
            <h3><a href="/docs#installation">Install Extension</a></h3>
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <a
                    href="/docs"
                    class="appearance-none no-underline">
                    <div
                        class="rounded-md flex items-center space-x-3 p-2 hover:shadow">
                        <div class="rounded-full bg-slate-500 w-12 h-12" />
                        <div>
                            <h6 class="text-lg font-medium">
                                Snip it <code>vs-code</code> Extension
                            </h6>
                            <p class="m-0 text-sm text-slate-400">
                                Install and search snips for your next project
                                library
                            </p>
                        </div>
                    </div>
                </a>
                <a
                    href="/docs"
                    class="appearance-none no-underline">
                    <div
                        class="rounded-md flex items-center space-x-3 p-2 hover:shadow">
                        <div class="rounded-full bg-slate-500 w-12 h-12" />
                        <div>
                            <h6 class="text-lg font-medium">
                                Snip it <code>chrome</code> Extension
                            </h6>
                            <p class="m-0 text-sm text-slate-400">
                                Install this if you are author of library and
                                want to publish snips of your library
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </section>
        <section id="usage">
            <h3><a href="/docs#usage">Usage</a></h3>
            <h4 class="text-lg text-slate-600">Vs Code</h4>
            <ul>
                <li>
                    Available commands <code>search</code>,<code>create</code>
                    and
                    <code>delete</code>
                </li>
                <li>
                    From command pallete search <code>Snip It:search</code> and enter
                    the library name to install to install all snips of that library.
                </li>
                <li>
                    Select a block of code and hit <code>right click</code> or
                    from command pallete <code>Snip It:create</code>, give
                    details and done.
                </li>
                <li>
                    From command pallete <code>Snip It:delete</code> and enter the
                    prefix to delete.
                </li>
            </ul>
            <h4 class="text-lg text-slate-600">Chrome</h4>
            <ul>
                <li>
                    You need to be signedin in order to use chrome extension
                </li>
                <li>
                    Select block of code and hit <code>right click</code> and then
                    press Snip it, give details and done.
                </li>
            </ul>
        </section>
        <section id="library-author">
            <h3><a href="/docs#library-author">Library author</a></h3>
            <ul>
                <li>
                    Think your snip prefix to align with your library name. <em
                        >e.g. Radix-> rdx</em>
                    or <em>e.g. Radix ui-> rdxui</em>
                </li>
                <li>Give a short description of that snippet.</li>
            </ul>
        </section>
    </main>
</div>

<style lang="postcss">
    section {
        @apply py-10;
    }
</style>
