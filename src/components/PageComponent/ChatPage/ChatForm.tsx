import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { emitChat } from "../../../store/Socket";
import styled from "styled-components"
import paper from "../../../assets/paper.svg"
const Form = styled.form`
  flex: 0;
  display: flex;
  justify-content:center;
  align-items: center ;
  width:50%;
  height:45px;
  margin:0 auto;
  @media(max-width:768px){
    width:100%;
    height:45px;
  }

`
const Button = styled.button`
  width:120px;
  height:100%;
  border-radius: 24px;
  border: 0;
  box-shadow: 3px 5px 10px -1px rgba(34, 34, 34, 0.1);
  background-color: #1183fa;
  padding: .25em;
  margin: 1em;
  box-sizing: border-box;
  flex: 0.2;
`
const Paper = styled.img`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${paper});
  border: 0;
  width:32px;
  height:24px;
`
const Input = styled.input`
  width:120px;
  height:70%;
 border-radius: 24px;
  background-color: #d8d8d8;
  box-shadow:0;
  border: 0;
  outline: 0;
  flex:1;
  padding:5px 15px;
`
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
    <Form
      style={{ flex: 0, display: "flex", alignItems: "center", position: "sticky" }}
      onSubmit={onSubmit}
    >
      <Input
        value={chat}
        onChange={e => {
          setChat(e.target.value);
        }}
        style={{ marginLeft: "1em", }}
      />
      <Button>
        <Paper />
      </Button>
    </Form>
  );
}

export default ChatForm;
