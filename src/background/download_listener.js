import { parseZipFile } from "../libs/takeoutParser";

export async function initDownloadListener() {
  // const result = await searchDownloads({});

  // for (const download of result) {
  //   if (isDownloadTakeout(download)) {
  //     parseDownload(download);
  //     break;
  //   }
  // }

  chrome.downloads.onCreated.addListener((download) => {
    parseDownload(download);
  });

  chrome.downloads.onChanged.addListener(async ({ id, state }) => {
    if (state && state.current === "complete") {
      const [download] = await searchDownloads({ id });

      parseDownload(download);
    }
  });
}

function isDownloadTakeout(download) {
  if (
    download.exists === true &&
    download.state === "complete" &&
    (download.mime === "application/zip" ||
      download.mime === "application/x-zip")
  ) {
    if (
      download.url.startsWith(
        "https://takeout.google.com/settings/takeout/downloads"
      ) &&
      download.finalUrl.includes("googleusercontent.com/download/storage")
    ) {
      return "google";
    }

    if (
      download.referrer.startsWith(
        "https://www.amazon.de/gp/privacycentral/dsar/view.html"
      ) &&
      download.finalUrl.startsWith(
        "https://www.amazon.de/documents/download"
      ) &&
      download.filename.includes("Alexa") &&
      download.filename.endsWith(".zip")
    ) {
      return "alexa";
    }
  }

  return false;
}

async function parseDownload(download) {
  const type = isDownloadTakeout(download);

  if (!type) {
    return;
  }

  const zipContent = await fetchLocal(download.filename);

  await parseZipFile(zipContent);
}

function searchDownloads(query) {
  return new Promise((resolve, reject) => {
    chrome.downloads.search(query, (result) => {
      resolve(result);
    });
  });
}

function fetchLocal(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = "arraybuffer";

    xhr.onload = function() {
      resolve(xhr.response || xhr.responseText);
    };

    xhr.onerror = function() {
      reject(new Error("fetchLocal() failed."));
    };

    xhr.open("GET", url, true);
    xhr.send(null);
  });
}
