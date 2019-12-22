import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import moment from 'moment';
import { getImageURL } from "../../../lib/api/UploadImage";
import profile from '../../../assets/profile.svg';
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
const Flex = styled.div<{ myChat?: boolean; }>`
  display: flex;
  align-items: center;
  margin: 1em;
  ${props => props.myChat && "justify-content: flex-end;"}
`;
const ProfileImage = styled.div<{ image?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: url(${props => props.image ? getImageURL(props.image) : profile}) no-repeat;
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;
interface ChatBubbleProps {
  message: string;
  myChat?: boolean;
  by?: string;
  profileImage?: string;
  time: Date;
}
function ChatBubble({ message, myChat, by, time, profileImage }: ChatBubbleProps) {
  const timeString = useMemo(() => moment(time).format('hh:mm A'), [time]);
  return (
    <Flex myChat={myChat}>
      {!myChat && <ProfileImage image={profileImage} role="img" aria-label={`${by} profile`} />}
      <div      >
        {!myChat && <div>{by}</div>}
        <div style={{ display: 'flex', flexDirection: myChat ? 'row-reverse' : undefined, alignItems: 'flex-end' }}>
          <Bubble myChat={myChat}>{message}</Bubble>
          <span style={{ margin: '0 1em' }}>{timeString}</span>
        </div>
      </div>
    </Flex>
  );
}

export default ChatBubble;
