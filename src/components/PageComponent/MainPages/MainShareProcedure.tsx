import React from "react";
import "./MainShareProcedure.css";
import Arrow from "../../Design/Arrow";
import { url } from "koa-router";
import styled from "styled-components"
import step1 from '../../../assets/step/step1.png';
import step2 from '../../../assets/step/step2.png';
import step3 from '../../../assets/step/step3.png';

const Steps = styled.img`
    width: 300px;
    height: 550px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-repeat: no-repeat;
    background-size:contain;
    border-radius: 10px;

`
const Text = styled.div`
    text-align:center;
    font-size:24px;
    margin-bottom:30px;
`

function MainShareProcedure() {
  return (
    <div className="MainShareProcedure__wrap">
      <div className="MainShareProcedure__Info">
        <div className="MainShareProcedure__Title">공유 참여 과정</div>

        <div className="MainShareProcedure__Image">
          <Step start img={step1} text="공유할 상품 찾기" />
          <Step img={step2} text="채팅방 참여하기" />
          <Step img={step3} text="공유 시작" />
        </div>
      </div>
    </div>
  );
}

function Step({ start, img, text }: { start?: boolean, img?: any, text: String }) {
  return (
    <div className="MainShareProcedure__Images_Element">
      {!start && <Arrow strokeLen={10} className="MainShareProcedure__arrow" />}
      <div>
        <Steps src={img} width="300px" height="550px"></Steps>
        <Text>{text}</Text>
      </div>
    </div>
  );
}

export default MainShareProcedure;
