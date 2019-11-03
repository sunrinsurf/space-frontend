import React from "react";
import styled, { css } from "styled-components";

const Bubble = styled.div<{ myChat?: boolean }>`
  padding: 0.5em;
  border-radius: 10px;
  ${props => {
    if (props.myChat) {
      return css`
        background: yellow;
      `;
    }
    return css`
      background: #eaeaea;
    `;
  }}
`;
interface ChatBubbleProps {
  message: string;
  myChat?: boolean;
  by?: string;
}
function ChatBubble({ message, myChat, by }: ChatBubbleProps) {
  return <Bubble myChat={myChat}>{message}</Bubble>;
}

export default ChatBubble;
