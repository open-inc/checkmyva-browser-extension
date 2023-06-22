import "libs/polyfills";
import { handleExternalMessage } from "./background/website_api";
import { initAlexaCrawler } from "./background/alexa_crawler";
import { initDownloadListener } from "./background/download_listener";
import { donate } from "./background/donate";
import { initTakeoutUpload } from "./libs/takeoutUpload";

init();

async function init() {
  await initAlexaCrawler();
  await initDownloadListener();

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("[background] runtime.onMessage request =", request);

    if (request?.action) {
      const { action, ...msg } = request;

      if (action === "alexa-crawler-start") {
        initAlexaCrawler().then(() => {
          sendResponse({ response: "ok" });
        });
      }

      if (action === "donate") {
        donate(msg.type).then(() => {
          sendResponse({ response: "ok" });
        });
      }

      if (action === "upload-takeout") {
        initTakeoutUpload().then(() => {
          sendResponse({ response: "ok" });
        });
      }

      if (action === "external-fallback") {
        console.log(
          "[background] runtime.onMessage: external-fallback msg =",
          msg
        );

        handleExternalMessage(msg).then((response) => {
          console.log(
            "[background] runtime.onMessage: external-fallback response =",
            response
          );

          sendResponse(response);
        });
      }
    } else {
      console.log("[background] runtime.onMessage", request);

      sendResponse(null);
    }

    return true;
  });

  chrome.runtime.onMessageExternal.addListener((msg, sender) => {
    console.log("[background] runtime.onMessageExternal", msg);

    handleExternalMessage(msg).then((response) => {
      sendResponse(response);
    });

    return true;
  });
}
