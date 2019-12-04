import React from "react";
import MainInfo from "../PageComponent/MainPages/MainInfo";
import MainProduct from "../PageComponent/MainPages/MainProduct";
import MainShareProcedure from "../PageComponent/MainPages/MainShareProcedure";
import Arrow from "../Design/Arrow";

import ReactFullPage from "@fullpage/react-fullpage";
import "fullpage.js/vendors/scrolloverflow";

function IndexPage() {
  return (
    <ReactFullPage
      // licenseKey={""}
      scrollingSpeed={1000}
      render={({ state, fullpageApi }) => {
        return (
          <ReactFullPage.Wrapper>
            <div
              className="section"
              style={{
                display: "flex"
              }}
            >
              <MainInfo
                downFunction={() => {
                  fullpageApi.moveSectionUp();
                }}
              />
            </div>
            <div className="section">
              <div
                className="slide"
                style={{
                  overflow: "visible",
                  height: 200
                }}
              >
                <MainProduct />
              </div>
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
