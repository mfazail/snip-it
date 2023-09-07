// Background service workers
// https://developer.chrome.com/docs/extensions/mv3/service_workers/

import { SUPABASE_PROJECT_REF } from "../supabase/client";
import { APP_URL }from '../utils'

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "snipIt",
        title: "Snip It",
        contexts: ["selection"],
    });
});

/**
 * Send message to content-script on context menu clicked
 */
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "snipIt") {
        if (tab === undefined || !tab.id) return;
        console.log(info.selectionText)
        const token = await getCookie();
        if (token) {
            chrome.tabs.sendMessage(
                tab.id,
                {
                    action: "snip-it",
                    text: info.selectionText,
                    isSignedIn: true,
                    token,
                },
                (response) => {
                    // console.log(response);
                }
            );
        } else {
            chrome.tabs.sendMessage(
                tab.id,
                { action: "snip-it", text: "", isSignedIn: false, token: null },
                (response) => {
                    // console.log(response);
                }
            );
        }
    }
});

/**
 * Check for cookies on specific domain
 */
// if (chrome.cookies) {
//     chrome.cookies.getAll({ domain: "localhost" }, (cookies) => {
//         // console.log(cookies);
//         cookies.forEach((cookie) => {
//             // if (cookie.expirationDate)
//                 // console.log(new Date(cookie.expirationDate));
//         });
//     });
// }

// Listen for connections from the popup
chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "popup") {
        // Handle messages from the popup
        port.onMessage.addListener(async (message) => {
            // console.log({ message });
            if (message.action === "checkSession") {
                const token = await getCookie();
                console.log({token})
                port.postMessage({
                    action: "hasSession",
                    token,
                });
            }
        });
    }
});

// console.log(chrome.action);
const getCookie = async () => {
    if (chrome.cookies) {
        const cookie = await chrome.cookies.get({
            name: `sb-${SUPABASE_PROJECT_REF}-auth-token`,
            url: APP_URL,
        });
        return cookie?.value;
    } else {
        return null;
    }
};

// NOTE: If you want to toggle the side panel from the extension's action button,
// you can use the following code:
// chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
//    .catch((error) => console.error(error));
