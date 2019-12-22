import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";
import ChatBubble from "./ChatBubble";
import "./ChatList.css";
function ChatList() {
  const messages = useSelector((state: RootState) => state.Socket.messages);
  const list = useRef<HTMLDivElement>();
  useEffect(() => {
    if (!list.current) return;
    const l = list.current;
    l.scrollTop = l.scrollHeight;
  }, [messages, list]);
  return (
    <div style={{ flex: "1", overflowY: "scroll", width: "70%", margin: "0 auto" }} ref={list as any} className="wrap">
      {messages.map((data, i) => {
        if (data.type === "MY") {
          return <ChatBubble myChat={true} message={data.message} time={data.time} key={i} />;
        }
        return <ChatBubble profileImage={data.profileImage} message={data.message} by={data.nickname} time={data.time} key={i} />;
      })}
    </div>
  );
}

export default ChatList;
