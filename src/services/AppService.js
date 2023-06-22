import { AlexaService } from "./AlexaService";
import { GoogleService } from "./GoogleService";
import { UiService } from "./UiService";

export class AppService {
  constructor() {
    this.ui = new UiService();
    this.alexa = new AlexaService();
    this.google = new GoogleService();

    window.app = this;
  }

  translate(msg, data = {}) {
    let str = chrome.i18n.getMessage(msg);

    for (const [key, value] of Object.entries(data)) {
      str = str.replace(`{{${key}}}`, value);
    }

    return str;
  }
}
