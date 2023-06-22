import { parseFile, parseZipFile } from "./takeoutParser";
import { notification } from "../libs/notification";

export async function initTakeoutUpload() {
  try {
    console.log("Takeout Upload init");

    const file = await showOpenFilePicker();

    console.log(file);

    const name = file.name;

    if (name.endsWith(".zip")) {
      const content = await file.arrayBuffer();
      return await parseZipFile(content);
    } else {
      const content = await file.text();

      await parseFile(name, content);
    }
  } catch (error) {
    console.log("Takeout Upload Error", error);

    notification("Daten Import", "Unbekannter Fehler...");
  }
}

async function showOpenFilePicker() {
  console.log("showOpenFilePicker");
  if (window.showOpenFilePicker) {
    console.log("showOpenFilePicker a");
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();

    return file;
  } else {
    console.log("showOpenFilePicker b");
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = false;
      input.accept = "*/*";
      input.addEventListener("change", () => {
        resolve(input.files[0]);
      });
      input.click();

      console.log(input);
    });
  }
}
