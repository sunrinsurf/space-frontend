import React, { useState, useCallback } from "react";
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
import Button from "../../Form/Button";
import {
  ProductLetInProgress,
  ProductLetEnd
} from "../../../lib/api/ProductStatus";
import { useHistory } from "react-router";

const Header = styled.header`
  text-align: center;
  background: white;
  color: #494949;
  display: flex;
  height: 30%;
  width: 80%;
  margin: 0 auto 20px auto;
  justify-content: space-between;
  .fit {
    width: fit-content;
  }
  @media (max-width: 768px) {
    width: 100%;
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
  text-align: left;
  margin: auto 0;
  word-break: break-all;
  flex: 1;
  padding: 0 30px;
`;
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
  const history = useHistory();
  const { chatData, error, socketError, chatJoined, data, token } = useSelector(
    (state: RootState) => ({
      ...state.Chat,
      socketError: state.Socket.error,
      data: state.Auth.data,
      token: state.Auth.token
    })
  );
  const [openUser, setOpenUser] = useState(false);

  const toggleUser = useClickToggler(setOpenUser, openUser);
  React.useEffect(() => {
    dispatch(JoinChat(id));
  }, [dispatch, id]);
  React.useEffect(() => {
    if (!chatJoined) return;
    dispatch(SocketInit());
    dispatch(SocketConnect(id));

    return () => {
      dispatch(SocketDisconnect());
    };
  }, [dispatch, id, chatJoined]);

  const statusChange = useCallback(async () => {
    if (!token) return;
    if (chatData.product.status === "PRE_SHARE") {
      await ProductLetInProgress(id, token);
      dispatch(JoinChat(id));
    } else if (chatData.product.status === "IN_PROGRESS") {
      if (window && !window.confirm("정말 공유를 종료하시겠습니까?")) return;
      await ProductLetEnd(id, token);
      history.replace("/");
    }
  }, [dispatch, id, token, chatData, history]);
  if (error || socketError)
    return <ErrorComponent>{error || socketError}</ErrorComponent>;
  if (!chatData) return null;
  return (
    <div style={{ marginTop: "20px" }}>
      <Header>
        {data._id === chatData.product.owner._id &&
          chatData.product.status !== "END" && (
            <div className="fit">
              <Button onClick={statusChange}>
                {chatData.product.status === "PRE_SHARE"
                  ? "공유 시작"
                  : "공유 종료"}
              </Button>
            </div>
          )}
        <Title>{chatData.product.title}</Title>
        <div className="fit">
          <Toggler opened={openUser} onClick={toggleUser}>
            참여자 목록
          </Toggler>
        </div>
      </Header>
      <div>{openUser && <ChatUserList />}</div>
      <div
        style={{
          height: "65vh",
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
