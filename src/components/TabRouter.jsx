import React from "react";
import { observer } from "mobx-react-lite";
import { app } from "../state";

import { GoogleTakeoutDataView } from "./GoogleTakeoutDataView";
import { AlexaTakeoutDataView } from "./AlexaTakeoutDataView";

export const TabRouter = observer(() => {
  if (app.ui.tab === "google") {
    return <GoogleTakeoutDataView />;
  }

  if (app.ui.tab === "alexa") {
    return <AlexaTakeoutDataView />;
  }

  return null;
});
