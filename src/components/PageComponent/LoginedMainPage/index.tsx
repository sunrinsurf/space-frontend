import React from "react";
import LoginedMainPageSearch from "./LoginedMainPageSearch";
import getClassHandler from "../../../lib/getClassHandler";

import "./index.css";
import Shares from "../../Shares";
import GettingStart from "./GettingStart";
import styled from "styled-components"
import Arrow from "../../Design/Arrow"
const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  margin-top:5%;
  margin-bottom:2%;
`
const getName = getClassHandler("LoginedMainPage");
function LoginedMainPage() {
  return (
    <>
      <GettingStart />
      <div className={getName("wrap")}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "65px", marginTop: "3%" }}>
          <Arrow></Arrow>
        </div>
        <Title>상품 검색</Title>
        <LoginedMainPageSearch />
        <section>
          <h1>최근 공유된 상품</h1>
          <Shares />
        </section>
      </div>
    </>
  );
}
export default LoginedMainPage;
