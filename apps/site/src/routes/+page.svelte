<script lang="ts">
    import Window from "$lib/components/Window.svelte";
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { TextPlugin } from "gsap/dist/TextPlugin";
    import { featuredLibs } from "$lib/utils/libs";
    import Icon from "@iconify/svelte";

    onMount(() => {
        gsap.registerPlugin(TextPlugin);
        const coding = gsap.timeline();
        const browsing = gsap.timeline();
        const pasting = gsap.timeline();
        const concluding = gsap.timeline();
        const master = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

        coding
            .to(".line", {
                display: "block",
                stagger: 0.6,
            })
            .to(".question", {
                display: "block",
                duration: 1,
                ease: "elastic.out(1,0.3)",
            })
            .fromTo(
                ".thought",
                {
                    opacity: 0,
                },
                {
                    display: "block",
                    opacity: 1,
                    duration: 2,
                }
            );
        browsing
            .fromTo(
                ".window-browser",
                {
                    zIndex: 0,
                    x: "200%",
                    y: "50%",
                    opacity: 0,
                    display: "block",
                },
                {
                    zIndex: 10,
                    display: "block",
                    x: "0",
                    y: "0",
                    opacity: 1,
                }
            )
            .to(".window-browser .window-title", {
                delay: 1.3,
                text: {
                    value: "https://example.com/docs",
                    delimiter: "",
                    speed: 0.4,
                },
            })
            .fromTo(
                ".sidebar",
                {
                    opacity: 0,
                },
                {
                    display: "block",
                    opacity: 1,
                    delay: 2.5,
                    duration: 1.5,
                }
            )
            .fromTo(
                ".content",
                {
                    opacity: 0,
                },
                {
                    display: "block",
                    opacity: 1,
                    duration: 1.5,
                }
            )
            .fromTo(
                ".toc",
                {
                    opacity: 0,
                },
                {
                    display: "block",
                    opacity: 1,
                    duration: 1.5,
                    onStart: () => {
                        coding.to(".thought,.question", {
                            display: "none",
                            duration: 1,
                        });
                    },
                }
            )
            .to(".select-line", {
                display: "block",
            })
            .fromTo(
                ".selection",
                {
                    display: "block",
                    width: "0",
                    height: "0",
                },
                {
                    display: "block",
                    width: "160px",
                    height: "96px",
                }
            )
            .to(".command", {
                display: "block",
                duration: 2,
            });
        pasting
            .fromTo(
                ".window-code",
                {
                    zIndex: 0,
                },
                {
                    zIndex: 20,
                    onStart: () => {
                        browsing.to(".window-browser", {
                            zIndex: 0,
                        });
                    },
                }
            )
            .to(".line-paste", {
                display: "block",
            })
            .to(".line-code-paste", {
                display: "block",
            });
        concluding
            .fromTo(
                ".alert",
                {
                    display: "none",
                    opacity: 0,
                    scale: 0.8,
                    ease: "back",
                },
                {
                    display: "flex",
                    opacity: 1,
                    scale: 1,
                    ease: "back",
                }
            )
            .to(".paste", {
                display: "block",
                x: "63px",
                duration: 2,
                ease: "power.out(1,0.5)",
            });

        master.add(coding).add(browsing).add(pasting).add(concluding);
        return () => {
            coding.clear();
            browsing.clear();
            pasting.clear();
            concluding.clear();
            master.clear();
        };
    });
</script>

<svelte:head>
    <meta
        name="twitter:title"
        content="Snip It" />
    <meta
        name="twitter:description"
        content="Snip It is a VSCode extension to save code snippets and use them later. There are collection of code snippets for various libraries" />
    <meta
        name="og:title"
        content="Snip It" />
    <meta
        name="og:description"
        content="Snip It is a VSCode extension to save code snippets and use them later. There are collection of code snippets for various libraries" />
</svelte:head>

