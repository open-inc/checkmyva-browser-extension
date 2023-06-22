import { makeAutoObservable } from "mobx";

export class UiService {
  popup = null;
  tab = "alexa";

  constructor() {
    makeAutoObservable(this);
  }

  setTab(tab) {
    this.tab = tab;
  }

  openHomePage() {
    chrome.tabs.update({ url: "https://checkmyva.de/" });
  }

  openDashboard() {
    chrome.tabs.update({ url: "https://checkmyva.openinc.dev/" });
  }

  openGuide() {
    chrome.tabs.update({
      url: "https://checkmyva.de/browsererweiterung-anleitung/",
    });
  }

  openHelp() {
    chrome.tabs.update({ url: "https://checkmyva.de/browsererweiterung-faq/" });
  }

  openPopup() {
    chrome.tabs.update({
      url: "chrome-extension://dnjligmnojdhecjdfjljboaehlnadeei/popup.html",
    });
  }
}
