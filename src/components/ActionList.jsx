// @ts-check

import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { app } from "../state";

const Container = styled.div`
  padding: 0 30px;
`;
const Descriptions = styled.div``;
const Actions = styled.div``;
const ActionButton = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  padding: 0;
  margin-bottom: 16px;

  display: block;
  width: 100%;
  text-align: left;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ActionButtonArrow = styled.span`
  float: right;
  color: #00b0f0;
  margin-left: 10px;
  /* font-weight: bold; */
`;

const CallToActionContainer = styled.div`
  padding: 0 5px;

  margin-top: 20px;

  text-align: center;
`;

const CallToActionButton = styled.button`
  background: #00b0f0;
  border: 1px solid #0093c9;
  border-radius: 20px;
  height: 40px;
  line-height: 40px;

  padding: 0 20px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #0093c9;
  }
`;

export const ActionList = observer(
  ({ descriptions = [], actions = [], cta }) => {
    return (
      <>
        <Container>
          <Descriptions>
            {descriptions.map((description, i) => (
              <p key={i}>{description}</p>
            ))}
          </Descriptions>
          <Actions>
            {actions.map((action, i) => (
              <ActionButton
                key={i}
                disabled={action.disabled || false}
                onClick={action.onClick}
              >
                {action.label}

                <ActionButtonArrow children="→" />
              </ActionButton>
            ))}
          </Actions>
        </Container>

        {cta && (
          <CallToActionContainer>
            <CallToActionButton onClick={cta.onClick}>
              {cta.label}
            </CallToActionButton>
          </CallToActionContainer>
        )}
      </>
    );
  }
);
