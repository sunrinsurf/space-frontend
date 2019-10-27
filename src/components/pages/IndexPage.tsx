import React from "react";
import Page from "../Page";
import MainInfo from "../PageComponent/MainPages/MainInfo";
import MainProduct from "../PageComponent/MainPages/MainProduct";
import MainShareProcedure from "../PageComponent/MainPages/MainShareProcedure";

function IndexPage() {
  return (
    <Page noPadding navFixed>
      <MainInfo></MainInfo>
      <MainProduct></MainProduct>
      <MainShareProcedure></MainShareProcedure>
    </Page>
  );
}

export default IndexPage;
