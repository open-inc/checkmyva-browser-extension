import "libs/polyfills";
import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

import { parseFile, parseZipFile } from "./libs/takeoutParser";

import { useDropzone } from "react-dropzone";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px;

  font-size: 20px;
`;

const SuccessMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  width: 100%;
  height: 100%;

  text-align: center;
`;

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  // if (props.isDragReject) {
  //   return "#ff1744";
  // }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Error = styled.p`
  color: #ff1744;
`;

const Dropzone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  border: 2px dashed #eeeeee;
  border-color: ${(props) => getColor(props)};

  border-radius: 2px;
  background-color: #fafafa;

  color: #8c8c8c;
  outline: none;
  transition: border 0.24s ease-in-out;

  width: 100%;
  height: 100%;

  text-align: center;
`;

const Popup = () => {
  const [state, setState] = React.useState(null);

  const onDrop = React.useCallback(
    async (files) => {
      if (files[0]) {
        setState("loading");

        const file = files[0];

        const name = file.name.toLowerCase();

        if (name.endsWith(".zip")) {
          const content = await file.arrayBuffer();

          const success = await parseZipFile(content);

          return setState(success ? "success" : "error");
        }

        if (name.endsWith(".json") || name.endsWith(".csv")) {
          const content = await file.text();

          const success = await parseFile(name, content);

          return setState(success ? "success" : "error");
        }
      }

      setState("unsupported");
    },
    [setState]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: [
      ".json",
      ".csv",
      ".zip",
      "application/json",
      "text/csv",
      "application/zip",
    ],
  });

  return (
    <>
      <GlobalStyle />
      <Container>
        {state === "loading" && (
          <SuccessMessage>
            <div>
              ⌛ <br />
              Die Datei wird ausgewertet...
            </div>
          </SuccessMessage>
        )}

        {state === "success" && (
          <SuccessMessage>
            <div>
              🎉 <br />
              Die Datei wurde ausgewertet!
              <br />
              <button
                onClick={() => {
                  setState(null);
                }}
              >
                Weitere Datei auswerten
              </button>
            </div>
          </SuccessMessage>
        )}

        {state === "error" && (
          <SuccessMessage>
            <div>
              ❌ <br />
              Die Datei konnte nicht ausgewertet werden.
              <br />
              <button
                onClick={() => {
                  setState(null);
                }}
              >
                Erneut versuchen
              </button>
            </div>
          </SuccessMessage>
        )}

        {state === "unsupported" && (
          <SuccessMessage>
            <div>
              ❌ <br />
              Diese Datei wird nicht unterstützt.
              <br />
              <button
                onClick={() => {
                  setState(null);
                }}
              >
                Erneut versuchen
              </button>
            </div>
          </SuccessMessage>
        )}

        {!state && (
          <Dropzone
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />

            <div>
              {isDragActive || isDragAccept ? (
                <p>Lege die Datei hier ab ...</p>
              ) : (
                <>
                  <p>
                    Ziehe eine Datei in dieses Feld oder klicke, um eine Datei
                    auszuwählen.
                  </p>

                  <p>
                    Akzeptiert werden Google bzw. Alexa Takeout .zip Dateien.
                    Alternativ können Alexa Transcriptions.csv und Google
                    MeineAktivitäten.json Datein geladen werden.
                  </p>
                </>
              )}
              {/* <div>isDragActive: {isDragActive.toString()}</div>
              <div>isDragAccept: {isDragAccept.toString()}</div>
              <div>isDragReject: {isDragReject.toString()}</div> */}
            </div>
          </Dropzone>
        )}
      </Container>
    </>
  );
};

ReactDOM.render(<Popup />, document.body);
