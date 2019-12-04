import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../Form/Button";
import "./MainInfo.css";
import styled from "styled-components";
import logo from "../../../assets/logo.svg";
import phone from "../../../assets/space-phone.png";
import Arrow from "../../Design/Arrow";

const Flex = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  padding: 2em;
  height: 100%;
  align-items: center;
`;

function MainInfo(props: any) {
  return (
    <div className="MainInfo__wrap">
      <div className="MainInfo__Info">
        <MainInfoBackground />

        <Flex className="MainInfo__FlexBox">
          <div className="MainInfo__BrandWrap">
            <h1>소유의 경계를 허물다,</h1>
            <img src={logo} alt="Space Logo" className="MainInfo__BrandLogo" />
            <h3>누구나, 무엇이든 공유하는 공유 경제 마켓</h3>
            <GetStartButton />
          </div>
          <div className="MainInfo__Phone">
            <img src={phone} alt="Phone" />
          </div>
        </Flex>
      </div>
      <Guide props={props} />
    </div>
  );
}
function GetStartButton() {
  const history = useHistory();
  function getStart() {
    history.push("/signup");
  }

  return (
    <div className="MainInfo__GetStart">
      <Button onClick={getStart} style={{ margin: "auto" }}>
        <strong>서비스 시작</strong>하기
      </Button>
    </div>
  );
}
function Guide(props: any) {
  function goTo() {
    const product =
      window.document &&
      window.document.querySelector<HTMLDivElement>("#product");
    if (!product) return;

    window.scrollTo &&
      window.scrollTo({
        top: product.offsetTop - 100,
        behavior: "smooth"
      });
  }
  return (
    <div className="MainInfo__Guide">
      <Arrow
        role="button"
        onClick={props.downFunction}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

function MainInfoBackground() {
  return (
    <div
      className="MainInfo__Background"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1
      }}
    >
      <div style={{ height: "50vh", background: "#1183fa" }} />
      <div
        style={{
          width: "100%",
          height: "40vh"
        }}
      >
        <svg
          viewBox="0 0 1920 200"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path d="M 0 0 L 0 200 L 1920 0 Z" fill="#1183fa" />
        </svg>
      </div>
    </div>
  );
}

export default MainInfo;
