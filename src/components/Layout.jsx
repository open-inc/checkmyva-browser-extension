// @ts-check

import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { app } from "../state";
import { closeIcon, devIcon, guideIcon, helpIcon, homeIcon } from "./icons";
import { TabRouter } from "./TabRouter";
import { PopupRouter } from "./PopupRouter";

const devMode = false;

const Container = styled.div`
  width: 400px;
`;

const Content = styled.div`
  padding: 20px;
`;

const PopupCloser = styled.div`
  text-align: right;
  padding: 20px 20px 0 20px;
`;

const PopupCloserIcon = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0;

  font-size: 24px;

  &:hover {
    cursor: pointer;
  }
`;

const Header = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 10px 5px;
`;

const Navigation = styled.div`
  display: flex;
  padding: 0px 20px 0 20px;
  gap: 10px;
`;

const NavigationButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  padding: 14px 5px;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-weight: bold;

  border-radius: 10px;

  &:hover,
  &.active {
    background: #eeeeee;

    /* border-top-left-radius: 10px;
    border-top-right-radius: 10px; */
  }
`;

const NavigationButtonIcon = styled.span`
  display: block;
`;

const NavigationButtonLabel = styled.span`
  display: block;
`;

const Footer = styled.div`
  display: flex;
  background: #f0fdff;
  border-top: 1px solid #f4f4f4;
`;

const FooterButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  padding: 30px 5px;
  background: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;

  &:hover {
    background: #d2f9ff;
  }
`;

const FooterButtonIcon = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 24px;
`;

const FooterButtonLabel = styled.span`
  display: block;
  font-size: 11px;
`;

export const Layout = observer(({ children }) => {
  return (
    <Container>
      {!app.ui.popup && (
        <Header>
          <img src="assets/logo-checkmyva.jpg" width="180" />
        </Header>
      )}

      {!app.ui.popup && (
        <Navigation>
          <NavigationButton
            className={app.ui.tab === "alexa" ? "active" : undefined}
            onClick={() => app.ui.setTab("alexa")}
          >
            <NavigationButtonIcon></NavigationButtonIcon>
            <NavigationButtonLabel>
              {app.translate("tab_alexa")}
            </NavigationButtonLabel>
          </NavigationButton>
          <NavigationButton
            className={app.ui.tab === "google" ? "active" : undefined}
            onClick={() => app.ui.setTab("google")}
          >
            <NavigationButtonIcon></NavigationButtonIcon>
            <NavigationButtonLabel>
              {app.translate("tab_google")}
            </NavigationButtonLabel>
          </NavigationButton>
        </Navigation>
      )}

      {app.ui.popup && (
        <PopupCloser>
          <PopupCloserIcon
            onClick={() => {
              app.ui.popup = null;
            }}
          >
            {closeIcon}
          </PopupCloserIcon>
        </PopupCloser>
      )}

      {app.ui.popup && (
        <Content>
          <PopupRouter />
        </Content>
      )}

      {!app.ui.popup && (
        <Content>
          <TabRouter />
        </Content>
      )}

      <Footer>
        <FooterButton onClick={() => app.ui.openHomePage()}>
          <FooterButtonIcon>{homeIcon}</FooterButtonIcon>
          <FooterButtonLabel>
            {app.translate("footer_homepage")}
          </FooterButtonLabel>
        </FooterButton>

        <FooterButton onClick={() => app.ui.openGuide()}>
          <FooterButtonIcon>{guideIcon}</FooterButtonIcon>
          <FooterButtonLabel>{app.translate("footer_guide")}</FooterButtonLabel>
        </FooterButton>

        <FooterButton onClick={() => app.ui.openHelp()}>
          <FooterButtonIcon>{helpIcon}</FooterButtonIcon>
          <FooterButtonLabel>{app.translate("footer_help")}</FooterButtonLabel>
        </FooterButton>

        {devMode && (
          <FooterButton onClick={() => app.ui.openPopup()}>
            <FooterButtonIcon>{devIcon}</FooterButtonIcon>
            <FooterButtonLabel>{app.translate("footer_dev")}</FooterButtonLabel>
          </FooterButton>
        )}
      </Footer>
    </Container>
  );
});
