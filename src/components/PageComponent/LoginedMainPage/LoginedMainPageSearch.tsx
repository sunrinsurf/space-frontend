import React from "react";
import styled from 'styled-components';
import Button from "../../Form/Button";
import getClassHandler from "../../../lib/getClassHandler";
import "./LoginedMainPageSearch.css";

const Search = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: 2px solid #494949;
  outline: 0;
  font-size: 1.5rem;
  padding: 8.4px 14px;
  transition: border-color 1s;

  &:active {
    border-color: black;
  }
`;
const getName = getClassHandler("LoginedMainPageSearch");
function LoginedMainPageSearch() {
  return (
    <div className={getName("wrap")}>
      <span style={{ display: "flex" }}>
        <Search type="text" className={getName("input")} placeholder="상품명, 카테고리 등으로 다양한 상품을 검색해 보세요." />
      </span>
    </div>
  );
}

export default LoginedMainPageSearch;
