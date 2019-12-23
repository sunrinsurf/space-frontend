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
  text-align: center;
  background: white;
  color: #494949;
  display:flex;
  margin-bottom:10px;
  width:80%;
  margin: 0 auto;
  justify-content:space-between;
  @media(max-width:768px) {
    width:100%;
  }
`;
const Title = styled.div`
font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #494949;
  text-align:left;
  margin: auto 0;
  word-break:break-all;
  @media(max-width:768px) {
  }
  `
const Toggler = styled.div<{ opened?: boolean }>`
  cursor: pointer;
  padding: 0.5em 0.7em;
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
    <div style={{ height: "100%", marginTop: "20px" }}>
      <Header>
        <Title>{chatData.product.title}</Title>
        <div style={{ minWidth: "fit-content" }}>
          <Toggler opened={openUser} onClick={toggleUser}>
            설정
        </Toggler>
        </div>
      </Header>
      <div>
        {openUser && <ChatUserList />}
      </div>
      <div
        style={{
          height: "80vh",
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
