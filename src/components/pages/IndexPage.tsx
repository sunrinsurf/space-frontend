import React from "react";
import Page from "../Page";
import MainInfo from "../PageComponent/MainPages/MainInfo";
import MainProduct from "../PageComponent/MainPages/MainProduct";
import MainShareProcedure from "../PageComponent/MainPages/MainShareProcedure";
import useLogin from "../../lib/useLogin";
import LoginedMainPage from "../PageComponent/LoginedMainPage";

function IndexPage() {
  const user = useLogin();
  const beforeLogin = (
    <>
      <MainInfo />
      <MainProduct />
      <MainShareProcedure />
    </>
  );
  const afterLogin = (
    <LoginedMainPage />
  )
  const props: any = {};
  if (!user) props.navFixed = true;
  else {
    props.whiteColor = true;
    props.colorfulLogo = true;
  }
  return (
    <Page noPadding {...props}>
      {!user ? beforeLogin : afterLogin}
    </Page>
  );
}

export default IndexPage;
