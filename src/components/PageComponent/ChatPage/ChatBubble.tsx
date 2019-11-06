import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import moment from 'moment';

const Bubble = styled.div<{ myChat?: boolean }>`
  padding: 0.5em 1em;
  border-radius: 30px;
  display: inline-block;
  max-width: 60vw;
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
  time: Date;
}
function ChatBubble({ message, myChat, by, time }: ChatBubbleProps) {
  const timeString = useMemo(() => moment(time).format('hh:mm A'), [time]);
  return (
    <div
      style={{ margin: ".75em 1em", textAlign: myChat ? "right" : undefined }}
    >
      {!myChat && <div>{by}</div>}
      <div style={{ display: 'flex', flexDirection: myChat ? 'row-reverse' : undefined, alignItems: 'flex-end' }}>
        <Bubble myChat={myChat}>{message}</Bubble>
        <span style={{ margin: '0 1em' }}>{timeString}</span>
      </div>
    </div>
  );
}

export default ChatBubble;
