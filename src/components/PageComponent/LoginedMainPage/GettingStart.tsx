import React from "react";
import styled, { css } from "styled-components";
import citys from "../../../assets/backgrounds/citys.svg";
import plant from "../../../assets/backgrounds/plant.svg";
import rectangle from "../../../assets/backgrounds/info_rectangle.svg";
import persons from "../../../assets/backgrounds/persons.svg";

import { ReactComponent as StartShare } from "../../../assets/backgrounds/start_share.svg";
import { desktop, mobile } from "../../../lib/viewport";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  height: 813px;
  background: #0085ff;
  position: relative;
  .bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: url(${citys}) no-repeat;
    background-position: bottom;
  }
  .plant {
    position: absolute;
    bottom: 0;
    left: 10vw;
    width: 22vw;
    height: 292px;
    background: url(${plant}) no-repeat;
    background-size: contain;
    background-position: center bottom;
  }
  .persons {
    position: absolute;
    right: 10vw;
    width: 300px;
    height: 600px;
    background: url(${persons}) no-repeat;
    background-size: contain;
    background-position: center;

    ${desktop(css`
      right: 204px;
      top: 142px;
      width: 633px;
      height: 456px;
    `)}
  }
  .contents {
    position: absolute;
    top: 20vh;
    left: 12vw;
    padding: 20px;
    color: white;
    h1 {
      font-size: 57px;
      background: url(${rectangle}) no-repeat;
      background-position: left bottom;
      
    }
    ${mobile(css`
      left: 5vw;
      h1 {
        font-size: 45px;
        width: fit-content;
        background-size: contain;
      }
    `)}
  }
`;
const StartShareButton = styled(Link)`
  all: unset;
  display: block;
  background: #ff388a;
  padding: 20px 98px;
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
  margin-top: 58px;
  text-align: center;

  ${mobile(css`
    padding: 8px 30px;
    margin-top: 15px;
    .shareImage {
      width: 100px;
    }
  `)}
`;
function GettingStart() {
  return (
    <Wrap>
      <div className="bg" />
      <div className="plant" />
      <div className="persons" />
      <div className="contents">
        <h1>
          누구나, 무엇이든 <br />
          공유해보세요
        </h1>
        <StartShareButton to="/write">
          <StartShare className="shareImage" />
        </StartShareButton>
      </div>
    </Wrap>
  );
}

export default GettingStart;
