import { makeAutoObservable } from "mobx";

import {
  STORE_ALEXA_TAKEOUT,
  STORE_ALEXA_CRAWLER_CONFIG,
  STORE_ALEXA_CRAWLER_HISTORY,
  resetStorage,
  subscribeStorage,
  saveStorage,
  loadStorage,
} from "../libs/storage";

import { download } from "../libs/download";

export class AlexaService {
  constructor() {
    subscribeStorage(this, STORE_ALEXA_TAKEOUT);
    subscribeStorage(this, STORE_ALEXA_CRAWLER_CONFIG);

    makeAutoObservable(this);
  }

  async deleteData() {
    await resetStorage(STORE_ALEXA_TAKEOUT);
  }

  async startUpload() {
    console.log("upload-takeout start");

    await chrome.runtime.sendMessage({ action: "upload-takeout" });

    console.log("upload-takeout start done");
  }

  async startCrawler() {
    await chrome.runtime.sendMessage({ action: "alexa-crawler-start" });
  }

  async setCrawlerConfigEnabled(value = false) {
    await saveStorage(STORE_ALEXA_CRAWLER_CONFIG, {
      crawlerConfigEnabled: value,
    });

    await chrome.runtime.sendMessage({ action: "alexa-crawler-start" });
  }

  async resetCrawler() {
    await resetStorage(STORE_ALEXA_CRAWLER_HISTORY);
  }

  async exportCrawlerData() {
    const data = await loadStorage(STORE_ALEXA_CRAWLER_HISTORY);

    download("alexa-sync-data.json", JSON.stringify(data));
  }
}
