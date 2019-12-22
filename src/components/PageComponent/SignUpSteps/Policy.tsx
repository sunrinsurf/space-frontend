import React, { useState } from "react";
import styled from "styled-components";
import SignUpStepProps from "./SignUpStepProps";
import Button from "../../Form/Button";
import Policy from "../../Policy";
import Favicon from "../../Layout/Favicon";
import Arrow from "../../Design/Arrow";
import Privacy from "../../Policy/Privacy";

import './Policy.css';

const PolicyBox = styled.div`
  padding: 1.5em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PolicyContentsBox = styled.div`
  overflow-y: auto;
  max-height: 40vh;
`;
const PolicyOpenerWrap = styled.div`
  padding: .7em 1em;
  display: flex;
  align-items: center;
  border-top: 1px solid #979797;
  border-bottom: 1px solid #979797;
  & h1 {
    margin: 0;
    margin-left: 20px;
    font-size: 26px;
  }
`;

interface PolicyOpenerProps {
  children: React.ReactNode,
  title: string,
  opened?: boolean;
  onClick?: (e?: React.MouseEvent) => any
}
function PolicyOpener({ children, title, opened, onClick }: PolicyOpenerProps) {
  return (
    <div className="Policy__Opener">
      <PolicyOpenerWrap role="button" className="Policy__OpenerWrap" style={{ cursor: 'pointer' }} onClick={onClick}>
        <Arrow strokeLen={5} style={{
          transform: (!opened && 'rotate(-90deg)' as any)
        }} />
        <h1>{title}</h1>
      </PolicyOpenerWrap>
      {opened && <PolicyContentsBox>
        {children}
      </PolicyContentsBox>}

    </div>
  )
}
function PolicyStep({ toNext }: SignUpStepProps) {
  const [opened, setOpened] = useState([false, false]);
  function setToggle(i: number) {
    const _opened = [...opened];
    _opened[i] = !_opened[i];

    setOpened(_opened);
  }
  return (
    <PolicyBox>
      <Favicon width="100" />
      <h1>약관 동의</h1>
      <PolicyOpener title="이용 약관" opened={opened[0]} onClick={() => { setToggle(0) }}>
        <Policy />
      </PolicyOpener>
      <PolicyOpener title="개인정보 보호방침" opened={opened[1]} onClick={() => { setToggle(1) }}>
        <Privacy />
      </PolicyOpener>
      <Button style={{ marginTop: "2em", borderRadius: 26, minWidth: 30 + "%" }} onClick={toNext}>
        동의하고 다음으로
      </Button>
    </PolicyBox >
  );
}

export default PolicyStep;
