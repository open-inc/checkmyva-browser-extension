import {
  loadStorage,
  STORE_ALEXA_TAKEOUT,
  STORE_GOOGLE_TAKEOUT,
} from "../libs/storage";

export async function handleExternalMessage(msg) {
  if (msg.type === "validate") {
    return true;
  }

  if (msg.type === "fetch-values") {
    if (msg.id === "checkmyva.alexa.takeout") {
      const storage = await loadStorage(STORE_ALEXA_TAKEOUT);
      const takeoutVoiceLines = storage.takeoutVoiceLines;
      const values = takeoutVoiceLines
        .map((vl) => ({
          date: vl.timestamp,
          value: [vl.request || vl.message, vl.response, vl.device],
        }))
        .filter((v) => v.date >= msg.start && v.date <= msg.end)
        .sort((a, b) => a.date - b.date);

      return values;
    }

    if (msg.id === "checkmyva.google.takeout") {
      const storage = await loadStorage(STORE_GOOGLE_TAKEOUT);
      const takeoutVoiceLines = storage.takeoutVoiceLines;
      const values = takeoutVoiceLines
        .map((vl) => ({
          date: vl.timestamp,
          value: [vl.request || vl.message, vl.response, vl.device],
        }))
        .filter((v) => v.date >= msg.start && v.date <= msg.end)
        .sort((a, b) => a.date - b.date);

      return values;
    }

    return [];
  }

  return null;
}
