import React, { useState } from "react";
import Input from "../../Form/Input";
import Button from "../../Form/Button";

function ChatForm({ id }: { id: string }) {
  const [chat, setChat] = useState("");
  return (
    <form
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0 1em",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Input
        value={chat}
        onChange={e => {
          setChat(e.target.value);
        }}
      />
      <Button style={{ padding: ".25em", height: 50, boxSizing: "border-box" }}>
        보내기
      </Button>
    </form>
  );
}

export default ChatForm;
