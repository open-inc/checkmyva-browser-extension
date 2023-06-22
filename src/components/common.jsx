import styled from "styled-components";

export const Container = styled.div``;

export const Count = styled.div`
  /* font-size: 20px; */
  text-align: right;
  margin-bottom: 20px;
`;

export const Actions = styled.div`
  font-size: 20px;
  text-align: center;

  padding: 10px 5px;

  line-height: 30px;

  border-top: 1px solid #ccc;
  background: #eee;

  button {
    line-height: 26px;
    background: white;
    border: 1px solid #aaa;
    display: block;
    margin-bottom: 5px;
    width: 100%;
  }
`;

export const VoiceLines = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

export const VoiceLine = styled.div`
  overflow-wrap: break-word;
  margin-bottom: 5px;
`;

export const VoiceLineTime = styled.span`
  float: right;
  font-size: 0.7em;
`;
