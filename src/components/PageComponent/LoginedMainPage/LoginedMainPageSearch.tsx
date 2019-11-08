import React from "react";
import Input from "../../Form/Input";
import getClassHandler from "../../../lib/getClassHandler";
import "./LoginedMainPageSearch.css";

const getName = getClassHandler("LoginedMainPageSearch");
function LoginedMainPageSearch() {
  return (
    <div className={getName("wrap")}>
      <Input placeholder="상품명, 카테고리명 등으로 검색해 보세요." />
    </div>
  );
}

export default LoginedMainPageSearch;