<div class=" w-full dark:text-white">
    <section
        class="w-full overflow-hidden h-screen md:h-[calc(100vh-73px)] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-1 content-start md:content-center justify-items-center">
        <div class="relative left-container mt-20 md:mt-0">
            <div
                class="prose dark:prose-invert h-[calc(100vh-500px)] md:h-[calc(100vh-300px)] px-4">
                <h1>
                    Don't remember the structure?
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-br from-[#e242f9f0] to-[#4f93f9]">
                        Just snip it
                    </span>
                </h1>
                <p>
                    why going through docs again & again, <br />
                    <code>copy-pasting</code>
                    code structure when you can <br />just
                    <strong><em>snip it</em></strong>
                </p>
                <div>
                    <img
                        class="m-0 mb-2"
                        src="https://img.shields.io/visual-studio-marketplace/v/mfazail.snip-it-vscode.svg?color=6366f1&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code"
                        alt="Visual Studio Marketplace Version" />
                    <a
                        href="https://marketplace.visualstudio.com/items?itemName=mfazail.snip-it-vscode"
                        target="_blank"
                        class="primary-btn no-underline inline-flex items-center">
                        Get Started
                        <Icon
                            icon="ic:baseline-arrow-right-alt"
                            class="w-4 h-4 ml-2" />
                    </a>
                </div>
            </div>
        </div>
        <div
            class="relative w-full right-container z-0 scale-[.7] md:scale-100 h-full">
            <Window
                className="window-code z-10 lg:w-[70%] left-[5%] md:left-0"
                title="Code"
                icon="akar-icons:panel-split-row">
                <p class="hidden thought absolute top-[28%] -left-1/4">
                    What was the structure🤔
                </p>
                <div class="w-1/3 h-5 bg-slate-700 rounded-md" />
                <div class="hidden line h-5" />
                <div class="hidden line h-5" />
                <div class="hidden line-paste h-5" />
                <div
                    class="hidden line-code-paste w-1/4 h-5 rounded-md bg-slate-500" />
                <div
                    class="hidden line-code-paste mt-2 ml-10 w-1/4 h-5 rounded-md bg-slate-500" />
                <div
                    class="hidden line-code-paste mt-2 w-1/4 h-5 rounded-md bg-slate-500" />
                <div class="inline-flex">
                    <div
                        class="code-cursor h-5 w-[1.5px] bg-slate-200 animate-pulse" />
                    <p class="hidden question ml-2">????</p>
                </div>
                <br /><br />
                <div class="w-1/4 h-5 rounded-md bg-slate-700" />
                <div class="mt-2 ml-10 w-1/3 h-5 rounded-md bg-slate-700" />
                <div class="ml-4 mt-2 w-1/5 h-5 rounded-md bg-slate-700" />
            </Window>
            <Window
                light
                className="window-browser hidden lg:w-[70%] top-9 md:top-[6%] left-[20%] md:left-[10%]"
                title="Browser"
                icon="ic:twotone-bookmark-add">
                <div class="grid grid-cols-5 gap-2 h-60">
                    <div
                        class="sidebar hidden col-span-1 h-60 rounded-md w-full bg-blue-200 text-center pt-2" />
                    <div
                        class="content hidden col-span-3 h-60 rounded-md w-full">
                        <div class="w-full h-16 bg-slate-300 rounded-md" />
                        <div class="w-full h-12 bg-slate-300 rounded-md mt-2" />
                        <div
                            class="w-full h-28 bg-slate-300 rounded-md mt-2 p-2">
                            <div
                                class="selection hidden absolute w-40 h-24 bg-blue-500/50 border border-blue-500 rounded-md" />
                            <div
                                class="select-line hidden w-32 h-5 ml-2 mt-2 bg-slate-400 rounded-md" />
                            <div
                                class="select-line hidden w-32 h-5 ml-5 mt-2 bg-slate-400 rounded-md" />
                            <div
                                class="select-line hidden w-32 h-5 ml-2 mt-2 bg-slate-400 rounded-md" />
                        </div>
                    </div>
                    <div
                        class="toc hidden relative col-span-1 h-40 rounded-md w-full bg-green-200 text-center pt-2" />
                    <div
                        class="command hidden absolute bottom-2 right-5 font-mono text-xs">
                        ctrl+c
                    </div>
                </div>
            </Window>
            <div
                class="alert hidden absolute top-16 md:top-1/4 left-5 md:-left-[5%] z-20 w-[90%] md:w-[80%] h-20 bg-red-200/80 border border-red-400 text-red-500 font-medium items-center justify-center rounded-md">
                <Icon
                    icon="lucide:x"
                    class="w-5 h-5 mr-2 -mb-px" />
                Forget about doing this
                <p class="relative">
                    <span class="absolute left-1 top-0">again</span>
                    <span class="ml-12">&</span>
                    <span class="paste hidden absolute left-1 top-0"
                        >again</span>
                </p>
            </div>
        </div>
    </section>
    <div class="overflow-hidden">
        <section
            id="getting-started"
            class="relative bg min-h-screen md:min-h-[80vh] w-full px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-8 justify-items-center content-center md:content-start">
            <div class="rounded-md w-full h-96 z-10 order-2 md:order-1">
                <img
                    src="/assets/vscode-search.webp"
                    class="h-80 sm:h-96 w-full object-cover rounded-md"
                    alt="Snip It - Search" />
            </div>
            <div class="prose dark:prose-invert order-1 md:order-2">
                <h2>Search for snippets</h2>
                <ul>
                    <li>Open command panel <code>Ctrl+shift+p</code></li>
                    <li>Type: <strong>Snip It:Search</strong></li>
                    <li>Enter library name <em>e.g. shadcn,etc</em></li>
                    <li>
                        All the snippets realted to selected library will saved
                        be locally
                    </li>
                    <li>Type the prefix e.g. scn, and use them</li>
                </ul>
            </div>
        </section>
        <section
            class="relative bg-left max-w-7xl mx-auto min-h-screen md:min-h-[80vh] w-full grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center content-center md:content-start px-4">
            <div class="prose dark:prose-invert">
                <h2>Create your own snippets</h2>
                <ul>
                    <li>Select code</li>
                    <li>Open command panel <code>Ctrl+shift+p</code></li>
                    <li>Type: <strong>Snip It</strong></li>
                    <li>Enter prefix and description and done</li>
                </ul>
            </div>
            <div class="rounded-md w-full h-96 z-10">
                <img
                    src="/assets/vscode-snipit.webp"
                    class="h-80 sm:h-96 w-full object-cover rounded-md"
                    alt="Snip It" />
            </div>
        </section>
        <section
            class="relative bg max-w-7xl mx-auto min-h-screen md:min-h-[80vh] w-full grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center content-center md:content-start px-4">
            <div class="rounded-md w-full h-96 z-10 order-2 md:order-1">
                <img
                    src="/assets/vscode-delete.webp"
                    class="h-80 sm:h-96 w-full object-cover rounded-md"
                    alt="Snip It - Delete" />
            </div>
            <div class="prose dark:prose-invert order-1 md:order-2">
                <h2>Delete snippet</h2>
                <ul>
                    <li>Open command panel <code>Ctrl+shift+p</code></li>
                    <li>Type: <strong>Snip It:Delete</strong></li>
                    <li>Enter prefix and snippet will be deleted</li>
                </ul>
            </div>
        </section>
        <section
            class="relative prose dark:prose-invert max-w-7xl mx-auto w-full flex flex-col items-center justify-center px-4">
            <h2>Available Libraries</h2>
            <div
                class="libs max-w-3xl w-full h-full grid grid-cols-4 gap-10 content-center justify-items-center px-10 pt-10 pb-5">
                {#each featuredLibs as lib, i (i)}
                    <div
                        title={lib.name}
                        class="dark:bg-slate-900 hover:shadow-md hover:shadow-red-500 transition-all rounded-md overflow-hidden flex items-center justify-center w-10 h-10 md:w-20 md:h-20 transform skew-x-[20deg] -rotate-12 border border-red-500">
                        {#if lib.type == "icon"}
                            {@const icon = lib.icon ?? ""}
                            <Icon
                                {icon}
                                class="w-6 h-6 md:h-10 md:w-10" />
                            <span class="sr-only">{lib.name}</span>
                        {:else}
                            <img
                                src={lib.url}
                                alt={lib.name}
                                class="h-10 aspect-square" />
                        {/if}
                    </div>
                {/each}
            </div>
            <div />
        </section>
    </div>
</div>

<style>
    .bg::before,
    .bg-left::before {
        content: "";
        position: absolute;
        top: 0%;
        width: 200vw;
        height: 100vh;
        background: linear-gradient(173.1deg, #e242f9f0 10.2%, #4f93f9 77.3%);
        mask-image: radial-gradient(rgba(0, 0, 0, 0.3), transparent 60%);
        -webkit-mask-image: radial-gradient(
            rgba(0, 0, 0, 0.3),
            transparent 60%
        );
    }
    .bg-left::before {
        right: -30%;
    }
    .bg::before {
        left: -30%;
    }
    .right-container::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200vw;
        height: 100vh;
        background: linear-gradient(
            173.1deg,
            rgba(226, 66, 249, 0.94) 10.2%,
            rgba(79, 147, 249, 1) 77.3%
        );
        mask-image: radial-gradient(rgba(0, 0, 0, 0.3), transparent 60%);
        -webkit-mask-image: radial-gradient(
            rgba(0, 0, 0, 0.3),
            transparent 60%
        );
    }
    .libs {
        mask-image: gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 1)),
            to(rgba(0, 0, 0, 0))
        );
        -webkit-mask-image: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 1)),
            to(rgba(0, 0, 0, 0))
        );
    }
    @media (min-width: 640px) {
        .bg::before,
        .bg-left::before,
        .right-container::before {
            width: 70vw;
        }
    }
</style>
