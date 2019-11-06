import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Page from "../Page";
import { CleanChat } from "../../store/Chat";
import ChatPageComponent from "../PageComponent/ChatPage";

function ChatPage(props: RouteComponentProps<{ id: string }>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CleanChat());
  }, [dispatch, props.match.params.id]);
  return (
    <Page title="채팅" noPadding>
      <ChatPageComponent id={props.match.params.id} />
    </Page>
  );
}

export default withRouter(ChatPage);