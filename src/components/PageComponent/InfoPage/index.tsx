import React from "react";

interface InfoPageMainProps {
  nickname: string;
}
function InfoPageMain({ nickname }: InfoPageMainProps) {
  return <h1>안녕하세요, {nickname}님.</h1>;
}

export default InfoPageMain;
