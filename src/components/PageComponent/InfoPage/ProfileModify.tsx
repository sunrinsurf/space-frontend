import React from "react";

import styled from "styled-components";
import favicon from "../../../assets/favicon.svg";
import ProfileModifyForm from "./ProfileModifyForm";

const Wrap = styled.div`
  margin: 1em 2em;
`;
const Favicon = styled.div`
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${favicon});
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
`;

function ChangeInfo(data: any) {
  console.log(data);
  return (
    <Wrap>
      <Favicon></Favicon>
      <Title>프로필 수정</Title>
      <ProfileModifyForm {...data} />
    </Wrap>
  );
}

export default ChangeInfo;
