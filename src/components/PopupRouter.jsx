import React from "react";
import { observer } from "mobx-react-lite";
import { app } from "../state";

import { RequestData } from "./RequestData";
import { GoogleTakeoutDataView } from "./GoogleTakeoutDataView";
import { AlexaTakeoutDataView } from "./AlexaTakeoutDataView";
import { AlexaCrawlerView } from "./AlexaCrawlerView";
import { DataDonateView } from "./DataDonateView";

export const PopupRouter = observer(() => {
  if (app.ui.popup === "request-data") {
    return <RequestData />;
  }

  if (app.ui.popup === "alexa-data") {
    return <AlexaTakeoutDataView />;
  }

  if (app.ui.popup === "alexa-crawler") {
    return <AlexaCrawlerView />;
  }

  if (app.ui.popup === "google-data") {
    return <GoogleTakeoutDataView />;
  }

  if (app.ui.popup === "data-donate-google") {
    return <DataDonateView />;
  }

  if (app.ui.popup === "data-donate-alexa") {
    return <DataDonateView />;
  }

  return null;
});
