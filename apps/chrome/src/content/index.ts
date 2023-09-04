import Overlay from "../components/Overlay.svelte";
// console.log("Content script loaded");

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page
import "./styles.css";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request);
    if (request.action === "snip-it") {
        sendResponse("Response from content script");
        // Some svelte component on the page
        new Overlay({
            target: document.body,
            props: {
                snip: request.text,
                isSignedIn: request.isSignedIn,
                token: request.token,
            },
        });
    }
});
// console.log(chrome.action);
