export function notification(title, description) {
  chrome.notifications.create(null, {
    iconUrl: "/assets/logo/128.png",
    type: "basic",
    title: "CheckMyVA - " + title,
    message: description,
  });
}
