import React from "react";
import styled, { css } from "styled-components";

const Bubble = styled.div<{ myChat?: boolean }>`
  padding: 0.5em;
  border-radius: 10px;
  display: inline-block;
  ${props => {
    if (props.myChat) {
      return css`
        background: rgb(17, 131, 250);
        color: white;
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
  return (
    <div
      style={{ margin: ".75em 1em", textAlign: myChat ? "right" : undefined }}
    >
      {!myChat && <div>{by}</div>}
      <Bubble myChat={myChat}>{message}</Bubble>
    </div>
  );
}

export default ChatBubble;
