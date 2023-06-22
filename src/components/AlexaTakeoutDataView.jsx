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

export const AlexaTakeoutDataView = observer(() => {
  const voiceLines = React.useMemo(
    () =>
      app.alexa.takeoutVoiceLines
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter((v, index) => index < 10),
    [app.alexa.takeoutVoiceLines]
  );

  const DateTimeFormat = React.useMemo(
    () =>
      new Intl.DateTimeFormat("de", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    []
  );

  return (
    <Container>
      {app.alexa.takeoutVoiceLines.length === 0 && (
        <VoiceLines>
          <p style={{ textAlign: "center" }}>
            {app.translate("history_empty")}
          </p>
        </VoiceLines>
      )}
      {app.alexa.takeoutVoiceLines.length > 0 && (
        <VoiceLines>
          <p>
            {app.translate("history_description", {
              current: voiceLines.length,
              all: app.alexa.takeoutVoiceLines.length,
            })}
          </p>
          {voiceLines.map(({ key, timestamp, request, response, device }) => (
            <VoiceLine key={key}>
              <span>
                {request} ({device || app.translate("history_no_device")})
              </span>
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
              chrome.tabs.update({
                url:
                  "https://www.amazon.de/gp/privacycentral/dsar/preview.html#checkmyva",
              });
            },
          },
          {
            label: app.translate("data_sync_alexa"),
            onClick: () => {
              app.ui.popup = "alexa-crawler";
            },
          },
          {
            label: app.translate("data_import"),
            onClick: () => {
              chrome.tabs.update({ url: chrome.runtime.getURL("upload.html") });
            },
          },
          {
            label: app.translate("data_donate"),
            onClick: () => {
              app.ui.popup = "data-donate-alexa";
            },
          },
          {
            label: app.translate("data_delete"),
            disabled: app.alexa.takeoutVoiceLines.length === 0,
            onClick: () => {
              app.alexa.deleteData();
            },
          },
          {
            label: app.translate("data_settings_alexa"),
            onClick: () => {
              chrome.tabs.update({
                url:
                  "https://www.amazon.com/alexa-privacy/apd/home?language=de",
              });
            },
          },
        ]}
      />
    </Container>
  );
});
