import { notification } from "../libs/notification";

import {
  STORE_GOOGLE_TAKEOUT,
  STORE_ALEXA_TAKEOUT,
  STORE_ALEXA_CRAWLER_HISTORY,
  loadStorage,
} from "../libs/storage";

export async function donate(type) {
  try {
    console.log(`Data Donate:`, type);

    notification("Datenspende", "Upload wurde gestartet");

    if (type === "google") {
      const data = await loadStorage(STORE_GOOGLE_TAKEOUT);

      await upload("google", data);
    }

    if (type === "alexa") {
      const data = await loadStorage(STORE_ALEXA_TAKEOUT);

      await upload("alexa", data);

      const dataHistoryApi = await loadStorage(STORE_ALEXA_CRAWLER_HISTORY);

      await upload("alexa history api", dataHistoryApi);
    }

    notification("Datenspende", "Upload wurde erfolgreich abgeschlossen");
  } catch (error) {
    console.log("Data Donate Error", error);

    notification("Datenspende", "Unbekannter Fehler bei der Datenspende");
  }
}

async function upload(type, data) {
  const url = "https://parse-checkmyva.apps.openinc.dev/parse";

  const headers = {
    "X-Parse-Application-Id": "checkmyva",
    "Content-Type": "application/json",
  };

  const uploadResponse = await fetch(url + "/files/data.json", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!uploadResponse.ok) {
    throw new Error("upload bad status code");
  }

  const uploadJson = await uploadResponse.json();

  const fileName = uploadJson.name;
  const fileUrl = uploadJson.url;

  const objectResponse = await fetch(url + "/classes/CMVADataDonation", {
    method: "POST",
    headers,
    body: JSON.stringify({
      type,
      data: {
        __type: "File",
        name: fileName,
        url: fileUrl,
      },
    }),
  });

  if (!objectResponse.ok) {
    throw new Error("object creation bad status code");
  }
}
