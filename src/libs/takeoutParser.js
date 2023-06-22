import JSZip from "jszip";

import {
  STORE_ALEXA_TAKEOUT,
  STORE_GOOGLE_TAKEOUT,
  saveStorage,
} from "../libs/storage";
import { notification } from "../libs/notification";

export async function parseFile(name, content) {
  notification("Daten Auswertung", `Auswertung von '${name}' gestartet`);

  if (name.endsWith(".zip")) {
    return await parseZipFile(content);
  }

  if (name.endsWith(".html")) {
    return await parseGoogleHtmlFile(content);
  }

  if (name.endsWith(".json")) {
    return await parseGoogleJsonFile(content);
  }

  if (name.endsWith(".csv")) {
    return await parseAlexaCSVFile(content);
  }

  notification("Daten Auswertung", "Datei Format unbekannt");

  return false;
}

export async function parseZipFile(zipContent) {
  try {
    const zip = await JSZip.loadAsync(zipContent);

    const htmlDeFile = zip.file(
      "Takeout/Meine Aktivitäten/Google Assistant/MeineAktivitäten.html"
    );

    if (htmlDeFile) {
      console.log(
        "Takeout found: Takeout/Meine Aktivitäten/Google Assistant/MeineAktivitäten.html"
      );

      const htmlString = await htmlDeFile.async("string");

      return await parseGoogleHtmlFile(htmlString);
    }

    const htmlEnFile = zip.file(
      "Takeout/My Activity/Assistant/MyActivity.html"
    );

    if (htmlEnFile) {
      console.log(
        "Takeout found: Takeout/My Activity/Assistant/MyActivity.html"
      );

      const htmlString = await htmlEnFile.async("string");

      return await parseGoogleHtmlFile(htmlString);
    }

    const jsonDeFile = zip.file(
      "Takeout/Meine Aktivitäten/Google Assistant/MeineAktivitäten.json"
    );

    if (jsonDeFile) {
      console.log(
        "Takeout found: Takeout/Meine Aktivitäten/Google Assistant/MeineAktivitäten.json"
      );

      const jsonString = await jsonDeFile.async("string");

      return await parseGoogleJsonFile(jsonString);
    }

    const jsonEnFile = zip.file(
      "Takeout/My Activity/Assistant/MyActivity.json"
    );

    if (jsonEnFile) {
      console.log(
        "Takeout found: Takeout/My Activity/Assistant/MyActivity.json"
      );

      const jsonString = await jsonEnFile.async("string");

      return await parseGoogleJsonFile(jsonString);
    }

    const csvFile = zip.file("Audio and Transcription/Transcriptions.csv");

    if (csvFile) {
      console.log(
        "Alexa Takeout found: Audio and Transcription/Transcriptions.csv"
      );

      const csvString = await csvFile.async("string");

      return await parseAlexaCSVFile(csvString);
    }

    const csvFile1 = zip.file("Audio and Transcription/Transcriptions-1.csv");
    const csvFile2 = zip.file("Audio and Transcription/Transcriptions-2.csv");
    const csvFile3 = zip.file("Audio and Transcription/Transcriptions-3.csv");

    if (csvFile1 && csvFile2 && csvFile3) {
      console.log(
        "Alexa Takeout found: Audio and Transcription/Transcriptions-(1+2+3).csv"
      );

      const csvString1 = await csvFile1.async("string");
      const csvString2 = await csvFile2.async("string");
      const csvString3 = await csvFile3.async("string");

      const csvString =
        csvString1 +
        csvString2.substring(csvString2.indexOf("\n") + 1) +
        csvString3.substring(csvString3.indexOf("\n") + 1);

      return await parseAlexaCSVFile(csvString);
    }

    if (csvFile1 && csvFile2) {
      console.log(
        "Alexa Takeout found: Audio and Transcription/Transcriptions-(1+2).csv"
      );

      const csvString1 = await csvFile1.async("string");
      const csvString2 = await csvFile2.async("string");

      const csvString =
        csvString1 + csvString2.substring(csvString2.indexOf("\n") + 1);

      return await parseAlexaCSVFile(csvString);
    }

    if (csvFile1) {
      console.log(
        "Alexa Takeout found: Audio and Transcription/Transcriptions-1.csv"
      );

      const csvString = await csvFile1.async("string");

      return await parseAlexaCSVFile(csvString);
    }

    return false;
  } catch (error) {
    console.error(error);
    // handle error

    return false;
  }
}

export async function parseGoogleHtmlFile(content) {
  // const doc = new DOMParser().parseFromString(content, 'text/xml');

  notification(
    "Google Daten",
    "Daten im HTML Format können momentan nicht ausgewertet werden"
  );

  return false;
}

export async function parseGoogleJsonFile(content) {
  try {
    const json = JSON.parse(content);

    const takeoutVoiceLines = json
      .filter((line) => line.products.includes("Google Assistant"))
      .map((line) => {
        return {
          timestamp: new Date(line.time).valueOf(),
          request: line.title,
          response: line.subtitles?.map((subtitle) => subtitle.name).join(", "),
        };
      });

    await saveStorage(STORE_GOOGLE_TAKEOUT, {
      takeoutVoiceLines: takeoutVoiceLines,
    });

    notification("Google Daten", "Daten wurden ausgewertet");

    return true;
  } catch (error) {
    notification(
      "Google Daten Fehler",
      "Daten konnten nicht ausgewertet werden"
    );

    return false;
  }
}

export async function parseAlexaCSVFile(content) {
  try {
    const csv = content.split("\r\n").map((row) => row.split(","));

    const [head, ...rows] = csv;

    const takeoutVoiceLines = rows.map(([date, request, file, response]) => {
      return {
        timestamp: new Date(date).valueOf(),
        request,
        response,
        file,
      };
    });

    await saveStorage(STORE_ALEXA_TAKEOUT, {
      takeoutVoiceLines: takeoutVoiceLines,
    });

    notification("Alexa Daten", "Daten wurden ausgewertet");

    return true;
  } catch (error) {
    notification(
      "Alexa Daten Fehler",
      "Daten konnten nicht ausgewertet werden"
    );

    return false;
  }
}
