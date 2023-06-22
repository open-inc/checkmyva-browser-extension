import { notification } from "../libs/notification";

import {
  STORE_ALEXA_TAKEOUT,
  STORE_ALEXA_CRAWLER_CONFIG,
  STORE_ALEXA_CRAWLER_HISTORY,
  loadStorage,
  saveStorage,
} from "../libs/storage";

const COLISION_LIMIT = 3;
const REQUEST_LIMIT = 10000;

export async function initAlexaCrawler() {
  try {
    const config = await loadStorage(STORE_ALEXA_CRAWLER_CONFIG);

    if (!config.crawlerConfigEnabled) return;

    const state = await loadStorage(STORE_ALEXA_CRAWLER_HISTORY);

    console.log("AlexaParser init", state);

    await parseData(state);

    const newRequest = {
      start: Math.max(...state.requests?.map((r) => r.end), 0) || 0,
      end: Date.now(),
      encodedRequestToken: null,
      done: false,
    };

    state.requests.unshift(newRequest);

    console.log(newRequest, state.requests);

    for (const request of state.requests) {
      if (request.done) {
        continue;
      }

      do {
        const response = await fetchAlexaHistory(
          request.start,
          request.end,
          request.encodedRequestToken
        );

        if (response.encodedRequestToken) {
          request.encodedRequestToken = response.encodedRequestToken;
        } else {
          request.done = true;
        }

        for (const record of response.customerHistoryRecords) {
          // save record history
          state.history.push(record);
        }

        console.log("AlexaParser save", Object.keys(state.history).length);

        state.updatedAt = Date.now();

        await saveStorage(STORE_ALEXA_CRAWLER_HISTORY, state);
      } while (!request.done);

      await parseData(state);
    }

    notification("Alexa Webseite", "Webseite wurde ausgewertet");
  } catch (error) {
    console.log("AlexaParser Error", error);

    notification("Alexa Webseite", "Webseite konnte nicht ausgewertet werden");
  }
}

async function fetchAlexaHistory(start = Date.now(), end = Date.now(), token) {
  if (token) {
    token = encodeURIComponent(token);
  }

  const url = token
    ? `https://www.amazon.de/alexa-privacy/apd/rvh/customer-history-records?startTime=${start}&endTime=${end}&previousRequestToken=${token}`
    : `https://www.amazon.de/alexa-privacy/apd/rvh/customer-history-records?startTime=${start}&endTime=${end}`;

  console.log("AlexaParser fetchAlexaHistory", url);

  return fetch(url).then((response) => response.json());
}

async function parseData(state) {
  await saveStorage(STORE_ALEXA_TAKEOUT, {
    takeoutVoiceLines: state.history
      .map((record) => {
        const requestItem = record.voiceHistoryRecordItems?.find(
          (item) => item.recordItemType === "CUSTOMER_TRANSCRIPT"
        );

        const responseItem = record.voiceHistoryRecordItems?.find(
          (item) => item.recordItemType === "ALEXA_RESPONSE"
        );

        const timestamp = record.timestamp;
        const device = record.device?.deviceName;
        const file = `https://www.amazon.de/alexa-privacy/apd/rvh/audio?uid=${requestItem?.utteranceId}`;

        let request = requestItem?.transcriptText || "";
        let response = responseItem?.transcriptText || "";

        const row = { timestamp, file, request, response, device };

        if (record.utteranceType === "DEVICE_ARBITRATION") {
          return {
            ...row,
            response: "Ein anderes Gerät wurde angesprochen",
          };
        }

        if (!request) {
          return {
            ...row,
            request: "Unbekannter Sprachbefehl",
          };
        }

        return row;
      })
      .filter((i) => i?.request)
      .sort((a, b) => a.timestamp - b.timestamp),
  });
}
