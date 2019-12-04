import React from "react";
import MainInfo from "../PageComponent/MainPages/MainInfo";
import MainProduct from "../PageComponent/MainPages/MainProduct";
import MainShareProcedure from "../PageComponent/MainPages/MainShareProcedure";

import ReactFullPage from "@fullpage/react-fullpage";

function IndexPage() {
  return (
    <ReactFullPage
      // licenseKey={""}
      scrollingSpeed={1000}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullPage.Wrapper>
            <div className="section">
              <MainInfo />
            </div>
            <div className="section">
              <MainProduct />
            </div>
            <div className="section">
              <MainShareProcedure />
            </div>
          </ReactFullPage.Wrapper>
        );
      }}
    />
  );
}

export default IndexPage;
