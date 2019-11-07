import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import { JoinChat } from "../../../store/Chat";
import ErrorComponent from "../../ErrorComponent";
import styled, { css } from "styled-components";
import ChatUserList from "./UserList";
import useClickToggler from "../../../lib/useClickToggler";
import ChatForm from "./ChatForm";
import {
  SocketConnect,
  SocketDisconnect,
  SocketInit
} from "../../../store/Socket";
import ChatList from "./ChatList";

const Header = styled.header`
  padding: 0.5em;
  text-align: center;
  background: rgb(17, 131, 250);
  color: white;
`;
const Toggler = styled.div<{ opened?: boolean }>`
  cursor: pointer;
  padding: 0.5em 1em;
  background: #eaeaea;
  &::before {
    ${props => {
    if (props.opened) {
      return css`
          content: "▲";
        `;
    }
    return css`
        content: "▼";
      `;
  }}
    color: gray;
  }
`;
interface ChatPageComponentProps {
  id: string;
}
function ChatPageComponent({ id }: ChatPageComponentProps) {
  const dispatch = useDispatch();
  const { chatData, error, socketError, chatJoined } = useSelector((state: RootState) => ({ ...state.Chat, socketError: state.Socket.error }));
  const [openUser, setOpenUser] = useState(false);

  const toggleUser = useClickToggler(setOpenUser, openUser);
  React.useEffect(() => {
    dispatch(JoinChat(id));
  }, [dispatch, id]);
  React.useEffect(() => {

    if (!chatJoined) return;
    console.log(chatJoined);
    dispatch(SocketInit());
    dispatch(SocketConnect(id));

    return () => {
      dispatch(SocketDisconnect());
    };
  }, [dispatch, id, chatJoined]);

  if (error || socketError) return <ErrorComponent>{error || socketError}</ErrorComponent>;
  if (!chatData) return null;

  return (
    <div style={{ height: "100%" }}>
      <Header>
        <h1>{chatData.product.title}</h1>
      </Header>
      <div>
        <Toggler opened={openUser} onClick={toggleUser}>
          참여자 목록
        </Toggler>
        {openUser && <ChatUserList />}
      </div>
      <div
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <ChatList />
        <ChatForm />
      </div>
    </div>
  );
}

export default ChatPageComponent;
