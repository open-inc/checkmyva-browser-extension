import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { app } from "../state";

import { ActionList } from "./ActionList";

import {
  Container,
  Count,
  Actions,
  VoiceLines,
  VoiceLine,
  VoiceLineTime,
} from "./common";

export const GoogleTakeoutDataView = observer(() => {
  const voiceLines = React.useMemo(
    () =>
      app.google.takeoutVoiceLines
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter((v, index) => index < 10),
    [app.google.takeoutVoiceLines]
  );

  const DateTimeFormat = React.useMemo(
    () =>
      new Intl.DateTimeFormat("de", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second: 'numeric',
      }),
    []
  );

  return (
    <Container>
      {app.google.takeoutVoiceLines.length === 0 && (
        <VoiceLines>
          <p style={{ textAlign: "center" }}>
            {app.translate("history_empty")}
          </p>
        </VoiceLines>
      )}
      {app.google.takeoutVoiceLines.length > 0 && (
        <VoiceLines>
          <p>
            {app.translate("history_description", {
              current: voiceLines.length,
              all: app.alexa.takeoutVoiceLines.length,
            })}
          </p>
          {voiceLines.map(({ key, timestamp, request }) => (
            <VoiceLine key={key}>
              <span children={request} />
              <VoiceLineTime>
                <span children={DateTimeFormat.format(timestamp)} />
              </VoiceLineTime>
            </VoiceLine>
          ))}
        </VoiceLines>
      )}

      <ActionList
        // descriptions={[app.translate("data_description_google")]}
        cta={{
          label: app.translate("cta_dashboard"),
          onClick: () => app.ui.openDashboard(),
        }}
        actions={[
          {
            label: app.translate("data_request"),
            onClick: () => {
              app.ui.popup = "request-data";
              chrome.tabs.update({ url: "https://takeout.google.com/" });
            },
          },
          // {
          //   label: app.translate("data_sync_google"),
          //   onClick: () => {
          //     app.ui.popup = "google-crawler";
          //   },
          // },
          {
            label: app.translate("data_import"),
            onClick: () => {
              chrome.tabs.update({ url: chrome.runtime.getURL("upload.html") });
            },
          },
          {
            label: app.translate("data_donate"),
            onClick: () => {
              app.ui.popup = "data-donate-google";
            },
          },
          {
            label: app.translate("data_delete"),
            disabled: app.google.takeoutVoiceLines.length === 0,
            onClick: () => {
              app.google.deleteData();
            },
          },
          {
            label: app.translate("data_settings_google"),
            onClick: () => {
              chrome.tabs.update({
                url: "https://myactivity.google.com/activitycontrols",
              });
            },
          },
        ]}
      />
    </Container>
  );
});
