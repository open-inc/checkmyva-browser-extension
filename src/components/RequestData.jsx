import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { app } from "../state";

const Container = styled.div``;

const Description = styled.div``;

const Example = styled.div`
  padding: 5px;
  border: 3px solid red;
  color: red;
`;

export const RequestData = observer(() => {
  return (
    <Container>
      <Description>
        <p>{app.translate("data_request_description_1")}</p>
        <p> {app.translate("data_request_description_2")}</p>
      </Description>

      <Example> {app.translate("data_request_description_3")}</Example>
    </Container>
  );
});
