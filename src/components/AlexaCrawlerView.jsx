import React from "react";
import { observer } from "mobx-react-lite";
import { app } from "../state";

import { ActionList } from "./ActionList";

export const AlexaCrawlerView = observer(() => {
  return (
    <ActionList
      descriptions={[
        app.translate("sync_description_1"),
        app.translate("sync_description_2"),
        app.translate("sync_description_3"),
      ]}
      actions={[
        {
          label: app.alexa.crawlerConfigEnabled
            ? app.translate("sync_deactivate")
            : app.translate("sync_activate"),
          onClick: () => {
            if (app.alexa.crawlerConfigEnabled) {
              app.alexa.setCrawlerConfigEnabled(false);
            } else {
              app.alexa.setCrawlerConfigEnabled(true);
            }
          },
        },
        {
          label: app.translate("sync_start"),
          onClick: () => {
            app.alexa.startCrawler();
          },
        },
        {
          label: app.translate("sync_reset"),
          onClick: () => {
            app.alexa.resetCrawler();
          },
        },
        {
          label: app.translate("sync_export"),
          onClick: () => {
            app.alexa.exportCrawlerData();
          },
        },
      ]}
    />
  );
});
