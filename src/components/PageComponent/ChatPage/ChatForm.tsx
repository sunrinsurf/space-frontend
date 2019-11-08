import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import { emitChat } from "../../../store/Socket";

function ChatForm() {
  const dispatch = useDispatch();
  const [chat, setChat] = useState("");

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(emitChat(chat));
      setChat("");
    },
    [dispatch, chat]
  );

  return (
    <form
      style={{ flex: 0, display: "flex", alignItems: "center" }}
      onSubmit={onSubmit}
    >
      <Input
        value={chat}
        onChange={e => {
          setChat(e.target.value);
        }}
        style={{ marginLeft: "1em" }}
      />
      <Button
        style={{
          padding: ".25em",
          height: 50,
          width: "7em",
          margin: "1em",
          boxSizing: "border-box"
        }}
      >
        보내기
      </Button>
    </form>
  );
}

export default ChatForm;
