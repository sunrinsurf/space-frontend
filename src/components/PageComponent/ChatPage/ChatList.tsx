import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import ChatBubble from "./ChatBubble";

function ChatList() {
  const messages = useSelector((state: RootState) => state.Socket.messages);
  return (
    <div style={{ flex: "1", overflowY: "scroll" }}>
      {messages.map((data, i) => {
        if (data.type === "MY") {
          return <ChatBubble myChat={true} message={data.message} key={i} />;
        }
        return <ChatBubble message={data.message} by={data.nickname} key={i} />;
      })}
    </div>
  );
}

export default ChatList;
