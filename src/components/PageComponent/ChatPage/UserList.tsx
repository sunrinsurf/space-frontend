import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";

interface ChatUserProps {
  nickname: string;
  isOwner?: boolean;
  online?: boolean;
}

const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: gray;
`;
function ChatUser({ nickname, isOwner, online }: ChatUserProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid #EAEAEA",
        padding: "1em",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Profile />
      <div style={{ marginLeft: "1.5em" }}>
        <h3 style={{ marginBottom: 5 }}>
          {isOwner && (
            <span role="img" aria-label="star" style={{ marginRight: ".5em" }}>
              ⭐
            </span>
          )}
          {nickname}
        </h3>
        {online && <span style={{ color: "green" }}>● 온라인</span>}
      </div>
    </div>
  );
}
function ChatUserList() {
  const { chatData, onlineData } = useSelector((state: RootState) => ({
    chatData: state.Chat.chatData,
    onlineData: state.Socket.onlineData
  }));
  return (
    <div>
      <ChatUser
        online={onlineData[chatData.product.owner._id]}
        nickname={chatData.product.owner.nickname}
        isOwner
      />
      {chatData.product.participant.map((data: any) => {
        return (
          <ChatUser
            online={onlineData[data._id]}
            nickname={data.nickname}
            key={data._id}
          />
        );
      })}
    </div>
  );
}

export default ChatUserList;
