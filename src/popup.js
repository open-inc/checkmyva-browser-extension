import "libs/polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { configure } from "mobx";
import defaultTheme from "./themes/default";

import { Layout } from "./components/Layout";

configure({
  enforceActions: "never",
});

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    box-sizing: border-box;
  }


  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }

  p {
    margin-top: 0;
  }
`;

const Popup = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <Layout />
      </ThemeProvider>
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<Popup />, root);
