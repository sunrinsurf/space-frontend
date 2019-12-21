import React from "react";
import ShareList from "../../Shares/ShareList";
import Button from "../../Form/Button";
import favicon from "../../../assets/favicon.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Favicon = styled.div`
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${favicon});
  margin: 0 auto;
`;
const Title = styled.div`
  font-size: 32px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin-bottom: 0.7em;
`;
const Profile = styled.div`
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 100%;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: gray;
`;
const Welcome = styled.div`
  font-size: 28px;
  font-weight: 100;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin: 0.5em auto;
`;
const Section = styled.div`
  width: 85%;
  margin: 2rem auto 0% auto;
`;
const Subject = styled.div`
  font-size: 28px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`;
interface InfoPageMainProps {
  nickname: string;
  invitedProducts: any[];
  createdProducts: any[];
}
function InfoPageMain({
  nickname,
  invitedProducts,
  createdProducts
}: InfoPageMainProps) {
  return (
    <div>
      <Favicon></Favicon>
      <Title>마이 페이지</Title>
      <Profile></Profile>
      <Welcome>
        안녕하세요, <span style={{ color: "#328fff" }}>{nickname}</span>님!
      </Welcome>
      <Link to="/modify">
        <Button
          style={{
            borderRadius: "25px",
            width: "180px",
            boxShadow: "0 0 8px 0 #ff388a",
            margin: "0.5em auto"
          }}
        >
          프로필 수정
        </Button>
      </Link>
      <Section>
        <Subject>공유에 참여중인 상품</Subject>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <ShareList product={invitedProducts} />
        </div>
      </Section>
      <Section>
        <Subject>내가 공유하는 상품</Subject>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <ShareList product={createdProducts} />
        </div>
      </Section>
    </div>
  );
}

export default InfoPageMain;
