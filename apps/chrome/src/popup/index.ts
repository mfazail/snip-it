import Options from "../components/Options.svelte";

// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/
let comp: Options;
function render() {
    const target = document.getElementById("app");

    if (target) {
        comp = new Options({
            target,
        });
        // Establish a connection with the background script
        const port = chrome.runtime.connect({ name: "popup" });

        // Request the URL of the new tab
        port.postMessage({ action: "checkSession" });

        // Listen for messages from the background script
        port.onMessage.addListener((message) => {
            if (message.action === "hasSession") {
                // Display the URL of the new tab in the popup
                console.log({ message });
                if (comp && message.token) {
                    comp.$set({ hasSession: true, jwtToken: message.token });
                }
                // newTabUrlElement.textContent = message.newTabUrl;
            }
        });
        console.log(chrome.action)
        console.log("Popup Loaded")
    }
}

document.addEventListener("DOMContentLoaded", render);
