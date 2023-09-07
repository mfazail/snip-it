import Overlay from "../components/Overlay.svelte";
import "./styles.css";
console.log("Content script loaded");

// Content scripts
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/

// Some global styles on the page

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request);
    if (request.action === "snip-it") {
        sendResponse("Response from content script");
        const snip = String(document.getSelection()) || request.text
        // Some svelte component on the page
        new Overlay({
            target: document.body,
            props: {
                snip,
                isSignedIn: request.isSignedIn,
                token: request.token,
            },
        });
    }
});
// console.log(chrome.action);
