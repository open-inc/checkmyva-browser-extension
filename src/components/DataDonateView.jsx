import React from "react";
import { observer } from "mobx-react-lite";
import { app } from "../state";

import { ActionList } from "./ActionList";

export const DataDonateView = observer(() => {
  const isGoogle = app.ui.popup === "data-donate-google";
  const isAlexa = app.ui.popup === "data-donate-alexa";

  if (!isGoogle && !isAlexa) return null;

  return (
    <ActionList
      descriptions={[
        app.translate("donate_description_1"),
        app.translate("donate_description_2"),
        app.translate("donate_description_3"),
      ]}
      cta={
        isAlexa
          ? {
              label: app.translate("donate_action_alexa"),
              onClick: () => {
                chrome.runtime.sendMessage({
                  action: "donate",
                  type: "alexa",
                });
              },
            }
          : {
              label: app.translate("donate_action_google"),
              onClick: () => {
                chrome.runtime.sendMessage({
                  action: "donate",
                  type: "google",
                });
              },
            }
      }
    />
  );
});
