import React from "react";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import getClassHandler from "../../../lib/getClassHandler";
import "./LoginedMainPageSearch.css";

const getName = getClassHandler("LoginedMainPageSearch");
function LoginedMainPageSearch() {
  return (
    <div className={getName("wrap")}>
      <span style={{ display: "flex" }}>
        <Input placeholder="상품명, 카테고리명 등으로 검색해 보세요." />
        <Button style={{ height: "47px", marginTop: "12px" }}>검색</Button>
      </span>
    </div>
  );
}

export default LoginedMainPageSearch;
