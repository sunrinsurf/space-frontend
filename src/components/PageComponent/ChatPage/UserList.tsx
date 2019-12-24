import React from "react";
import styled, { css } from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import profile from '../../../assets/profile.svg';
import { getImageURL } from "../../../lib/api/UploadImage";

interface ChatUserProps {
  nickname: string;
  isOwner?: boolean;
  online?: boolean;
  profileImage?: string;
}

const Profile = styled.div<{ image?: string }>`
  width: 70px;
  height: 70px;
  border-radius: 35px;

  ${props => props.image ?
    css`
      background: url(${getImageURL(props.image)}) no-repeat;
    ` :
    css`
      background: url(${profile}) no-repeat;
    `}
    background-size: cover;
    background-position: center;
    
`;
const UserListC = styled.div`
 position:absolute;
 background-color:white;
 left:50%;
 transform : translateX(-50%);
 width:80%;
 @media(max-width:768px) {
   width:100% !important;
 }
`

function ChatUser({ nickname, isOwner, online, profileImage }: ChatUserProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid #EAEAEA",
        padding: "1em",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Profile image={profileImage} />
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
    <UserListC style={{ position: "absolute", backgroundColor: "white", left: "50%", transform: "translateX(-50%)", width: "80%" }} className="UserListChat">
      <ChatUser
        online={onlineData[chatData.product.owner._id]}
        nickname={chatData.product.owner.nickname}
        profileImage={chatData.product.owner.profileImage}
        isOwner
      />
      {chatData.product.participant.map((data: any) => {
        console.log(data);
        return (
          <ChatUser
            online={onlineData[data._id]}
            nickname={data.nickname}
            key={data._id}
            profileImage={data.profileImage}
          />
        );
      })}
    </UserListC>
  );
}

export default ChatUserList;
