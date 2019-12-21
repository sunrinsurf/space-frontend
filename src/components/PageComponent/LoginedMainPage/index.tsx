import React from "react";
import LoginedMainPageSearch from "./LoginedMainPageSearch";
import getClassHandler from "../../../lib/getClassHandler";

import "./index.css";
import Shares from "../../Shares";
import GettingStart from "./GettingStart";

const getName = getClassHandler("LoginedMainPage");
function LoginedMainPage() {
  return (
    <>
      <GettingStart />
      <div className={getName("wrap")}>
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
