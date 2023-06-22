import { makeAutoObservable } from "mobx";

import {
  STORE_GOOGLE_TAKEOUT,
  saveStorage,
  resetStorage,
  subscribeStorage,
} from "../libs/storage";

export class GoogleService {
  constructor() {
    subscribeStorage(this, STORE_GOOGLE_TAKEOUT);

    makeAutoObservable(this);
  }

  async deleteData() {
    resetStorage(STORE_GOOGLE_TAKEOUT).then((ok) => {
      console.log("google-takeout reset");
    });
  }
}
