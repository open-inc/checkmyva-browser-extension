import "libs/polyfills";

console.log("[content-script] init web api");

window.addEventListener(
  "message",
  (event) => {
    // if (event.source === window) return;

    // console.log(`[content-script] message`, event.data);

    const { action, messageId, ...msg } = event.data || {};

    if (messageId && action === "external-fallback-request") {
      console.log(
        `[content-script] external-fallback-request (${messageId}): `,
        msg
      );

      chrome.runtime.sendMessage(
        { action: "external-fallback", ...msg },
        (response) => {
          console.log(
            `[content-script] external-fallback-response (${messageId}): `,
            response
          );

          window.postMessage(
            { action: "external-fallback-response", messageId, response },
            "*"
          );
        }
      );
    }
  },
  false
);
